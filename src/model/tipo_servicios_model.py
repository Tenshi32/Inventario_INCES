from model.db_connect import DbConnect

class TipoServiciosModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador switch especifico por id
    def get_tipo_servicio(self, id):
        sql = "SELECT * FROM tipo_servicios WHERE id_tipo_servicio = %s"
        self.cursor.execute(sql, (id,))

        row = self.cursor.fetchone()
        return row

    #buscador all de switches por piso
    def get_all_tipo_servicios(self):
        sql = "SELECT * FROM tipo_servicios"
        self.cursor.execute(sql)

        tipo_servicios = self.cursor.fetchall()
        return tipo_servicios

    def create_tipo_servicio(self, datos):
        sql = "INSERT INTO tipo_servicios (servicio, estado_servicio) " \
        "VALUES (%s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_tipo_servicio(self, datos):
        sql = "UPDATE tipo_servicios SET servicio = %s " \
        "WHERE id_tipo_servicios = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_status_tipo_servicio(self, datos):
        sql = "UPDATE tipo_servicios SET estado_servicio = %s " \
        "WHERE id_tipo_servicios = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None