from model.db_connect import DbConnect

class TipoConsumiblesModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador tipo_consumible especifico por id
    def get_tipo_consumible(self, id):
        sql = "SELECT * FROM tipo_consumibles WHERE id_tipo_consumible = %s"
        self.cursor.execute(sql, (id,))

        row = self.cursor.fetchone()
        return row

    #buscador all de switches por piso
    def get_all_tipo_consumibles(self):
        sql = "SELECT * FROM tipo_consumibles"
        self.cursor.execute(sql)

        tipo_consumibles = self.cursor.fetchall()
        return tipo_consumibles


    def create_switch(self, datos):
        sql = "INSERT INTO switches(id_switches, id_dispositivo, id_tipo_servicio, npuertos, addpuertos, direccion_mac) " \
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_switch(self, datos):
        sql = "UPDATE switches SET cd_switches = %s, id_marca = %s, posee_modelo = %s, id_modelo = %s, posee_serial = %s, serial = %s, id_piso = %s, status = %s " \
        "WHERE id_switches = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_status_switch(self, datos):
        sql = "UPDATE switches SET status = %s " \
        "WHERE id_switches = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_switch(self, id):
        sql = "DELETE FROM switches WHERE id_switches = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None