from model.db_connect import DbConnect

class TipoConsumiblesModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador tipo_consumible especifico por id
    def get_tipo_consumible(self, id):
        sql = "SELECT * FROM tipo_consumible WHERE id_tipo_consumible = %s"
        self.cursor.execute(sql, (id,))

        row = self.cursor.fetchone()
        return row

    #buscador all de tipo_consumibles por piso
    def get_all_tipo_consumibles(self):
        sql = "SELECT * FROM tipo_consumible"
        self.cursor.execute(sql)

        tipo_consumibles = self.cursor.fetchall()
        return tipo_consumibles


    def create_tipo_consumibles(self, datos):
        sql = "INSERT INTO tipo_consumible(consumible, grupo_consumible, estado_consumible) " \
        "VALUES (%s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_tipo_consumibles(self, datos):
        sql = "UPDATE tipo_consumible SET consumible = %s, grupo_consumible = %s" \
        "WHERE id_tipo_consumible = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_status_tipo_consumibles(self, datos):
        sql = "UPDATE tipo_consumible SET estado_consumible = %s " \
        "WHERE id_tipo_consumible = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
