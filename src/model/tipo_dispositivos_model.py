from model.db_connect import DbConnect

class TipoDispositivosModel:

    def __init__(self):
        self.db = DbConnect()


    #buscador tipo de dispositivo especifico por id
    def get_tipo_dispositivo(self, id):
        sql = "SELECT * FROM tipo_dispositivos WHERE id_tipo_dispositivo = %s"
        self.cursor.execute(sql, (id,))

        row = self.cursor.fetchone()
        return row

    #buscador all de tipo de dispositivo 
    def get_all_tipo_dispositivos(self):

        conn = self.db.connect()
        cursor = conn.cursor(dictionary=True)

        sql = "SELECT id_tipo_dispositivo, tipo_dispositivo, estado_tipo_dispositivo FROM tipo_dispositivos"
        cursor.execute(sql)

        tipo_dispositivos = cursor.fetchall()
        conn.close()

        return tipo_dispositivos

    def create_tipo_dispositivo(self, datos):
        sql = "INSERT INTO tipo_dispositivos(tipo_dispositivo) " \
        "VALUES (%s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_tipo_dispositivo(self, datos):
        sql = "UPDATE tipo_dispositivos SET tipo_dispositivo = %s" \
        "WHERE id_tipo_dispositivo = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_status_tipo_dispositivo(self, datos):
        sql = "UPDATE tipo_dispositivos SET estado_tipo_dispositivo = %s " \
        "WHERE id_tipo_dispositivo= %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None