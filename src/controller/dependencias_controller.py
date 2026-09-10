from model.dependencias_model import DependenciasModel
import random

class DependenciasController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = DependenciasModel()


    def all_dependencias(self):
        return self.modelo.get_all_dependencias()

    def rastrear_dependencia(self, id):
        if not id:
            return None
        return self.modelo.get_dependencia(id)

    def crear_dependencia(self, datos):

        valores = [
            datos['dependencia'],
            datos['estado_dependencia'],
            datos['id_piso'],
            datos['codigo'],
            1,
        ]
        retorno = self.modelo.create_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['codigo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_dependencia(self, datos):
        valores = [
            datos['dependencia'],
            datos['estado_dependencia'],
            datos['id_piso'],
            datos['codigo'],
            datos['id_dependencia'],
        ]
        retorno = self.modelo.update_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la dependencia de id: " + datos['codigo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        
    def toggle_dependencia(self, datos):

        valores = [
            datos['id_status'],
            datos['id_dependencia'],
        ]
        retorno = self.modelo.toggle_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se elimino la dependencia de id: " + datos['id_dependencia']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        