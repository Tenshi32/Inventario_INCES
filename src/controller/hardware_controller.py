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

    def crear_hardware(self, datos):

        if 'id_22' not in datos or not datos['id_22']:
            datos['id_22'] = ""
            datos['posee_regulador'] = "No" if datos['id_22'] == "" else datos['id_22'] 
            
        if 'id_21' not in datos or not datos['id_21']:
            datos['id_21'] = ""
            datos['posee_corneta'] = "No" if datos['id_21'] == "" else datos['id_21'] 
            
        valores = [
            #Datos del Switche
            datos['id_hardware'],
            datos['id_20'],
            datos['id_17'],
            datos['id_18'],
            datos['id_19'],
            datos['posee_regulador'],
            datos['id_22'],
            datos['posee_corneta'],
            datos['id_21'],
        ]

        retorno = self.modelo.create_hardware(valores)

        if retorno is not None:

            return True
        
        else:

            return False

    def Edit_hardware(self, datos):

        datos['posee_regulador'] = "No" if datos['id_22'] == "" else datos['id_22'] 
        datos['posee_corneta'] = "No" if datos['id_21'] == "" else datos['id_21'] 
            
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

            return {"status": True, "mensaje": "se edito el hardware de id: " + datos['created']}
            
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        