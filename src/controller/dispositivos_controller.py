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

    def validation_field(self, datos):

        # 4. Asignaciones automáticas y normalización de valores
        if 'id_dispositivo' not in datos or not datos['id_dispositivo']:
            datos['id_dispositivo'] = str(random.randint(10**5, 10**10 - 1))

        campos_requeridos = [
        'cd_dispositivo', 'posee_marca', 'posee_modelo', 
        'marca_producto', 'modelo_producto', 'tipo_dispositivo', 
        'posee_serial', 'serial_producto', 'status'
        ]

        for campo in campos_requeridos:
            if campo not in datos or datos[campo] is None:
                return {"status": False, "mensaje": f"El campo obligatorio '{campo}' no está presente."}

        # 2. Sanitizar datos de texto (quitar espacios en blanco al inicio/final)
        for clave, valor in datos.items():
            if isinstance(valor, str):
                datos[clave] = valor.strip()

        # 3. Validar consistencias lógicas (Banderas "Si"/"No")

        # Validar Marca
        if datos['posee_marca'] not in ["Si", "No"]:
            return {"status": False, "mensaje": "El campo 'posee_marca' debe ser 'Si' o 'No'."}
        if datos['posee_marca'] == "Si" and (not datos['marca_producto'] or datos['marca_producto'] == "1"):
            return {"status": False, "mensaje": "Indicó que posee marca, pero no seleccionó una marca válida."}
        # Validar Modelo
        if datos['posee_modelo'] not in ["Si", "No"]:
            return {"status": False, "mensaje": "El campo 'posee_modelo' debe ser 'Si' o 'No'."}
        if datos['posee_modelo'] == "Si" and (not datos['modelo_producto'] or datos['modelo_producto'] == "1"):
            return {"status": False, "mensaje": "Indicó que posee modelo, pero no seleccionó un modelo válido."}
        
        # Validar Serial
        if datos['posee_serial'] not in ["Si", "No"]:
            return {"status": False, "mensaje": "El campo 'posee_serial' debe ser 'Si' o 'No'."}
        if datos['posee_serial'] == "Si" and not datos['serial_producto']:
            return {"status": False, "mensaje": "Indicó que posee serial, pero el valor del serial está vacío."}
        elif datos['posee_serial'] == "No":
            datos['serial_producto'] = "S/N"

        datos['posee_codigo'] = "No" if datos['cd_dispositivo'] == "" else "Si"
        datos['marca_producto'] = "1" if datos['posee_marca'] == "No" else datos['marca_producto']
        datos['modelo_producto'] = "1" if datos['posee_modelo'] == "No" else datos['modelo_producto']

        return {"status": True}  #Validación exitosa

    # crear dispositivo
    def crear_dispositivo(self, datos):

        validaciones = self.validation_field(datos)
        
        if not validaciones["status"]:
            
            return validaciones
        
        else:

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

