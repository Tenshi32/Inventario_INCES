from model.modelos_model import ModelosModel
import random

class ModelosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = ModelosModel()

    def all_modelos(self):
        return self.modelo.get_all_modelos()

    def modelos_for_device(self, marca):
        return self.modelo.get_modelos_for_device(marca)

    def rastrear_modelo(self, id):
        if not id:
            return None
        return self.modelo.get_modelo(id)

    def crear_modelo(self, datos):

        valores = [
            datos['marca_modelo'],
            datos['modelo'],
            1,
        ]
        retorno = self.modelo.create_modelo(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado con nombre: " + datos['modelo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_modelo(self, datos):
        valores = [
            datos['marca_modelo'],
            datos['modelo'],
            datos['id_modelo']
        ]
        retorno = self.modelo.update_modelo(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el modelo de id: " + datos['id_modelo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        
    def toggle_modelo(self, datos):
        valores = [
            datos['id_status'],
            datos['id_modelos']
        ]
        retorno = self.modelo.toggle_modelo(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el modelo de id: " + datos['id_modelos']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        