# Definición de capas

Cada archivo `.py` de esta carpeta describe una o más capas. De esa definición
salen dos cosas:

1. Los archivos de MapServer (`ivea/poligonos/*.map`, `ivea/puntos/*.map` y
   `ivea/leyendas/*.map`) mediante `scripts/genera_layer.py`.
2. El árbol de capas del cliente web (`mapa/config/treeLayers.js`) mediante
   `scripts/genera_tree.py`.

## Estructura de un archivo de capa

Un archivo de definición debe declarar estas variables a nivel de módulo:

```python
descripcion = "Descripción legible de la capa"
output = "nombre_del_archivo_map"

# Configuración compartida por todas las capas del archivo.
layer = {
    "type": "POLYGON",
    "data": {"table": "esquema.tabla"},
}

# Una o más capas. Si se omite, se usa `layer` tal cual.
layers = []
```

- `descripcion`: se escribe en el encabezado de los `.map` generados.
- `output`: nombre base de los archivos `.map`. Si se omite se usa
  `salida_mxsig`.
- `layer`: configuración base. Cada elemento de `layers` se mezcla con esta
  configuración (las llaves del elemento tienen prioridad).
- `layers`: lista opcional. Se usa cuando el archivo genera varias capas, por
  ejemplo al recorrer municipios, coordinaciones o campos temáticos.

La subcarpeta de salida se decide con `type`:

| `type`    | Carpeta            |
|-----------|--------------------|
| `POLYGON` | `ivea/poligonos/`  |
| `POINT`   | `ivea/puntos/`     |
| `LINE`    | `ivea/lineas/`     |

## Llaves de una capa

```python
{
    # Obligatoria. Es el nombre interno de la capa.
    # En el cliente se publica como "c_<name>" y, si hay textos, "t_<name>".
    "name": "mi_capa",

    # Obligatoria para el árbol: de aquí sale el label que ve el usuario.
    "metadata": {
        "wms_title": "Título de la capa",
    },

    "data": {
        "table": "esquema.tabla",
        "select": ["campo1", "campo2"],  # opcional
        "where": "campo = 'valor'",      # opcional, va dentro del SQL
    },

    # Opcional. Si se define, se genera además una capa de textos "t_<name>"
    # y el árbol publica su bloque "texts".
    "labelitem": "campo_etiqueta",

    # Opcional. Para clasificar por el valor de un campo.
    # Sólo debe usarse con campos de tipo string.
    "classitem": "campo_clasificacion",

    # Estilo y etiquetas de MapServer.
    "class": {
        "style": {
            "color": "235 151 78",
            "outlinecolor": "0 0 0",
            "width": 1,
        },
        "label": {
            "font": "arial",
            "size": "8",
            "color": "0 0 0",
            "outlinecolor": "255 255 255",
            "position": "uc",
            "type": "truetype",
        },
    },

    # Obligatoria para publicar la capa en el árbol del cliente.
    "_tree": {
        "grupo": "nombre_del_grupo",
    },
}
```

Notas:

- `name` es obligatorio. Sin él, `genera_tree.py` omite la capa con una
  advertencia.
- `metadata.wms_title` es el label del árbol. Si falta, se usa `name` como
  respaldo, pero no es lo recomendado.
- `labelitem` activa el modo dual: se generan la capa base (`c_`) y la capa de
  textos (`t_`). Si no hay `labelitem`, no se generan textos.
- `classitem` se agrega automáticamente a `data.select` si no está. Sólo debe
  usarse con campos de tipo string (ver abajo).
- `labelitem` también se agrega automáticamente al `select` de la capa de
  textos.
- Los colores se pueden escribir como `"235 151 78"` o `"235,151,78"`; el
  generador normaliza las comas a espacios.
- Dentro de `class` usa `expression` para indicar cuándo se aplica la clase. El
  generador se encarga de convertirla al formato de MapServer.
- `data.table` siempre debe existir. `data.select` y `data.where` son
  opcionales.

### Clasificación: `classitem` y `expression`

Ambas llaves controlan cuándo se aplica una clase, pero se usan de forma
distinta:

- **`classitem`** indica el campo de tipo **string** que se compara con la
  `expression` de cada clase. Cada clase se aplica cuando el valor del campo
  coincide con su expresión. Por eso `classitem` **sólo debe usarse con campos
  de texto** (por ejemplo `grado_marginacion`, `region_pvd`, `lengua`).
- **`expression`** define la condición de la clase. Si existe `classitem`, se
  compara contra el valor del campo y el generador la escribe entre comillas.
  Si no existe `classitem`, se escribe como condición libre, normalmente
  numérica.

Con `classitem` (campo string):

```python
"classitem": "grado_marginacion",
"class": [
    {"name": "Alto", "expression": "Alto", "style": {...}},
    {"name": "Bajo", "expression": "Bajo", "style": {...}},
],
```

Sin `classitem` (condición numérica):

```python
"class": [
    {"name": "bajo", "expression": "[porcentaje] <= 10", "style": {...}},
    {"name": "alto", "expression": "[porcentaje] > 10", "style": {...}},
],
```

No uses `classitem` para campos numéricos: la comparación se haría como texto.
Para rangos o condiciones numéricas usa sólo `expression`.

### Varias capas desde un mismo archivo

Cuando las capas comparten configuración, define lo común en `layer` y lo
específico en cada elemento de `layers`:

