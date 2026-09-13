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

        datos['posee_regulador'] = "No" if datos['cd_regulador'] == "" else datos['cd_regulador'] 
        datos['posee_corneta'] = "No" if datos['cd_corneta'] == "" else datos['cd_corneta'] 
            
        valores = [
            #Datos del Switche
            datos['id_hardware'],
            datos['id_cpu'],
            datos['id_monitor'],
            datos['id_mouse'],
            datos['id_teclado'],
            datos['posee_regulador'],
            datos['cd_regulador'],
            datos['posee_corneta'],
            datos['cd_corneta'],
        ]

        retorno = self.modelo.create_hardware(valores)

        if retorno is not None:

            return True
        
        else:

            return False

    def Edit_hardware(self, datos):
            
        valores = [
            #Datos del Switche
            datos['id_cpu'],
            datos['id_monitor'],
            datos['id_mouse'],
            datos['id_teclado'],
            datos['posee_regulador'],
            datos['cd_regulador'],
            datos['posee_corneta'],
            datos['cd_corneta'],
            datos['created'],
        ]

        retorno = self.modelo.update_hardware(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el hardware de id: " + datos['created']}
            
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        