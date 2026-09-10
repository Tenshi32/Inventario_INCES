from model.marcas_model import MarcasModel
import random

class MarcasController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = MarcasModel()


    def all_marcas(self):
        return self.modelo.get_all_marcas()

    def rastrear_marca(self, id):
        if not id:
            return None
        return self.modelo.get_marca(id)

    def crear_marca(self, datos):

        valores = [
            datos['marca'],
            1,
        ]
        retorno = self.modelo.create_marca(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['cd_switches']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_marca(self, datos):
        valores = [
            datos['marca'],
            datos['id_marcas']
        ]
        retorno = self.modelo.update_marca(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la marca de id: " + datos['id_marcas']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def toggle_marca(self, datos):
        valores = [
            datos['id_status'],
            datos['id_marcas']
        ]
        retorno = self.modelo.toggle_marca(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la marca de id: " + datos['id_marcas']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        