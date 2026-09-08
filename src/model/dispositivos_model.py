from model.db_connect import DbConnect

class DispositivosModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador todos los dispositivos
    def get_all_device(self):
        sql = "SELECT * FROM dispositivos " \
        "INNER JOIN tipo_dispositivos ON dispositivos.id_tipo_dispositivo = tipo_dispositivos.id_tipo_dispositivo " \
        "INNER JOIN marcas ON dispositivos.id_marca = marcas.id_marcas " \
        "INNER JOIN modelos ON dispositivos.id_modelo = modelos.id_modelos " \
        "INNER JOIN tipo_status ON dispositivos.id_status = tipo_status.id_tipo_status " \
        "ORDER BY dispositivos.id_dispositivo DESC"
        self.cursor.execute(sql)

        all_device = self.cursor.fetchall()
        return all_device
    
    #buscador dispositivos especifico por id
    def get_device(self, id):
        sql = "SELECT * FROM dispositivos WHERE id_dispositivo = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador si existe dispositivo por tipo de categoria y valor (codigo o serial)
    def get_dispositivo_if_exist(self, tipo_categoria, valor):
        sql = "SELECT cd_dispositivo FROM dispositivos WHERE id_tipo_dispositivo = %s AND (cd_dispositivo = %s OR serial = %s)"
        self.cursor.execute(sql, (tipo_categoria, valor, valor,))

        row = self.cursor.fetchone()
        print(row)
        return row

    # crear dispositivo
    def create_device(self, datos):
        sql = "INSERT INTO dispositivos(id_dispositivo, posee_codigo, cd_dispositivo, posee_marca, posee_modelo, id_marca, id_modelo, id_tipo_dispositivo, posee_serial, serial, descripcion_general, observaciones_tecnicas, id_status) \
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
    
    # editar dispositivo
    def update_device(self, datos):
        sql = "UPDATE dispositivos SET posee_codigo=%s, cd_dispositivo=%s, posee_marca=%s, posee_modelo=%s, id_marca=%s, id_modelo=%s, id_tipo_dispositivo=%s, posee_serial=%s, serial=%s, descripcion_general=%s, observaciones_tecnicas=%s, id_status=%s \
        WHERE id_dispositivo=%s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
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