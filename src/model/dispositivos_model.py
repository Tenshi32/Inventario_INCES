from flask import jsonify

from model.db_connect import DbConnect

class DispositivosModel:

    def __init__(self):
        self.db = DbConnect().connect()

    #buscador todos los dispositivos
    def get_all_device(self, offset, limit, search, estado, tipo):

        cursor = self.db.cursor(dictionary=True)
        sql = ("SELECT tipo_status.statu, tipo_status.id_tipo_status, modelos.modelo, marcas.marca, tipo_dispositivos.tipo_dispositivo, "
        "dispositivos.id_dispositivo, dispositivos.cd_dispositivo, dispositivos.serial "
        "FROM dispositivos "
        "LEFT JOIN tipo_dispositivos ON dispositivos.id_tipo_dispositivo = tipo_dispositivos.id_tipo_dispositivo "
        "LEFT JOIN marcas ON dispositivos.id_marca = marcas.id_marcas "
        "LEFT JOIN modelos ON dispositivos.id_modelo = modelos.id_modelos "
        "LEFT JOIN tipo_status ON dispositivos.id_status = tipo_status.id_tipo_status "
        "ORDER BY dispositivos.fecha_carga DESC LIMIT %s OFFSET %s")

        
        sql_count = ("SELECT COUNT(*) AS total FROM dispositivos")

        cursor.execute(sql_count)
        total_records = cursor.fetchone()
        

        cursor.execute(sql, (limit, offset))
        all_device = cursor.fetchall()


        cursor.close()

        return [all_device, total_records['total']]
    
    #buscador dispositivos especifico por id
    def get_device(self, id):
        cursor = self.db.cursor(dictionary=True)
        sql = ("SELECT tipo_status.statu, tipo_status.id_tipo_status, modelos.modelo, modelos.id_modelos, marcas.marca, marcas.id_marcas, "
        "tipo_dispositivos.tipo_dispositivo, tipo_dispositivos.id_tipo_dispositivo, dispositivos.id_dispositivo, "
        "dispositivos.cd_dispositivo, dispositivos.posee_marca, dispositivos.posee_modelo, dispositivos.posee_serial, "
        "dispositivos.serial, dispositivos.descripcion_general, dispositivos.observaciones_tecnicas "
        "FROM dispositivos "
        "LEFT JOIN tipo_dispositivos ON dispositivos.id_tipo_dispositivo = tipo_dispositivos.id_tipo_dispositivo "
        "LEFT JOIN marcas ON dispositivos.id_marca = marcas.id_marcas "
        "LEFT JOIN modelos ON dispositivos.id_modelo = modelos.id_modelos "
        "LEFT JOIN tipo_status ON dispositivos.id_status = tipo_status.id_tipo_status " 
        "WHERE dispositivos.id_dispositivo = %s")
        cursor.execute(sql, (id, ));

        row = cursor.fetchone()
        cursor.close()
        return row
    
    #buscador dispositivos especifico por id
    def rastrear_dispositivo_est_trabajo(self, id, EstTrabajo):
        sql = "SELECT * FROM dispositivos " \
        "INNER JOIN marcas ON dispositivos.id_marca = marcas.id_marcas " \
        "INNER JOIN modelos ON dispositivos.id_modelo = modelos.id_modelos " \
        "INNER JOIN tipo_status ON dispositivos.id_status = tipo_status.id_tipo_status " \
        "WHERE id_tipo_dispositivo = %s AND (cd_dispositivo = %s OR serial = %s)"
        self.cursor.execute(sql, (EstTrabajo, id, id))

        row = self.cursor.fetchone()
        return row

    #buscador si existe dispositivo por tipo de categoria y valor (codigo o serial)
    def get_dispositivo_if_exist(self, tipo_categoria, valor):
        cursor = self.db.cursor(dictionary=True)
        sql = "SELECT cd_dispositivo FROM dispositivos WHERE id_tipo_dispositivo = %s AND (cd_dispositivo = %s OR serial = %s)"
        cursor.execute(sql, (tipo_categoria, valor, valor,))

        row = cursor.fetchone()
        print(row)

        cursor.close()
        return row

    # crear dispositivo
    def create_device(self, datos):
        cursor = self.db.cursor(dictionary=True)
        sql = "INSERT INTO dispositivos(id_dispositivo, posee_codigo, cd_dispositivo, posee_marca, posee_modelo, id_marca, id_modelo, id_tipo_dispositivo, posee_serial, serial, descripcion_general, observaciones_tecnicas, id_status) \
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            cursor.execute(sql, tuple(datos))
            self.db.commit()

            retorno = self.get_device(datos[0])
            return retorno

        except Exception as e:
            self.db.rollback()
            print(f"Error inesperado: {e}")
            return None
        
        finally:
            cursor.close()
    
    # editar dispositivo
    def update_device(self, datos):
        cursor = self.db.cursor(dictionary=True)
        sql = "UPDATE dispositivos SET posee_codigo=%s, cd_dispositivo=%s, posee_marca=%s, posee_modelo=%s, id_marca=%s, id_modelo=%s, id_tipo_dispositivo=%s, posee_serial=%s, serial=%s, descripcion_general=%s, observaciones_tecnicas=%s, id_status=%s \
        WHERE id_dispositivo=%s"

        try: 
            cursor.execute(sql, tuple(datos))
            self.db.commit()
            
            retorno = self.get_device(datos[12])
            return retorno

        except Exception as e:
            self.db.rollback()
            print(f"Error inesperado: {e}")
            return None
    
    # cambiar estado dispositivo
    def toggle_status_device(self, datos):
        sql = "UPDATE dispositivos SET id_status = %s " \
        "WHERE id_dispositivo = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
    
    # eliminar dispositivo
    def delete_device(self, id):
        sql = "DELETE FROM dispositivos WHERE id_dispositivo = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None