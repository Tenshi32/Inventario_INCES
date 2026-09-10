from model.tipo_servicios_model import TipoServiciosModel
import random

class TipoServiciosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = TipoServiciosModel()

    def all_tipo_servicios(self):
        return self.modelo.get_all_tipo_servicios()

    def rastrear_tipo_servicio(self, id):
        if not id:
            return None
        return self.modelo.get_tipo_servicio(id)

    def crear_tipo_servicio(self, datos):

        valores = [
            #Datos del Switche
            datos['servicio'],
            1,
        ]

        retorno = self.modelo.create_tipo_servicio(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado: " + datos['servicio']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    def toggle_tipo_servicio(self, datos):
        valores = [
            datos['id_status'],
            datos['id_tipo_servicios']
        ]
        retorno = self.modelo.toggle_status_tipo_servicio(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se cambio el estado el tipo de servicio de id: " + datos['id_tipo_servicios']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_tipo_servicio(self, datos):
        valores = [
            datos['servicio'],
            datos['id_tipo_servicios'],
        ]
        retorno = self.modelo.update_tipo_servicio(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el tipo de servicio de id: " + datos['id_tipo_servicios']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        