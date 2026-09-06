from model.tipo_servicios_model import TipoServiciosModel
import random

class TipoServiciosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = TipoServiciosModel()

    def all_tipo_servicios(self):
        return self.modelo.get_all_tipo_servicios()

    def rastrear_tipo_servicio(self, id):
        if not id:
            return None
        return self.modelo.get_tipo_servicio(id)

    def crear_tipo_servicio(self, datos):

        datos['id_tipo_servicio'] = str(random.randint(10**5, 10**10 - 1))

        dispositivos = self.controllerDispositivo.crear_dispositivos(datos)

        if dispositivos is not None:
            valores = [
                #Datos del Switche
                datos['id_switches'],
                datos['id_dispositivo'],
                datos['tipo_servicio'],
                datos['n_puertos'],
                datos['puertos_adicionales'],
                datos['direccion_mac'],
            ]

            retorno = self.modelo.create_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado id: " + datos['cd_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    def Toggle_switch(self, datos):
        valores = [
            datos['status'],
            datos['id_switches']
        ]
        retorno = self.modelo.toggle_status_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se cambio el estado al switch de id: " + datos['id_switches']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

    def Edit_switch(self, datos):
        valores = [
            datos['cd_switches'],
            datos['marca_producto'],
            datos['posee_modelo'],
            datos['modelo_producto'],
            datos['posee_serial'],
            datos['serial'],
            datos['id_piso'],
            datos['status'],
            datos['created']
        ]
        retorno = self.modelo.update_switch(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el switch de id: " + datos['created']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        