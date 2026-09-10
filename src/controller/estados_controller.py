from model.estado_model import EstadosModel
import random

class EstadosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = EstadosModel()

    def all_estados(self):
        return self.modelo.get_all_estados()

    def rastrear_estado(self, id):
        if not id:
            return None
        return self.modelo.get_estado(id)

    def crear_estado(self, datos):

        valores = [
            datos['estado'],
        ]

        retorno = self.modelo.create_estado(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado: " + datos['estado']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_estado(self, datos):
        valores = [
            datos['estado'],
            datos['id_estado']
        ]
        retorno = self.modelo.update_estado(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la estado de id: " + datos['id_estado']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def toggle_estado(self, datos):
        valores = [
            datos['id_status'],
            datos['id_estado']
        ]
        retorno = self.modelo.toggle_estado(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la estado de id: " + datos['id_estado']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        