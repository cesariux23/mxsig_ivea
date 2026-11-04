import os
import sys

# Import de la definición de coordinaciones de zona
sys.path.append(os.getcwd())
from scripts.layers.constantes import coordinaciones

#==========================================================================
# Definición de la capa
#==========================================================================

descripcion = "Poligonos de los municipios que abarcan las coordinaciones de zona del IVEA"
output = "coordinaciones_zona"

# config base
layer = {
    "type": "POLYGON",
    'data':{
        'table' : 'marco_geoestadistico.mun_coordinaciones',
        'select': ['clv_zona']
    },
    "class" : {
         "style": {
             "color":"",
             "opacity": 60,
             "outlinecolor": "60,60,60",
             "width": 0.8

         }
    }
}

layers = []
for cz in coordinaciones:
    layers.append(
        {
            "name": f"{cz['id_capa']}",
            "metadata": {
                'wms_title': f"CZ{cz['id_cz']} - {cz['nombre']}",
            },
            "data":{
                "where": f"clv_zona = {cz['id_cz']}",
            },
            "class" : {
                "style":
                {
                    "color": f"{cz['color']}",
                    "outlinecolor": f"{cz['color']}",
                }
            },
            "_tree": {
                "grupo": 'coordinaciones_' + cz['region'].lower(),
            },
        }
    )

