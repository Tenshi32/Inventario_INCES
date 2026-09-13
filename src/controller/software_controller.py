from model.softwares_model import SoftwareModel
import random
import json

class SoftwareController:

    def __init__(self):
        # Instantiate the model here (lazy DB connection inside model)
        self.modelo = SoftwareModel()

    def all_softwares(self):
        return self.modelo.get_all_softwares()

    def rastrear_softwares(self, id):
        if not id:
            return None
        return self.modelo.get_softwares(id)

    def crear_software(self, datos):
        
        datos['tipo_particion'] = "Windows" if datos['tipo_so'] == "Privado" else "Linux"
        datos['segundo_so'] = None if datos['es_dual_boot'] == "No" else datos['segundo_so']

        if 'id_softwares' in datos:
                  
            valores = [
                #Datos del softwares
                datos['id_softwares'],
                datos['tipo_so'],
                datos['tipo_particion'],
                datos['tipo_distribucion'],
                datos['arquitectura'],
                datos['es_dual_boot'],
                datos['segundo_so'],
                datos['programas'],
            ]

            retorno = self.modelo.create_software(valores)

            if retorno is not None:

<<<<<<< HEAD
                return {"status": True, "mensaje": "Registro creado id: " + datos['cd_dispositivo']}
            
            else:

                return {"status": False, "mensaje": "No se pudo guardar el registro"}
=======
                return True
            
            else:

                return False
>>>>>>> f48ec839b5eb5854cc65725cea8f6ee8137b9f81

    def Edit_software(self, datos):

        datos['tipo_particion'] = "Windows" if datos['tipo_so'] == "Privado" else "Linux"

        valores = [
            #Datos del softwares
            datos['tipo_so'],
            datos['tipo_particion'],
            datos['tipo_distribucion'],
            datos['arquitectura'],
            datos['es_dual_boot'],
            datos['segundo_so'],
            datos['programas'],
            datos['created'],
        ]

        retorno = self.modelo.update_software(valores)

        if retorno is not None:

            return {"status": True, "mensaje": "se edito el softwares de id: " + datos['created']}
        
        else:

            return {"status": False, "mensaje": "No se pudo guardar el registro"}
        