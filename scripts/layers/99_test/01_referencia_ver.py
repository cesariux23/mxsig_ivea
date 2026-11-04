descripcion = "Referencia del Estado de Veracruz"
output = "test_ver"

# CONFIGURACIONES GLOBALES
layer = {
    'type': 'POLYGON',
    'class':{
        'style': {
            'outlinecolor' : '255,128,0',
            'width':'1',
            'color':'255,128,0',
            'opacity':'30',
            
        }
    }
    
}

# capas
layers =  [
    {
        'name': 'test_mun_ver',
        'metadata': {
            'wms_title': 'Capa de municipios reproyectados',
        },
        'data': {
            'table': 'marco_geoestadistico.mun_ver_reproy'
        },
        '_tree': {
            'grupo': 'test',
        },
    },
  ]
