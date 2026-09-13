from model.db_connect import DbConnect

class SoftwareModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador software especifico por id
    def get_software(self, id):
        sql = "SELECT * FROM softwares WHERE id_software = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de softwares
    def get_all_softwares(self):
        sql = (
            "SELECT * "
            "FROM softwares "
            "ORDER BY softwares.id_software DESC"
        )
        self.cursor.execute(sql)

        all_softwares = self.cursor.fetchall()
        return all_softwares

    def create_software(self, datos):
        sql = "INSERT INTO softwares(id_software, tipo_so, tipo_particion, tipo_distribucion, arquitectura, es_dual_boot, segundo_so, programas) " \
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_software(self, datos):
        sql = "UPDATE softwares SET tipo_so = %s, tipo_particion = %s, tipo_distribucion = %s, arquitectura = %s, es_dual_boot = %s, segundo_so = %s, programas = %s" \
            "WHERE id_software= %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_software(self, id):
        sql = "DELETE FROM softwares WHERE id_software = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None