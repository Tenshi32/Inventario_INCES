from model.db_connect import DbConnect

class UsuarioModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)
 
    def get_usuario(self, id):
        sql = "SELECT * FROM usuarios WHERE cedula = %s OR telefono = %s "
        self.cursor.execute(sql, (id, id))

        row = self.cursor.fetchone()
        return row
 
    def get_all_usuarios(self):
        sql = "SELECT * FROM usuarios ORDER BY fecha_creacion DESC"
        self.cursor.execute(sql)

        all_usuarios = self.cursor.fetchall()
        return all_usuarios

    def create_usuario(self, datos):
        sql = "INSERT INTO usuarios (cedula, nombre, apellido, correo, cargo, telefono, status_usuario) " \
        "VALUES (%s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_usuario(self, datos):
        sql = "UPDATE usuarios SET cedula = %s, nombre = %s, apellido = %s, correo = %s, cargo = %s, telefono = %s, status_usuario = %s" \
        "WHERE cedula = %s"
        
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
        
    def toggle_usuario(self, datos):
        sql = "UPDATE usuarios SET status_usuario = %s" \
        " WHERE cedula = %s"
        
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_usuario(self, id):
        sql = "DELETE FROM usuarios WHERE cedula = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
