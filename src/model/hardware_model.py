from model.db_connect import DbConnect

class HardawareModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador estacion_trabajo especifico por id
    def get_hardware(self, id):
        sql = "SELECT * FROM hardware WHERE id_hardware = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de hardware por piso
    def get_hardware_by_floor(self, id_piso):
        sql = "SELECT * FROM hardware WHERE"
        self.cursor.execute(sql, (id_piso))

        es_trabajo = self.cursor.fetchall()
        return es_trabajo

    #buscador all de switches
    def get_all_hardware(self):
        sql = (
            "SELECT * "
            "FROM hardware "
            "LEFT JOIN dispositivos ON dispositivos.id_dispositivo = hardware.id_dispositivo "
            "LEFT JOIN modelos ON modelos.id_modelos = dispositivos.id_modelo "
            "LEFT JOIN marcas ON marcas.id_marcas = dispositivos.id_marca "
            "LEFT JOIN tipo_status ON tipo_status.id_tipo_status = dispositivos.id_status "
            "ORDER BY hardware.id_hardware DESC"
        )
        self.cursor.execute(sql)

        all_hardware = self.cursor.fetchall()
        return all_hardware

    def create_hardware(self, datos):
        sql = "INSERT INTO hardwares(id_hardware, id_cpu, id_monitor, id_mouse, id_teclado, posee_regulador, cd_regulador, posee_corneta, cd_corneta) " \
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_hardware(self, datos):
        sql = "UPDATE hardwares SET id_cpu = %s, id_monitor = %s, id_mouse = %s, id_teclado = %s, " \
        "posee_regulador = %s, cd_regulador = %s, posee_corneta = %s, cd_corneta = %s " \
        "WHERE id_hardware= %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_hardware(self, id):
        sql = "DELETE FROM hardwares WHERE id_hardware = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None