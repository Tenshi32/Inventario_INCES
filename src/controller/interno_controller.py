from model.interno_model import InternoModel
from datetime import datetime
import hashlib

class InternosController:

    def __init__(self):
        self.modelo = InternoModel()

    def all_internos(self):
        return self.modelo.get_all_internos()

    def rastrear_interno(self, id_interno):
        if not id_interno:
            return None
        return self.modelo.get_interno(id_interno)

    def unico_internos(self, id_interno):
        if not id_interno:
            return None
        return self.modelo.get_interno(id_interno)

    def crear_interno(self, datos):

        if datos['password'] == datos['passwordConfirm']:
            # Crear el objeto hash SHA-256
            resultado = hashlib.sha256(datos['password'].encode('utf-8'))

            # Obtener el hash en formato hexadecimal
            hex_dig = resultado.hexdigest()

            valores = [
                datos['id_usuario'],
                datos['id_usuario'],
                hex_dig,
                datos['id_rol_interno'],
            ]

            retorno = self.modelo.create_interno(valores)

            if retorno is not None:
                return {"status": True, "mensaje": f"Interno creado con la cedula: V-{datos['id_usuario']}"}
            else:
                return {"status": False, "mensaje": "No se pudo crear el interno"}
            
        else:

            return {"status": False, "mensaje": "Las contraseñas no coinciden"}

    def editar_interno(self, datos):

        valores = [
            datos['id_usuario'],
            datos['id_rol_interno'],
            datos['id_usuario'],
        ]

        retorno = self.modelo.update_usuario(valores)

        if retorno is not None:
            return {"status": True, "mensaje": f"Interno editado con la cedula: V-{datos['id_usuario']}"}
        else:
            return {"status": False, "mensaje": "No se pudo editar el interno"}

    def toggle_interno(self, datos):

        valores = [
            datos['status'],
            datos['cedula'],
        ]
        retorno = self.modelo.toggle_interno(valores)

        if retorno is not None:
            return {"status": True, "mensaje": "Estado actualizado"}
        
        return {"status": False, "mensaje": "No se pudo actualizar el estado"}