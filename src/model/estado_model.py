from model.db_connect import DbConnect

class EstadosModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador estado especifica por id
    def get_estado(self, id):
        sql = "SELECT * FROM estados WHERE id_estado = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de estados
    def get_all_estados(self):
        sql = "SELECT * FROM estados ORDER BY id_estado DESC"
        self.cursor.execute(sql)

        all_estados = self.cursor.fetchall()
        return all_estados

    def create_estado(self, datos):
        sql = "INSERT INTO estados (estado) " \
        "VALUES (%s)"

        try:
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_estado(self, datos):
        sql = "UPDATE estados SET estado = %s " \
        "WHERE id_estado = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
