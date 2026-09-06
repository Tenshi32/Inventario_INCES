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

        if 'id_dependencia' not in datos:
            datos['id_dependencia'] = str(random.randint(10**5, 10**10 - 1))

        valores = [
            datos['id_dependencia'],
            datos['nombre'],
            datos['descripcion'],
            datos['activo'],
        ]
        retorno = self.modelo.create_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['id_dependencia']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_dependencia(self, datos):
        valores = [
            datos['nombre'],
            datos['descripcion'],
            datos['activo'],
            datos['id_dependencia']
        ]
        retorno = self.modelo.update_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la dependencia de id: " + datos['id_dependencia']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        
    def eliminar_dependencia(self, datos):
        valores = [
            datos['id_dependencia']
        ]
        retorno = self.modelo.delete_dependencia(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se elimino la dependencia de id: " + datos['id_dependencia']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        