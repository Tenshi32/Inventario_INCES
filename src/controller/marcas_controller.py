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

        if 'id_switches' not in datos:
            datos['id_switches'] = str(random.randint(10**5, 10**10 - 1))

        valores = [
            datos['id_switches'],
            datos['cd_switches'],
            datos['marca'],
            datos['posee_modelo'],
            datos['modelo'],
            datos['posee_serial'],
            datos['serial'],
            datos['id_piso'],
            datos['status']
        ]
        retorno = self.modelo.create_marca(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['cd_switches']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def Edit_marca(self, datos):
        valores = [
            datos['marca'],
            datos['id_marcas']
        ]
        retorno = self.modelo.update_marca(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito la marca de id: " + datos['id_marcas']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        