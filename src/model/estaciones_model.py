from model.db_connect import DbConnect

class EstacionTrabajoModel:

    def __init__(self):
        self.conn = DbConnect().connect()

        if self.conn is None:
            raise ConnectionError("No se pudo establecer la conexión a la base de datos.")

        self.cursor = self.conn.cursor(dictionary=True)

    #buscador estacion_trabajo especifico por id
    def get_station_work(self, id):
        sql = "SELECT * FROM es_trabajo WHERE id_es_trabajo = %s"
        self.cursor.execute(sql, (id))

        row = self.cursor.fetchone()
        return row

    #buscador all de estacion_trabajo por piso
    def get_station_work_by_floor(self, id_piso):
        sql = "SELECT * FROM es_trabajo WHERE id_piso = %s"
        self.cursor.execute(sql, (id_piso))

        es_trabajo = self.cursor.fetchall()
        return es_trabajo

    #buscador all de estacion_trabajo
    def get_all_station_work(self):
        sql = (
            "SELECT hardwares.* , es_trabajo.* , softwares.*, "
            "d_cpu.cd_dispositivo AS cd_cpu, "
            "d_mon.cd_dispositivo AS cd_monitor, "
            "d_mou.cd_dispositivo AS cd_mouse, "
            "d_tec.cd_dispositivo AS cd_teclado "
            "FROM es_trabajo "
            "LEFT JOIN usuarios ON usuarios.cedula = es_trabajo.id_usuario "
            "LEFT JOIN hardwares ON hardwares.id_hardware = es_trabajo.id_hardware "

            "LEFT JOIN cpus ON cpus.id_cpu = hardwares.id_cpu "
            "LEFT JOIN dispositivos d_cpu ON d_cpu.id_dispositivo = cpus.id_dispositivo "

            "LEFT JOIN monitores ON monitores.id_monitor = hardwares.id_monitor "
            "LEFT JOIN dispositivos d_mon ON d_mon.id_dispositivo = monitores.id_dispositivo "

            "LEFT JOIN mouses ON mouses.id_mouse = hardwares.id_mouse "
            "LEFT JOIN dispositivos d_mou ON d_mou.id_dispositivo = mouses.id_dispositivo "

            "LEFT JOIN teclados ON teclados.id_teclado = hardwares.id_teclado "
            "LEFT JOIN dispositivos d_tec ON d_tec.id_dispositivo = teclados.id_dispositivo "
            
            "LEFT JOIN softwares ON softwares.id_software = es_trabajo.id_software " 
            "ORDER BY es_trabajo.id_es_trabajo DESC"
        )
        self.cursor.execute(sql)

        all_es_trabajo = self.cursor.fetchall()
        return all_es_trabajo

    def create_station_work(self, datos):
        sql = "INSERT INTO es_trabajo(id_es_trabajo, id_usuario, id_hardware, id_software, en_red, id_redes) " \
        "VALUES (%s, %s, %s, %s, %s, %s)"
      
        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.lastrowid

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def update_station_work(self, datos):
        sql = "UPDATE es_trabajo SET id_usuario = %s " \
            "WHERE id_es_trabajo= %s"

        try: 
            self.cursor.execute(sql, tuple(datos))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None

    def delete_station_work(self, id):
        sql = "DELETE FROM es_trabajo WHERE id_es_trabajo = %s"
        try: 
            self.cursor.execute(sql, (id))
            self.conn.commit()
            return self.cursor.rowcount

        except Exception as e:
            self.conn.rollback()
            print(f"Error inesperado: {e}")
            return None