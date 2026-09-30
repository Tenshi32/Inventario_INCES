from model.db_connect import DbConnect

class LoginModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)
 
    def get_login(self, id):
        sql = "SELECT * FROM usuarios WHERE cedula = %s "
        self.cursor.execute(sql, (id,))

        row = self.cursor.fetchone()
        return row
