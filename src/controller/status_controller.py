from model.status_model import StatusModel
import random

class StatusController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = StatusModel()

    def all_status(self):
        return self.modelo.get_all_status()

    def rastrear_status(self, id):
        if not id:
            return None
        return self.modelo.get_status(id)

    def crear_status(self, datos):

        valores = [
            datos['statu'],
        ]

        retorno = self.modelo.create_status(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado: " + datos['statu']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_status(self, datos):
        valores = [
            datos['statu'],
            datos['id_statu']
        ]
        retorno = self.modelo.update_status(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la statu de id: " + datos['id_statu']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}