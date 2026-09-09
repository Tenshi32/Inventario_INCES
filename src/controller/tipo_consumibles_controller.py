from model.tipo_consumibles_model import TipoConsumiblesModel
import random

class TipoConsumiblesController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = TipoConsumiblesModel()

    def all_tipo_consumibles(self):
        return self.modelo.get_all_tipo_consumibles()

    def rastrear_tipo_consumible(self, id):
        if not id:
            return None
        return self.modelo.get_tipo_consumible(id)

    def crear_tipo_consumible(self, datos):

        valores = [
            datos['consumible'],
            datos['grupo_consumible'],
            datos['estado_consumible'],
        ]

        retorno = self.modelo.create_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['cd_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    def Toggle_tipo_consumible(self, datos):
        valores = [
            datos['status'],
            datos['id_tipo_consumible']
        ]
        retorno = self.modelo.toggle_status_tipo_consumible(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se cambio el estado al tipo_consumible de id: " + datos['id_tipo_consumible']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def Edit_tipo_consumible(self, datos):
        valores = [
            datos['cd_switches'],
            datos['marca_producto'],
            datos['posee_modelo'],
            datos['modelo_producto'],
            datos['posee_serial'],
            datos['serial'],
            datos['id_piso'],
            datos['status'],
            datos['created']
        ]
        retorno = self.modelo.update_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el switch de id: " + datos['created']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        