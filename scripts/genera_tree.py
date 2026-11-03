#!/usr/bin/env python3
"""
Genera el catálogo de grupos y temas del árbol de capas del cliente web.

Los grupos y temas viven en ``scripts/layers/tree_config.py`` con nombres
representativos.  Cada capa declara su grupo en su propia definición usando
esa misma llave:

    "_tree": {"grupo": "infraestructura_ivea"}

El generador traduce las llaves a identificadores cortos en el orden en que
aparecen en ``GRUPOS`` (``G1``, ``G2``...) y en ``TEMAS`` (``T1``, ``T2``...).

``_tree`` es abierto: cualquier propiedad adicional (por ejemplo ``active`` o
``position``) se copia a la entrada del árbol.  El label se toma de
``metadata.wms_title`` y las capas de texto se agregan cuando la capa define
``labelitem``.

Las posiciones se asignan recorriendo las capas en el orden de ``GRUPOS``:
si una capa define ``position`` se respeta; las demás reciben números
consecutivos, evitando las posiciones ya usadas.

Salidas (siempre se sobrescriben):
    mapa/config/treeLayers.json  -> datos para revisión
    mapa/config/treeLayers.js    -> módulo AMD que consume config/tree.js
"""

import importlib
import json
import os
import sys
import types
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
LAYERS_DIR = SCRIPTS_DIR / "layers"
OUTPUT_DIR = ROOT / "mapa" / "config"

POSITION_START = 1

# Permite importar `scripts.layers.*` sin importar desde dónde se ejecute.
sys.path.insert(0, str(ROOT))
os.chdir(ROOT)

from scripts.layers.tree_config import GRUPOS, TEMAS  # noqa: E402


def deep_update(base, extra):
    """Copia profunda de diccionarios; las listas y escalares se reemplazan."""
    result = dict(base)
    for key, value in extra.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_update(result[key], value)
        else:
            result[key] = value
    return result


def stub_postgres():
    """
    Evita conectarse a PostgreSQL al importar capas que calculan cuartiles.
    El árbol sólo necesita nombres, títulos y presencia de labelitem.
    """
    fake = types.ModuleType("scripts.utils.postgres")
    fake.obtener_cuartiles_desde_postgres = lambda *args, **kwargs: (0, 0, 0)
    sys.modules["scripts.utils.postgres"] = fake


def discover_modules():
    """Devuelve los módulos de definición de capas en orden de ruta."""
    for path in sorted(LAYERS_DIR.rglob("*.py")):
        if path.name in {"__init__.py", "constantes.py", "tree_config.py"}:
            continue
        if path.name.startswith("_"):
            continue
        relative = path.relative_to(ROOT).with_suffix("")
        yield path, ".".join(relative.parts)


def build_entry(merged_layer):
    """Construye la entrada de una capa para el árbol del cliente."""
    tree_meta = merged_layer.get("_tree") or {}

    entry = {
        "label": (
            merged_layer.get("metadata", {}).get("wms_title")
            or merged_layer.get("name")
        ),
        "scale": 1,
        "position": tree_meta.get("position"),
        "active": False,
    }

    # Las capas de texto se generan a partir de labelitem.
    if merged_layer.get("labelitem"):
        entry["texts"] = {"scale": 1, "active": False}

    # _tree es abierto: cualquier propiedad extra se publica tal cual.
    for key, value in tree_meta.items():
        if key in {"grupo", "position"}:
            continue
        entry[key] = value

    return entry, tree_meta.get("grupo")


