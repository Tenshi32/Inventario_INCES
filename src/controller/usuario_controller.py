from model.usuario_model import UsuarioModel
from datetime import datetime
import random

class UsuariosController:

    def __init__(self):
        self.modelo = UsuarioModel()

    def all_usuarios(self):
        return self.modelo.get_all_usuarios()

    def rastrear_usuario(self, id_usuario):
        if not id_usuario:
            return None
        return self.modelo.get_usuario(id_usuario)
    
    def unico_usuarios(self, id_usuario):
        if not id_usuario:
            return None
        return self.modelo.get_usuario(id_usuario)

    def crear_usuario(self, datos):

        if 'cedula' not in datos:
            return {"status": True, "mensaje": f"Usuario creado id: {datos['cedula']}"}

        valores = [
            datos['cedula'],
            datos['nombre'],
            datos['apellido'],
            datos['correo'],
            datos['cargo'],
            datos['telefono'],
            datos['status'],
        ]

        retorno = self.modelo.create_usuario(valores)

        if retorno is not None:
            return {"status": True, "mensaje": f"Usuario creado con la cedula: V-{datos['cedula']}"}
        else:
            return {"status": False, "mensaje": "No se pudo crear el usuario"}

    def editar_usuario(self, datos):

        if 'cedula' not in datos:
            return {"status": True, "mensaje": f"Usuario creado id: {datos['cedula']}"}

        valores = [
            datos['cedula'],
            datos['nombre'],
            datos['apellido'],
            datos['correo'],
            datos['cargo'],
            datos['telefono'],
            datos['status'],
            datos['cedula'],
        ]

        retorno = self.modelo.update_usuario(valores)

        if retorno is not None:
            return {"status": True, "mensaje": f"Usuario editado con la cedula: V-{datos['cedula']}"}
        else:
            return {"status": False, "mensaje": "No se pudo editar el usuario"}

    def toggle_usuario(self, datos):
        valores = [
            datos['status'],
            datos['cedula'],
        ]
        retorno = self.modelo.toggle_usuario(valores)

        if retorno is not None:
            return {"status": True, "mensaje": "Estado actualizado"}
        return {"status": False, "mensaje": "No se pudo actualizar el estado"}