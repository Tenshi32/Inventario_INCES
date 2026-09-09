from model.db_connect import DbConnect

class MarcasModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador marca especifica por id
    def get_marca(self, id):
        sql = "SELECT * FROM marcas WHERE id_marcas = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de marcas
    def get_all_marcas(self):
        sql = "SELECT * FROM marcas " \
        "WHERE estado_marca != 3 ORDER BY id_marcas DESC"
        self.cursor.execute(sql)

        all_marcas = self.cursor.fetchall()
        return all_marcas

    def create_marca(self, datos):
        sql = "INSERT INTO marcas (marca, estado_marca) " \
        "VALUES (%s, %s)"

        try:
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_marca(self, datos):
        sql = "UPDATE marcas SET marca = %s " \
        "WHERE id_marcas = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
        
    def toggle_marca(self, datos):
            sql = "UPDATE marcas SET estado_marca = %s " \
            "WHERE id_marcas = %s"
    
            try: 
                self.cursor.execute(sql, tuple(datos))
                self.conn.commit()
                return self.cursor.rowcount
    
            except Exception as e:
                self.conn.rollback()
                print(f"Error inesperado: {e}")
                return None