def main():
    stub_postgres()

    # Nombres representativos -> identificadores publicados (G1, G2... / T1...).
    group_ids = {
        group_key: "G%d" % index
        for index, group_key in enumerate(GRUPOS, start=1)
    }
    groups = {
        group_id: {
            "label": GRUPOS[group_key].get("label", group_key),
            "layers": {},
        }
        for group_key, group_id in group_ids.items()
    }

    layers_by_id = {}
    explicit_positions = {}
    warnings = []

    for path, module_name in discover_modules():
        try:
            module = importlib.import_module(module_name)
        except Exception as exc:  # pragma: no cover - diagnóstico para el usuario
            warnings.append("No se pudo importar %s: %s" % (module_name, exc))
            continue

        base_layer = getattr(module, "layer", {})
        layer_items = getattr(module, "layers", [base_layer])

        for item in layer_items:
            merged = deep_update(base_layer, item)
            name = merged.get("name")
            if not name:
                warnings.append(
                    "%s: capa sin 'name', se omite (%s)"
                    % (path.relative_to(ROOT), item.get("metadata", {}).get("wms_title"))
                )
                continue

            client_id = "c_" + name
            if client_id in layers_by_id:
                warnings.append(
                    "Capa duplicada '%s' en %s; se conserva la primera definición."
                    % (client_id, path.relative_to(ROOT))
                )
                continue

            entry, group_key = build_entry(merged)
            layers_by_id[client_id] = entry
            explicit_positions[client_id] = entry["position"]

            group_id = group_ids.get(group_key)
            if group_id is None:
                warnings.append(
                    "Capa '%s' sin grupo válido en _tree (grupo=%r); no se publica."
                    % (client_id, group_key)
                )
                continue

            groups[group_id]["layers"][client_id] = entry

    # Asigna posiciones consecutivas a las capas que no definieron una.
    # Se recorre en el orden de GRUPOS para que el apilado sea predecible.
    used_positions = {
        position
        for position in explicit_positions.values()
        if position is not None
    }
    next_position = POSITION_START
    for group in groups.values():
        for client_id, entry in group["layers"].items():
            if entry["position"] is None:
                while next_position in used_positions:
                    next_position += 1
                entry["position"] = next_position
                next_position += 1

    themes = {}
    for index, (theme_key, theme) in enumerate(TEMAS.items(), start=1):
        theme_id = "T%d" % index
        theme_layers = list(theme.get("layers", []))
        for layer_id in theme_layers:
            if layer_id not in layers_by_id:
                warnings.append(
                    "Tema '%s' referencia una capa inexistente: %s"
                    % (theme_key, layer_id)
                )
        themes[theme_id] = {
            "label": theme.get("label", theme_key),
            "layers": theme_layers,
            "desc": theme.get("desc", theme.get("label", theme_key)),
            "img": theme.get("img", ""),
        }

    catalog = {
        "themes": themes,
        "groups": groups,
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    json_path = OUTPUT_DIR / "treeLayers.json"
    js_path = OUTPUT_DIR / "treeLayers.js"

    with json_path.open("w", encoding="utf-8") as handle:
        json.dump(catalog, handle, ensure_ascii=False, indent=4)
        handle.write("\n")

    json_text = json.dumps(catalog, ensure_ascii=False, indent=4)
    # utf-8-sig conserva el BOM que ya usaba el tree.js original.
    with js_path.open("w", encoding="utf-8-sig") as handle:
        handle.write("/**\n")
        handle.write(" * ARCHIVO GENERADO AUTOMÁTICAMENTE POR scripts/genera_tree.py\n")
        handle.write(" * No editar a mano: los cambios se perderán.\n")
        handle.write(" *\n")
        handle.write(" * Para actualizar grupos y temas edita:\n")
        handle.write(" *   - scripts/layers/tree_config.py\n")
        handle.write(" * Para agregar una capa a un grupo edita su definición:\n")
        handle.write(" *   - scripts/layers/**.py  (clave _tree: {\"grupo\": \"infraestructura_ivea\"})\n")
        handle.write(" */\n")
        handle.write("define(function() {\n")
        handle.write("    return ")
        handle.write(json_text.replace("\n", "\n    "))
        handle.write(";\n")
        handle.write("});\n")

    published = sum(len(group["layers"]) for group in groups.values())
    print("Capas encontradas: %d" % len(layers_by_id))
    print("Capas publicadas:  %d" % published)
    print("Grupos:")
    for group_id, group in groups.items():
        print("  - %s %s (%d capas)" % (group_id, group["label"], len(group["layers"])))
    print("Temas: %d" % len(themes))
    print("JSON: %s" % json_path)
    print("Tree: %s" % js_path)

    for warning in warnings:
        print("ADVERTENCIA: %s" % warning, file=sys.stderr)


if __name__ == "__main__":
    main()
