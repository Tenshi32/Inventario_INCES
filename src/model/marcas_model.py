from model.db_connect import DbConnect

class MarcasModel:

    def __init__(self):
        self.db = DbConnect().connect()

    #buscador marca especifica por id
    def get_marca(self, id):
        sql = "SELECT * FROM marcas WHERE id_marcas = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de marcas
    def get_all_marcas(self):
        cursor = self.db.cursor(dictionary=True)

        sql = "SELECT id_marcas, marca FROM marcas " \
        "WHERE estado_marca != 3 ORDER BY id_marcas DESC"
        cursor.execute(sql)
 
        all_marcas = cursor.fetchall() 
        return all_marcas

    def existe_marca(self, dato):
        cursor = self.db.cursor(dictionary=True)
        sqlValidar = "SELECT id_marcas FROM marcas WHERE UPPER(marca) = UPPER(%s)"
        cursor.execute(sqlValidar,(dato,))
        respuesta = cursor.fetchone()
        cursor.close()
        return respuesta


    def create_marca(self, datos):
    
        respuestaValidacion = self.existe_marca(datos[0])

        if respuestaValidacion is not None and respuestaValidacion != "":
            return respuestaValidacion["id_marcas"]
        
        cursor = self.db.cursor(dictionary=True)
        sql = "INSERT INTO marcas (marca, estado_marca) " \
        "VALUES (%s, %s)"

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
