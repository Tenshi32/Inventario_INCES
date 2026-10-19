from model.db_connect import DbConnect

class ModelosModel:

    def __init__(self):
        self.db = DbConnect().connect()

    #buscador modelo especifico por id
    def get_modelo(self, id):
        sql = "SELECT * FROM modelos WHERE id_modelos = %s AND id_modelos = 1"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de modelos
    def get_all_modelos(self):
        cursor = self.db.cursor(dictionary=True)

        sql = "SELECT * FROM modelos " \
        "INNER JOIN marcas ON modelos.id_marca = marcas.id_marcas " \
        "WHERE modelos.estado_modelo != 3 ORDER BY id_modelos DESC"
        cursor.execute(sql)

        all_modelos = cursor.fetchall()
        return all_modelos

    def get_modelos_for_device(self, marca):
        cursor = self.db.cursor(dictionary=True)

        sql = "SELECT id_modelos, modelo FROM modelos WHERE id_marca = %s OR id_marca = %s"
        cursor.execute(sql, (marca, 1))

        model_list = cursor.fetchall()
        cursor.close()
        return model_list

    def existe_modelo(self, dato1):
        cursor = self.db.cursor(dictionary=True)
        sqlValidar = "SELECT id_modelos FROM modelos WHERE UPPER(modelo) = UPPER(%s)"
        cursor.execute(sqlValidar,(dato1, ))
        respuesta = cursor.fetchone()
        cursor.close()
        return respuesta

    def create_modelo(self, datos):
 
        respuestaValidacion = self.existe_modelo(datos[1])

        if respuestaValidacion is not None and respuestaValidacion != "":
            return respuestaValidacion["id_modelos"]
        
        cursor = self.db.cursor(dictionary=True)
        sql = "INSERT INTO modelos (id_marca, modelo, estado_modelo) " \
        "VALUES (%s, %s, %s)"

        try:
            cursor.execute(sql, tuple(datos))
            repuesta = cursor.lastrowid
            self.db.commit()
            cursor.close()
            return repuesta

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_modelo(self, datos):
        sql = "UPDATE modelos SET id_marca = %s, modelo = %s " \
        "WHERE id_modelos = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_modelo(self, datos):
        sql = "UPDATE modelos SET estado_modelo = %s " \
        "WHERE id_modelos = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
