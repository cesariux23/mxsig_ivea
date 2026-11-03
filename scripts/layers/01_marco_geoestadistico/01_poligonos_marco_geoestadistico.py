descripcion = "Marco Geoestadistico del Estado de Veracruz"
output = "marco_geoestadistico_ver"

# CONFIGURACIONES GLOBALES
layer = {
    'type': 'POLYGON',
    'class':{
        'style': {
            'outlinecolor' : '0,0,0',
            'width':'1',
        }
    }
    
}

# capas
layers =  [
    {
        'name': 'edo_ver',
        'metadata': {
            'wms_title': 'Contorno del Estado de Veracruz',
        },
        'data': {
            'table': 'marco_geoestadistico.entidad_ver'
        },
        '_tree': {
            'grupo': 'marco_geoestadistico',
            'position': 200,
            'active': True,
        },
    },
    {
        'name': 'mun_ver',
        'metadata': {
            'wms_title': 'Municipios del Estado de Veracruz',
        },
        'data': {
            'table': 'marco_geoestadistico.mun_ver',
        },
        'labelitem': 'nomgeo',
        'class': {
            'style': {
                'outlinecolor': '90,90,90',
            },
        },
        '_tree': {
            'grupo': 'marco_geoestadistico',
            'position': 1,
        },
    },
]
