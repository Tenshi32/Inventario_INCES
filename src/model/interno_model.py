from model.db_connect import DbConnect

class InternoModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)
 
    def get_interno(self, id):
        sql = "SELECT * FROM interno " \
        "INNER JOIN usuarios ON usuarios.cedula = interno.id_usuario_cedula"
        self.cursor.execute(sql, (id, id))

        row = self.cursor.fetchone()
        return row
 
    def get_all_internos(self):
        sql = "SELECT * FROM interno " \
        "INNER JOIN usuarios ON usuarios.cedula = interno.id_usuario_cedula"
        self.cursor.execute(sql)

        all_internos = self.cursor.fetchall()
        return all_internos

    def create_interno(self, datos):
        sql = "INSERT INTO interno (id_interno, id_usuario_cedula, password, id_rol_interno) " \
        "VALUES (%s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_interno(self, datos):
        sql = "UPDATE interno SET id_usuario_cedula = %s, id_rol_interno = %s" \
        "WHERE id_interno = %s"
        
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
        
    def delete_interno(self, id):
        sql = "DELETE FROM interno WHERE id_interno = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
