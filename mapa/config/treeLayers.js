/**
 * ARCHIVO GENERADO AUTOMÁTICAMENTE POR scripts/genera_tree.py
 * No editar a mano: los cambios se perderán.
 *
 * Para actualizar grupos y temas edita:
 *   - scripts/layers/tree_config.py
 * Para agregar una capa a un grupo edita su definición:
 *   - scripts/layers/**.py  (clave _tree: {"grupo": "infraestructura_ivea"})
 */
define(function() {
    return {
        "themes": {
            "T1": {
                "label": "Coordinaciones de Zona IVEA",
                "layers": [
                    "c_cz3001",
                    "c_cz3003",
                    "c_cz3004",
                    "c_cz3005",
                    "c_cz3006",
                    "c_cz3007",
                    "c_cz3008",
                    "c_cz3009",
                    "c_cz3010",
                    "c_cz3011",
                    "c_cz3012",
                    "c_cz3013",
                    "c_cz3014",
                    "c_cz3015",
                    "c_cz3016",
                    "c_cz3017",
                    "c_cz3018",
                    "c_cz3019",
                    "c_cz3020",
                    "c_cz3021",
                    "c_cz3022",
                    "c_cz3023",
                    "c_cz3024",
                    "c_cz3025",
                    "c_cz3029",
                    "c_oficinas_cz"
                ],
                "desc": "Coordinaciones de Zona IVEA",
                "img": "coordinaciones.png"
            },
            "T2": {
                "label": "Rezago Educativo",
                "layers": [
                    "c_oficinas_cz",
                    "c_rezago_educativo_porcentaje_rezago_total"
                ],
                "desc": "Rezago Educativo",
                "img": "ivea.png"
            },
            "T3": {
                "label": "Rezago social",
                "layers": [
                    "c_grado_rezago_social"
                ],
                "desc": "Rezago social 2020",
                "img": "inegi.png"
            },
            "T4": {
                "label": "Grado de Marginación",
                "layers": [
                    "c_grado_marginacion"
                ],
                "desc": "Grado de Marginación",
                "img": "inegi.png"
            },
            "T5": {
                "label": "Pobreza",
                "layers": [
                    "c_tematico_pobreza"
                ],
                "desc": "Pobreza",
                "img": "inegi.png"
            },
            "T6": {
                "label": "Pueblos Indígenas PVD",
                "layers": [
                    "c_municipios_indigenas_pvd"
                ],
                "desc": "Pueblos Indígenas PVD",
                "img": "mun_indigena_pvd.png"
            },
            "T7": {
                "label": "Regiones económicas PVD",
                "layers": [
                    "c_mun_regiones_pvd"
                ],
                "desc": "Regiones económicas PVD",
                "img": "regiones.png"
            }
        },
        "groups": {
            "G1": {
                "label": "L&iacute;mites del Marco Geoestad&iacute;stico de Veracruz 2025",
                "layers": {
                    "c_edo_ver": {
                        "label": "Contorno del Estado de Veracruz",
                        "scale": 1,
                        "position": 200,
                        "active": true
                    },
                    "c_mun_ver": {
                        "label": "Municipios del Estado de Veracruz",
                        "scale": 1,
                        "position": 1,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G2": {
                "label": "Infraestructura IVEA",
                "layers": {
                    "c_oficinas_cz": {
                        "label": "Puntos en donde se ubican las coordinaciones de zona del IVEA",
                        "scale": 1,
                        "position": 2,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_plazas_comunitarias": {
                        "label": "Ubicacion de las plazas comunitarias",
                        "scale": 1,
                        "position": 3,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G3": {
                "label": "Marco Geoestadístico IVEA",
                "layers": {
                    "c_coordinaciones_zona_tematico": {
                        "label": "Mapa tematico con los municipios que abarcan las coordinaciones de zona del IVEA",
                        "scale": 1,
                        "position": 3,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G4": {
                "label": "Pobreza multidimensional INEGI",
                "layers": {
                    "c_tematico_pobreza": {
                        "label": "Mapa tematico de pobreza",
                        "scale": 1,
                        "position": 4,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_grado_marginacion": {
                        "label": "Grado de marginacion por municipio",
                        "scale": 1,
                        "position": 5,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_grado_rezago_social": {
                        "label": "rezago social por municipio",
                        "scale": 1,
                        "position": 6,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G5": {
                "label": "Coordinaciones Regional Norte",
                "layers": {
                    "c_cz3001": {
                        "label": "Coordinación de Zona Tantoyuca",
                        "scale": 1,
                        "position": 7,
                        "active": false
                    },
                    "c_cz3003": {
                        "label": "Coordinación de Zona Chicontepec",
                        "scale": 1,
                        "position": 8,
                        "active": false
                    },
                    "c_cz3004": {
                        "label": "Coordinación de Zona Tuxpan",
                        "scale": 1,
                        "position": 9,
                        "active": false
                    },
                    "c_cz3005": {
                        "label": "Coordinación de Zona Poza Rica",
                        "scale": 1,
                        "position": 10,
                        "active": false
                    },
                    "c_cz3006": {
                        "label": "Coordinación de Zona Papantla",
                        "scale": 1,
                        "position": 11,
                        "active": false
                    },
                    "c_cz3007": {
                        "label": "Coordinación de Zona Espinal",
                        "scale": 1,
                        "position": 12,
                        "active": false
                    },
                    "c_cz3008": {
                        "label": "Coordinación de Zona Martinez",
                        "scale": 1,
                        "position": 13,
                        "active": false
                    },
                    "c_cz3024": {
                        "label": "Coordinación de Zona Huayacocotla",
                        "scale": 1,
                        "position": 14,
                        "active": false
                    },
                    "c_cz3025": {
                        "label": "Coordinación de Zona Panuco",
                        "scale": 1,
                        "position": 15,
                        "active": false
                    }
                }
            },
            "G6": {
                "label": "Coordinaciones Regional Centro",
                "layers": {
                    "c_cz3009": {
                        "label": "Coordinación de Zona Perote",
                        "scale": 1,
                        "position": 16,
                        "active": false
                    },
                    "c_cz3010": {
                        "label": "Coordinación de Zona Xalapa",
                        "scale": 1,
                        "position": 17,
                        "active": false
                    },
                    "c_cz3011": {
                        "label": "Coordinación de Zona Coatepec",
                        "scale": 1,
                        "position": 18,
                        "active": false
                    },
                    "c_cz3012": {
                        "label": "Coordinación de Zona Huatusco",
                        "scale": 1,
                        "position": 19,
                        "active": false
                    },
                    "c_cz3013": {
                        "label": "Coordinación de Zona Orizaba",
                        "scale": 1,
                        "position": 20,
                        "active": false
                    },
                    "c_cz3014": {
                        "label": "Coordinación de Zona Cordoba",
                        "scale": 1,
                        "position": 21,
                        "active": false
                    },
                    "c_cz3015": {
                        "label": "Coordinación de Zona Zongolica",
                        "scale": 1,
                        "position": 22,
                        "active": false
                    },
                    "c_cz3016": {
                        "label": "Coordinación de Zona Veracruz",
                        "scale": 1,
                        "position": 23,
                        "active": false
                    }
                }
            },
            "G7": {
                "label": "Coordinaciones Regional Sur",
                "layers": {
                    "c_cz3017": {
                        "label": "Coordinación de Zona Boca del Rio",
                        "scale": 1,
                        "position": 24,
                        "active": false
                    },
                    "c_cz3018": {
                        "label": "Coordinación de Zona Tierra Blanca",
                        "scale": 1,
                        "position": 25,
                        "active": false
                    },
                    "c_cz3019": {
                        "label": "Coordinación de Zona Cosamaloapan",
                        "scale": 1,
                        "position": 26,
                        "active": false
                    },
                    "c_cz3020": {
                        "label": "Coordinación de Zona San Andres",
                        "scale": 1,
                        "position": 27,
                        "active": false
                    },
                    "c_cz3021": {
                        "label": "Coordinación de Zona Acayucan",
                        "scale": 1,
                        "position": 28,
                        "active": false
                    },
                    "c_cz3022": {
                        "label": "Coordinación de Zona Minatitlan",
                        "scale": 1,
                        "position": 29,
                        "active": false
                    },
                    "c_cz3023": {
                        "label": "Coordinación de Zona Coatzacoalcos",
                        "scale": 1,
                        "position": 30,
                        "active": false
                    },
                    "c_cz3029": {
                        "label": "Coordinación de Zona Jaltipan",
                        "scale": 1,
                        "position": 31,
                        "active": false
                    }
                }
            },
            "G8": {
                "label": "Estimación del Rezago Educativo INEA 2025 (temático)",
                "layers": {
                    "c_rezago_educativo_porcentaje_analfabetismo": {
                        "label": "Mapa tematico de la estimación del rezago educativo INEA2025 (porcentaje_analfabetismo)",
                        "scale": 1,
                        "position": 32,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_rezago_educativo_porcentaje_sin_primaria": {
                        "label": "Mapa tematico de la estimación del rezago educativo INEA2025 (porcentaje_sin_primaria)",
                        "scale": 1,
                        "position": 33,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_rezago_educativo_porcentaje_sin_secundaria": {
                        "label": "Mapa tematico de la estimación del rezago educativo INEA2025 (porcentaje_sin_secundaria)",
                        "scale": 1,
                        "position": 34,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_rezago_educativo_porcentaje_rezago_total": {
                        "label": "Mapa tematico de la estimación del rezago educativo INEA2025 (porcentaje_rezago_total)",
                        "scale": 1,
                        "position": 35,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G9": {
                "label": "DENUE",
                "layers": {
                    "c_denue_escuelas_primarias": {
                        "label": "Escuelas primarias (DENUE 2026)",
                        "scale": 1,
                        "position": 36,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_denue_escuelas_secundarias": {
                        "label": "Escuelas secundarias (DENUE 2026)",
                        "scale": 1,
                        "position": 37,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_denue_escuelas_media_superior": {
                        "label": "Escuelas media superior (DENUE 2026)",
                        "scale": 1,
                        "position": 38,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G10": {
                "label": "Otras capas",
                "layers": {
                    "c_municipios_indigenas_pvd": {
                        "label": "Municipios indigenas del Plan Veracruzano de Desarrollo",
                        "scale": 1,
                        "position": 39,
                        "active": false
                    },
                    "c_lengua_indigena_mun": {
                        "label": "Lenguas indigenas por municipio (tematico)",
                        "scale": 1,
                        "position": 40,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    },
                    "c_mun_regiones_pvd": {
                        "label": "Regiones económicas del PVD (tematico)",
                        "scale": 1,
                        "position": 41,
                        "active": false,
                        "texts": {
                            "scale": 1,
                            "active": false
                        }
                    }
                }
            },
            "G11": {
                "label": "Rezago Educativo CENSO 2020",
                "layers": {
                    "c_rez_educxloc2020_ver_analfabeta": {
                        "label": "Localidades rurales con rezago educativo Censo 2020 (rez_educxloc2020_ver_analfabeta)",
                        "scale": 1,
                        "position": 42,
                        "active": false
                    },
                    "c_rez_educxloc2020_ver_sinprimaria": {
                        "label": "Localidades rurales con rezago educativo Censo 2020 (rez_educxloc2020_ver_sinprimaria)",
                        "scale": 1,
                        "position": 43,
                        "active": false
                    },
                    "c_rez_educxloc2020_ver_sinsecundaria": {
                        "label": "Localidades rurales con rezago educativo Censo 2020 (rez_educxloc2020_ver_sinsecundaria)",
                        "scale": 1,
                        "position": 44,
                        "active": false
                    },
                    "c_rez_educxloc2020_ver_rezago_total": {
                        "label": "Localidades rurales con rezago educativo Censo 2020 (rez_educxloc2020_ver_rezago_total)",
                        "scale": 1,
                        "position": 45,
                        "active": false
                    }
                }
            }
        }
    };
});
