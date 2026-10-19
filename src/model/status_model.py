from model.db_connect import DbConnect

class StatusModel:

    def __init__(self):
        self.db = DbConnect().connect()

    #buscador status especifica por id
    def get_status(self, id):
        cursor = self.db.cursor(dictionary=True)
        sql = "SELECT * FROM tipo_status WHERE id_tipo_status = %s"
        cursor.execute(sql, (id))

        row = cursor.fetchone()
        cursor.close()
        return row

    #buscador all de statuss
    def get_all_status(self):
        cursor = self.db.cursor(dictionary=True)
        sql = "SELECT * FROM tipo_status ORDER BY id_tipo_status DESC"
        cursor.execute(sql)

        all_status = cursor.fetchall()
        cursor.close()
        return all_status

    def create_status(self, datos):
        cursor = self.db.cursor(dictionary=True)
        sql = "INSERT INTO tipo_status (statu) " \
        "VALUES (%s)"

        try:
            cursor.execute(sql, tuple(datos))
            self.db.commit()
            return cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_status(self, datos):
        cursor = self.db.cursor(dictionary=True)
        sql = "UPDATE status SET statu = %s " \
        "WHERE id_tipo_status = %s"

        try:
            cursor.execute(sql, tuple(datos))
            self.db.commit()
            return cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
