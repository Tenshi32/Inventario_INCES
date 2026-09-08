from model.db_connect import DbConnect

class ModelosModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador modelo especifico por id
    def get_modelo(self, id):
        sql = "SELECT * FROM modelos WHERE id_modelos = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de modelos
    def get_all_modelos(self):
        sql = "SELECT * FROM modelos " \
        "ORDER BY id_modelos DESC"
        self.cursor.execute(sql)

        all_modelos = self.cursor.fetchall()
        return all_modelos

    def get_modelos_for_device(self, marca):
        sql = "SELECT id_modelos, modelo FROM modelos WHERE id_marca = %s"
        self.cursor.execute(sql, (marca,))

        model_list = self.cursor.fetchall()
        return model_list

    def create_modelo(self, datos):
        sql = "INSERT INTO modelos (id_modelos, modelo) " \
        "VALUES (%s, %s)"

        try:
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_modelo(self, datos):
        sql = "UPDATE modelos SET modelo = %s " \
        "WHERE id_modelos = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_modelo(self, id):
        sql = "DELETE FROM modelos WHERE id_modelos = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None