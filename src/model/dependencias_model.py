from model.db_connect import DbConnect

class DependenciasModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador dependencia especifica por id
    def get_dependencia(self, id):
        sql = "SELECT * FROM dependencia WHERE id_dependencia = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de dependencias
    def get_all_dependencias(self):
        sql = "SELECT * FROM dependencia " \
        "INNER JOIN pisos ON dependencia.id_piso = pisos.id_piso " \
        "ORDER BY id_dependencia DESC"
        self.cursor.execute(sql)

        all_dependencias = self.cursor.fetchall()
        return all_dependencias


    def create_dependencia(self, datos):
        sql = "INSERT INTO dependencia (dependencia, id_estado, id_piso, codigo, activo) " \
        "VALUES (%s, %s, %s, %s, %s)"

        try:
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_dependencia(self, datos):
        sql = "UPDATE dependencia SET dependencia = %s, id_estado = %s, id_piso = %s, codigo = %s" \
        "WHERE id_dependencia = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def toggle_dependencia(self, datos):
        sql = "UPDATE dependencia SET activo = %s " \
        "WHERE id_dependencia = %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None
