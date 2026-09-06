from model.tipo_dispositivos_model import TipoDispositivosModel
import random

class TipoDispositivosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = TipoDispositivosModel()

    def all_tipo_dispositivos(self):
        return self.modelo.get_all_tipo_dispositivos()

    def rastrear_tipo_dispositivo(self, id):
        if not id:
            return None
        return self.modelo.get_tipo_dispositivo(id)

    def crear_tipo_dispositivo(self, datos):

   
        valores = [
            datos['tipo_dispositivos'],
            datos['estado_tipo_dispositivo'],
        ]

        retorno = self.modelo.create_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado el tipo dispositivos de id: " + datos['id_tipo_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def editar_tipo_dispositivo(self, datos):
        valores = [
            datos['id_tipo_dispositivo'],
            datos['tipo_dispositivos'],
            datos['estado_tipo_dispositivo'],
        ]
        retorno = self.modelo.update_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el tipo de dispositivo de id: " + datos['id_tipo_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def eliminar_tipo_dispositivo(self, datos):

        valores = [
            datos['id_tipo_dispositivo']
        ]

        retorno = self.modelo.delete_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se eliminó el tipo de dispositivo de id: " + datos['id_tipo_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        