```python
descripcion = "Escuelas del DENUE"
output = "denue_escuelas"

layer = {
    "type": "POINT",
    "labelitem": "nombre_ue",
    "class": {
        "style": {"symbol": "circulor", "size": 9, "outlinecolor": "0,0,0"},
    },
}

capas = [
    {"name": "escuelas_primarias", "tabla": "denue.escuelas_primarias"},
    {"name": "escuelas_secundarias", "tabla": "denue.escuelas_secundarias"},
]

layers = []
for capa in capas:
    layers.append({
        "name": capa["name"],
        "metadata": {"wms_title": f"{capa['name']} (DENUE)"},
        "data": {"table": capa["tabla"]},
        "_tree": {"grupo": "denue"},
    })
```

Evita crear arreglos auxiliares por archivo (`etiquetas`, `posiciones`,
`orden`) para resolver el árbol. El label sale de `wms_title` y las posiciones
se calculan automáticamente.

## `_tree`: publicación en el árbol del cliente

`_tree` sólo alimenta el árbol del cliente. **No se escribe en los `.map`**:
`genera_layer.py` lo elimina antes de renderizar MapServer.

Debe ir dentro de cada capa (`layer` o cada elemento de `layers`), nunca a
nivel de módulo:

```python
"_tree": {
    "grupo": "infraestructura_ivea",
}
```

### `grupo` (obligatorio)

Es la llave representativa definida en `GRUPOS` dentro de
`scripts/layers/tree_config.py`. El generador la traduce al identificador
publicado (`G1`, `G2`, ...) según el orden de `GRUPOS`.

Si el grupo no existe, la capa no se publica y se muestra una advertencia.

### Propiedades opcionales

`_tree` es abierto: cualquier propiedad extra se copia tal cual a la entrada
del árbol. Las más usadas son:

| Propiedad  | Valor por defecto | Uso |
|------------|-------------------|-----|
| `position` | consecutivo       | Orden de apilado. Sólo se declara cuando se necesita una posición fija. |
| `active`   | `false`           | `true` para que la capa aparezca activa al abrir el mapa. |

Ejemplo:

```python
"_tree": {
    "grupo": "marco_geoestadistico",
    "position": 200,
    "active": True,
},
```

Reglas del generador:

- Si `position` está definida, se respeta.
- Las capas sin `position` reciben números consecutivos desde `1`, recorriendo
  los grupos en el orden de `GRUPOS` y saltando las posiciones ya usadas.
- `scale` vale `1` y no se declara en `_tree`.
- `texts` se genera automáticamente cuando la capa tiene `labelitem`. No se
  declara a mano.
- **No** agregues `label`, `synonymous`, `orden` ni `scale` dentro de `_tree`.
  El label sale de `metadata.wms_title`.

## Agregar un grupo o un tema

Los grupos y temas se definen en `scripts/layers/tree_config.py`.

### Grupo nuevo

Agrega una llave representativa a `GRUPOS`:

```python
GRUPOS = {
    # ...
    "mi_grupo_nuevo": {
        "label": "Mi grupo nuevo",
    },
}
```

El orden de las llaves es el orden de publicación (`G1`, `G2`, ...). Después
usa esa misma llave en las capas:

```python
"_tree": {"grupo": "mi_grupo_nuevo"}
```

### Tema nuevo

Agrega una llave representativa a `TEMAS`:

```python
TEMAS = {
    # ...
    "mi_tema_nuevo": {
        "label": "Mi tema nuevo",
        "layers": [
            "c_mi_capa",
            "c_otra_capa",
        ],
        "desc": "Descripción del tema",
        "img": "mi_imagen.png",
    },
}
```

- El orden de las llaves es el orden de publicación (`T1`, `T2`, ...).
- `layers` usa los identificadores del cliente, es decir `c_<name>`.
- Una capa puede repetirse en varios temas.
- La imagen debe existir en `mapa/img/temas/`.

## Generar y validar

Desde la raíz del repositorio:

```bash
# 1. Generar los mapfiles de MapServer de una capa
python scripts/genera_layer.py scripts/layers/01_marco_geoestadistico/01_poligonos_marco_geoestadistico.py

# 2. Regenerar el árbol del cliente (siempre sobrescribe la salida)
python scripts/genera_tree.py
```

`genera_tree.py` no recibe parámetros. Siempre escribe:

- `mapa/config/treeLayers.json` (para revisión)
- `mapa/config/treeLayers.js` (lo consume `mapa/config/tree.js`)

La salida esperada del proyecto es:

```
Capas encontradas: 47
Capas publicadas:  47
Grupos: 11
Temas: 7
```

Al terminar, revisa que no aparezcan advertencias (`ADVERTENCIA: ...`). Las más
comunes son:

- Capa sin `name`.
- Capa con un `grupo` que no existe en `GRUPOS`.
- Tema que referencia una capa inexistente.
- Capa duplicada (se conserva la primera definición).

Para publicar los cambios:

```bash
./deploy.sh
```

## Checklist para una capa nueva

- [ ] El archivo está dentro de `scripts/layers/<categoría>/`.
- [ ] Tiene `descripcion`, `output`, `layer` y, si aplica, `layers`.
- [ ] Cada capa tiene `name` único y `metadata.wms_title`.
- [ ] `data.table` existe y `select`/`where` son correctos.
- [ ] Si lleva etiquetas, tiene `labelitem` y el bloque `label` en `class`.
- [ ] Si usa `classitem`, el campo es de tipo string; para condiciones
      numéricas sólo se usa `expression`.
- [ ] `_tree` está dentro de la capa (no a nivel de módulo) y su `grupo`
      existe en `GRUPOS`.
- [ ] No se agregaron `label`, `synonymous`, `orden`, `scale` ni `texts` a
      `_tree`.
- [ ] Si se creó un grupo o tema, quedó registrado en `tree_config.py`.
- [ ] Se ejecutaron `genera_layer.py` y `genera_tree.py` sin advertencias.
