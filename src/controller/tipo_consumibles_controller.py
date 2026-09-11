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
            1,
        ]

        retorno = self.modelo.create_tipo_consumibles(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado : " + datos['consumible']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    def toggle_tipo_consumible(self, datos):
        valores = [
            datos['id_status'],
            datos['id_tipo_consumible']
        ]
        retorno = self.modelo.toggle_status_tipo_consumibles(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se cambio el estado al tipo_consumible de id: " + datos['id_tipo_consumible']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_tipo_consumible(self, datos):
        valores = [
            datos['consumible'],
            datos['grupo_consumible'],
            datos['id_tipo_consumible']
        ]
        retorno = self.modelo.update_tipo_consumibles(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el tipo de consumible de id: " + datos['id_tipo_consumible']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        