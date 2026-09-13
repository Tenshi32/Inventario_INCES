from model.estaciones_model import EstacionTrabajoModel
from controller.hardware_controller import HardwareController
from controller.software_controller import SoftwareController
import random

class EstacionesController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = EstacionTrabajoModel()
        self.controllerHardware = HardwareController()
        self.controllerSoftware = SoftwareController()

    def all_estaciones(self):
        return self.modelo.get_all_station_work()

    def rastrear_estacion(self, id):
        if not id:
            return None
        return self.modelo.get_station_work(id)

    def crear_estacion(self, datos):

        datos['id_estacion'] = str(random.randint(10**5, 10**10 - 1))

        datos['en_red'] = "No"

        if 'id_hardware' not in datos: 
            datos['id_hardware'] = datos['id_estacion'] 
            datos['id_softwares'] = datos['id_estacion'] 

        Hardware = self.controllerHardware.crear_hardware(datos)
        Software = self.controllerSoftware.crear_software(datos)

        if Hardware is not None and Software is not None:
            
            valores = [
                #Datos del Switche
                datos['id_estacion'],
                datos['id_usuario'],
                datos['id_hardware'],
                datos['id_softwares'],
                datos['en_red'],
                "",
            ]

            retorno = self.modelo.create_station_work(valores)

            if retorno is not None:

                return {"status": True, "mensaje": "Registro creado id: " + datos['id_estacion']}
            
            else:

                return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def Edit_estacion(self, datos):

        Hardware = self.controllerHardware.Edit_hardware(datos)
        Software = self.controllerSoftware.Edit_software(datos)
       
        if Hardware is not None and Software is not None:
            
            valores = [
                #Datos del Switche
                datos['id_usuario'],
                datos['created'],
            ]

            retorno = self.modelo.update_station_work(valores)

            if retorno is not None:

                return {"status": True, "mensaje": "se edito el estacion de id: " + datos['created']}
            
            else:

                return {"status": False, "mensaje": "No se pudo guardar el registro"}
        