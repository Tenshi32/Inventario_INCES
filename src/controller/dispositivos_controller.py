from model.dispositivos_model import DispositivosModel
import random

class DispositivosController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = DispositivosModel()

    #buscador todos los dispositivos
    def all_dispositivos(self):
        return self.modelo.get_all_device()

    #buscador dispositivos especifico por id
    def rastrear_dispositivo(self, id):
        if not id:
            return None
        return self.modelo.get_device(id)

    #buscador si existe dispositivo por tipo de categoria y valor (codigo o serial)
    def buscar_dispositivo_si_existe(self, tipo_dispositivo, valor):
        return self.modelo.get_dispositivo_if_exist(tipo_dispositivo, valor)
    
    # crear dispositivo
    def crear_dispositivo(self, datos):

        if 'id_dispositivo' not in datos:
            datos['id_dispositivo'] = str(random.randint(10**5, 10**10 - 1))

        datos['posee_codigo'] = "No" if datos['cd_dispositivo'] == "" else "Si"
        datos['modelo_producto'] = "1" if datos['posee_modelo'] == "No" else datos['modelo_producto'] 
        datos['marca_producto'] = "1" if datos['posee_marca'] == "No" else datos['marca_producto'] 

        valores = [
            #Datos del Dispositivo
            datos['id_dispositivo'],
            datos['posee_codigo'],
            datos['cd_dispositivo'],

            datos['posee_marca'],
            datos['posee_modelo'],
            datos['marca_producto'],
            datos['modelo_producto'],
            datos['tipo_dispositivo'],
            datos['posee_serial'],
            datos['serial_producto'],

            datos['descripcion_general'],
            datos['observaciones_tecnicas'],

            datos['status']
        ]

        retorno = self.modelo.create_device(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "Registro creado el dispositivo de id: " + datos['cd_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    # editar dispositivo
    def editar_dispositivo(self, datos):
        
        datos['posee_codigo'] = "No" if datos['cd_dispositivo'] == "" else "Si"
        datos['modelo_producto'] = "1" if datos['posee_modelo'] == "No" else datos['modelo_producto'] 
        datos['marca_producto'] = "1" if datos['posee_marca'] == "No" else datos['marca_producto']

        valores = [
            #Datos del Dispositivo
            datos['posee_codigo'],
            datos['cd_dispositivo'],

            datos['posee_marca'],
            datos['posee_modelo'],
            datos['marca_producto'],
            datos['modelo_producto'],
            datos['tipo_dispositivo'],
            datos['posee_serial'],
            datos['serial_producto'],

            datos['descripcion_general'],
            datos['observaciones_tecnicas'],

            datos['status'],

            datos['id_dispositivo'],
        ]

        retorno = self.modelo.update_device(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el dispositivo de id: " + datos['id_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    # cambiar estado dispositivo
    def cambiar_estado_dispositivo(self, datos):
        valores = [
            datos['status'],
            datos['id_dispositivo']
        ]
        retorno = self.modelo.toggle_status_device(valores)

        if retorno is not None:

            status_device = 'Inoperativo' if datos['status'] == '2' else ('Operativo' if datos['status'] == '1' else 'Desincorporado')

            return {"status": True, "mensaje": "se cambio el estado a "+ status_device +" del dispositivo de id: " + datos['id_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
    
    # eliminar dispositivo
    def eliminar_dispositivo(self, datos):

        valores = [
            datos['id_dispositivo']
        ]

        retorno = self.modelo.delete_device(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se eliminó el dispositivo de id: " + datos['id_dispositivo']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}

