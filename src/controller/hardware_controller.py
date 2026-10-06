from random import random

from model.hardware_model import HardawareModel

class HardwareController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = HardawareModel()

    def all_hardware(self):
        return self.modelo.get_all_keyboards()

    def rastrear_hardware(self, id):
        if not id:
            return None
        return self.modelo.get_keyboard(id)

    def validation_field(self, datos):

        if 'id_22' not in datos or not datos['id_22']:
            datos['id_22'] = ""
            datos['posee_regulador'] = "No" if datos['id_22'] == "" else datos['id_22'] 
            
        if 'id_21' not in datos or not datos['id_21']:
            datos['id_21'] = ""
            datos['posee_corneta'] = "No" if datos['id_21'] == "" else datos['id_21'] 

        campos_requeridos = [
        'id_20', 'id_17', 'id_18', 'id_19']

        for campo in campos_requeridos:
            if campo not in datos or datos[campo] is None:
                return {"status": False, "mensaje": f"El campo obligatorio '{campo}' no está presente."}

        # 2. Sanitizar datos de texto (quitar espacios en blanco al inicio/final)
        for clave, valor in datos.items():
            if isinstance(valor, str):
                datos[clave] = valor.strip()

        if datos['posee_regulador'] not in ["Si", "No"]:
            return {"status": False, "mensaje": "El campo 'posee_regulador' debe ser 'Si' o 'No'."}
        if datos['posee_regulador'] == "Si" and (not datos['id_22'] or datos['id_22'] == "1"):
            return {"status": False, "mensaje": "Indicó que posee_regulador, pero no seleccionó el codigo o serial de un regulador."}

        if datos['posee_corneta'] not in ["Si", "No"]:
                    return {"status": False, "mensaje": "El campo 'posee_corneta' debe ser 'Si' o 'No'."}
        if datos['posee_corneta'] == "Si" and (not datos['id_21'] or datos['id_21'] == "1"):
            return {"status": False, "mensaje": "Indicó que posee_corneta, pero no seleccionó el codigo o serial de una corneta."}
        
        return {"status": True}

    def crear_hardware(self, datos):

        validationes = self.validation_field(datos)
        
        if not validationes["status"]:
             return validationes
        
        else:
            valores = [
                #Datos del Switche
                datos['id_hardware'],
                datos['id_20'], # PC
                datos['id_17'], # Monitor
                datos['id_18'], # Mouses
                datos['id_19'], # Teclado
                datos['posee_regulador'],
                datos['id_22'], # Regulador
                datos['posee_corneta'],
                datos['id_21'], # Corneta
            ]

            retorno = self.modelo.create_hardware(valores)

            if retorno is not None:

                return True

            else:

                return False

    def Edit_hardware(self, datos):

        validationes = self.validation_field(datos)

        if not validationes["status"]:
            return validationes
        
        else:

            valores = [
                #Datos del Switche
                datos['id_20'],
                datos['id_17'],
                datos['id_18'],
                datos['id_19'],
                datos['posee_regulador'],
                datos['id_22'],
                datos['posee_corneta'],
                datos['id_21'],
                datos['created'],
            ]

            retorno = self.modelo.update_hardware(valores)

        if retorno is not None:

            return True
            
        else:

            return False
        