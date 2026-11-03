/*
Archivo personalizado para IVEA, sustituye al archivo original de MXSIG

Los grupos y temas se generan desde:
  - scripts/layers/tree_config.py
  - scripts/layers/**.py  (clave _tree)

Para regenerar:
  python scripts/genera_tree.py
*/
define(['../config/treeLayers'], function(treeLayers) {
    var data = {
        themes: {
            ...treeLayers.themes
        },
        baseLayers: {
            "B1": {
                "type": "Wms",
                "label": "Topogr&aacute;fico sin sombreado - INEGI",
                "img": "mapa_sin_sombreado.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                "layer": "MapaBaseTopograficov61_sinsombreado",
                "rights": "Derechos Reservados &copy; INEGI",
                "tiled": true,
                "legendlayer": [
                    "c100",
                    "c101",
                    "c102",
                    "c102-r",
                    "c102m",
                    "c103",
                    "c109",
                    "c110",
                    "c111",
                    "c112",
                    "c200",
                    "c201",
                    "c202",
                    "c203",
                    "c206",
                    "c300",
                    "c301",
                    "c302",
                    "c310",
                    "c311",
                    "c762",
                    "c793",
                    "c795"
                ],
                "desc": "REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003",
                "clasification": "VECTORIAL"
            },
            "B2": {
                "type": "Wms",
                "label": "Topogr&aacute;fico gris - INEGI ",
                "img": "mapa_gris.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                "layer": "MapaBaseTopograficov61_sinsombreado_gris",
                "rights": "Derechos Reservados &copy; INEGI",
                "tiled": true,
                "legendlayer": [
                    "c100",
                    "c101",
                    "c102",
                    "c102m",
                    "c103",
                    "c109",
                    "c110",
                    "c112",
                    "c200",
                    "c202",
                    "c203",
                    "c300",
                    "c301",
                    "c302",
                    "c310",
                    "c311",
                    "c793",
                    "c795"
                ],
                "legendUrl": "http://10.152.11.41:82/cgi-bin/ms62/mapserv?map=/opt/map/mdm60/mdm61leyendaprueba_gris.map&Request=GetLegendGraphic&format=image/png&Version=1.1.1&Service=WMS&LAYER=",
                "desc": "REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003",
                "clasification": "VECTORIAL"
            },
            "B3": {
                "type": "Wms",
                "label": "Topogr&aacute;fico con sombreado - INEGI",
                "img": "mapa_con_sombreado.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                "layer": "MapaBaseTopograficov61_consombreado",
                "rights": "Derechos Reservados &copy; INEGI",
                "tiled": true,
                "legendlayer": [
                    "c100",
                    "c101",
                    "c102",
                    "c102-r",
                    "c102m",
                    "c103",
                    "c109",
                    "c110",
                    "c111",
                    "c112",
                    "c200",
                    "c201",
                    "c202",
                    "c203",
                    "c206",
                    "c300",
                    "c301",
                    "c302",
                    "c310",
                    "c311",
                    "c762",
                    "c793",
                    "c795"
                ],
                "desc": "REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003",
                "clasification": "VECTORIAL"
            },
            "B4": {
                "type": "Wms",
                "label": "Hipsogr&aacute;fico - INEGI",
                "img": "baseHipsografico.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                "layer": "MapaBaseHipsografico",
                "rights": "&copy; INEGI 2013",
                "tiled": true,
                "legendlayer": [
                    "img_altimetria.png"
                ],
                "desc": "IMAGEN DE RELIEVE QUE MUESTRA UNA COMBINACION DE ELEVACION A TRAVES DE COLORES HIPSOGRAFICOS, GENERADA POR PROCESAMIENTO DEL CONTINUO DE ELEVACIONES MEXICANOS DE 3.0 DE 15 METROS.",
                "clasification": "RASTER"
            },
            "B5": {
                "type": "Wms",
                "label": "Ortofotos - INEGI",
                "img": "baseOrtos.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                "layer": "MapaBaseOrtofoto",
                "rights": "&copy; INEGI 2013",
                "tiled": true,
                "desc": "CONJUNTO DE IMAGENES AEREAS ORTORECTIFICADAS A DIVERSAS ESCALAS Y RESOLUCIONES, PROVENIENTES DEL ACERVO DE ORTOFOTOS DE INEGI Y QUE CORRESPONDEN A TOMAS REALIZADAS EN EL LAPSO 2005-2012.",
                "clasification": "RASTER"
            },
            "B6": {
                "type": "Wms",
                "label": "ICDS - INEGI",
                "img": "baseICDS.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                //Check ip,
                "layer": "ICDS",
                "rights": "&copy; INEGI 2017",
                "tiled": true,
                "desc": "CONJUNTO DE IMAGENES CARTOGÁFICAS DIGITALES DE LA CARTAS TOPOGRÁFICAS ESCALA 1:50,000",
                "clasification": "RASTER"
            },
            "B7": {
                "type": "Osm",
                "label": "Open Street Map",
                "img": "Osm.jpg",
                "rights": "&copy; OpenStreetMap contributors",
                "clasification": "VECTORIAL"
            },
            "B9": {
                "type": "Esri",
                "label": "Esri map",
                "img": "Esri.jpg",
                "url": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
                "rights": "&copy; ESRI",
                "clasification": "VECTORIAL"
            },
            "B10": {
                "hidden": true,
                "type": "Wms",
                "label": "Topográfico gris INE-INEGI",
                "img": "mapa_gris.jpg",
                "url": [
                    "https://gaiamapas1.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas3.inegi.org.mx/mdmCache/service/wms?",
                    "https://gaiamapas2.inegi.org.mx/mdmCache/service/wms?"
                ],
                //Check ip,
                "layer": "MapaBase_geoelectoral_sl",
                "rights": "&copy; INEGI 2017",
                "tiled": true,
                "desc": "CONJUNTO DE IMAGENES CARTOGÁFICAS DIGITALES DE LA CARTAS TOPOGRÁFICAS ESCALA 1:50,000",
                "clasification": "VECTORIAL"
            }
        },
        layers: {
            groups: {
                ...treeLayers.groups
            }
        }
    };
    if (typeof(treeConfig) != 'undefined') {
        data = $.extend(data, treeConfig);
    }
    return data;
});
