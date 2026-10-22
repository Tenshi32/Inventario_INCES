# Sistema de Inventario INCES

Aplicación web para la consulta y administración del inventario institucional. El repositorio contiene una interfaz basada en HTML, CSS y JavaScript, una API desarrollada con Flask y un esquema MySQL/MariaDB.

La base de datos ya está definida en [`inces_inventario.sql`](inces_inventario.sql). La aplicación se organiza en páginas y servicios frontend, rutas Flask, controladores y modelos de persistencia.

## Estado actual

- El módulo de **Dispositivos** permite crear y editar registros, y consultar sus detalles desde la interfaz.
- El listado de dispositivos utiliza DataTables con solicitudes a la API y controles de búsqueda y filtros. La implementación actual del backend no aplica todos los filtros que recibe; los resultados deben verificarse antes de depender de ellos.
- Hay páginas frontend para dispositivos, consumibles, estaciones de trabajo, usuarios, internos y datos maestros.
- La API registra rutas para dispositivos, usuarios, dependencias, marcas, modelos, estaciones de trabajo, tipos de dispositivos, tipos de consumibles, tipos de servicios, estados y status.
- La presencia de una página, un controlador o una tabla no significa que todas sus operaciones estén terminadas o conectadas correctamente.
- No se encontró una suite automatizada de pruebas ni evidencia de una prueba de carga o despliegue de producción. El soporte para una cantidad específica de usuarios no está medido.

## Tecnologías

- Python y Flask
- Flask-CORS
- MySQL Connector/Python
- MySQL o MariaDB
- HTML, CSS y JavaScript
- Bootstrap, jQuery, DataTables, Select2 y SweetAlert

## Estructura del repositorio

```text
assets/
  css/                  Estilos
  js/
    components/         Componentes de interfaz
    dateMaster/         Scripts de datos maestros
    pages/              Lógica JavaScript de las páginas
    services/           Servicios de comunicación con la API
    config.js           URL actual de la API
  vendors/              Bibliotecas frontend locales
html/                   Páginas HTML
src/
  controller/           Validaciones y lógica de aplicación
  model/                Consultas y conexión a MySQL/MariaDB
  routers/              Manejo de acciones de cada entidad
  router.py             Aplicación Flask y registro de rutas
inces_inventario.sql    Esquema y datos iniciales de la base de datos
Report.txt              Reporte de estructura y observaciones
requirements.txt        Especificación de requerimientos del sistema
```

## Módulos visibles y entidades

La navegación de [`html/index.html`](html/index.html) incluye las páginas de dispositivos, consumibles, estaciones de trabajo, datos maestros y usuarios. También existen páginas para internos y otras vistas de soporte.

El dump SQL define 19 tablas: `auditoria_sistema`, `consumibles`, `dependencia`, `dispositivos`, `estados`, `es_trabajo`, `hardwares`, `interno`, `marcas`, `modelos`, `pisos`, `redes`, `rol`, `softwares`, `tipo_consumible`, `tipo_dispositivos`, `tipo_servicios`, `tipo_status` y `usuarios`.

Algunas entidades —por ejemplo hardware, software, auditoría e internos— tienen modelos o controladores, pero no todas cuentan con rutas registradas en la aplicación Flask principal. Verifica el código antes de asumir que una tabla o módulo es accesible desde la interfaz.

## Requisitos previos

- Python instalado.
- MySQL o MariaDB en ejecución.
- Un servidor web estático para servir la carpeta del proyecto; en el entorno de desarrollo puede utilizarse Apache de XAMPP.
- Las bibliotecas Python necesarias para el backend: Flask, Flask-CORS y MySQL Connector/Python.

### Importante sobre `requirements.txt`

Actualmente [`requirements.txt`](requirements.txt) contiene la especificación de requerimientos funcionales y no funcionales del sistema, **no** una lista de paquetes Python. Por ello, no se puede usar con `pip install -r requirements.txt`. Instala las dependencias Python individualmente en un entorno virtual o prepara un archivo separado de dependencias antes de automatizar la instalación.

## Configuración local

### 1. Preparar la base de datos

Importa [`inces_inventario.sql`](inces_inventario.sql) en MySQL/MariaDB mediante phpMyAdmin o el cliente `mysql`. El dump crea la base de datos `inces_inventario` y contiene estructura y datos iniciales.

La conexión está actualmente escrita directamente en [`src/model/db_connect.py`](src/model/db_connect.py):

```text
host: 127.0.0.1
usuario: root
contraseña: vacía
base de datos: inces_inventario
```

Estos valores solo corresponden a una instalación local compatible. Actualiza la configuración de acuerdo con tu entorno y no expongas credenciales en un despliegue real.

### 2. Instalar dependencias Python

Desde la raíz del repositorio, crea y activa un entorno virtual e instala Flask, Flask-CORS y MySQL Connector/Python. Por ejemplo, en Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install Flask Flask-Cors mysql-connector-python
```

### 3. Iniciar la API

Desde la raíz del repositorio:

```powershell
python .\src\router.py
```

La API de desarrollo escucha en `http://127.0.0.1:5000`. El archivo [`assets/js/config.js`](assets/js/config.js) también apunta actualmente a esa URL.

### 4. Servir el frontend

Sirve el repositorio mediante Apache u otro servidor de archivos estáticos. En el XAMPP descrito por la estructura local, la página principal suele estar disponible en:

```text
http://localhost/Proyects/Inventario_INCES/html/index.html
```

La ruta exacta depende del nombre de la carpeta bajo `htdocs`. No abras la página como archivo local si el navegador bloquea las solicitudes o los módulos JavaScript. El frontend y la API se sirven por separado.

## API registrada

Las rutas se registran en [`src/router.py`](src/router.py). La capitalización forma parte de la ruta y debe respetarse:

| Ruta base | Entidad |
|---|---|
| `/dependencia/<accion>` | Dependencias |
| `/Usuario/<accion>` | Usuarios |
| `/Modelos/<accion>` | Modelos |
| `/Marcas/<accion>` | Marcas |
| `/Dispositivos/<accion>` | Dispositivos |
| `/EstacionesTrabajo/<accion>` | Estaciones de trabajo |
| `/tipo_servicios/<accion>` | Tipos de servicios |
| `/tipo_dispositivos/<accion>` | Tipos de dispositivos |
| `/tipo_consumibles/<accion>` | Tipos de consumibles |
| `/estados/<accion>` | Estados |
| `/Status/<accion>` | Status de dispositivos |

Las acciones disponibles dependen de cada router. En dispositivos, el código contempla, entre otras, `GET /Dispositivos/All`, `GET /Dispositivos/Search`, `POST /Dispositivos/Crear` y `PUT /Dispositivos/Editar`. Consulta el router correspondiente para conocer los parámetros y el formato de datos exactos.

Los routers `interno`, `hardware`, `software` y `auditoria` no están registrados como endpoints en [`src/router.py`](src/router.py), aunque existan archivos relacionados en el repositorio.

## Observaciones y limitaciones conocidas

- La aplicación Flask se inicia con `debug=True` y escucha en `127.0.0.1`; es configuración de desarrollo, no de producción.
- CORS se habilita globalmente. Restringe los orígenes permitidos antes de desplegar.
- La conexión a la base de datos tiene credenciales fijas en el código. No se observa configuración centralizada por ambiente.
- La página de login y código de sesión del frontend no demuestran por sí solos que los endpoints estén protegidos con autenticación y autorización del lado del servidor.
- El frontend contiene llamadas directas a direcciones locales y rutas que no coinciden con las rutas registradas. Algunas pantallas pueden no funcionar correctamente con el backend actual.
- El backend de dispositivos acepta parámetros de búsqueda, estado y tipo, pero el modelo y los totales deben revisarse para confirmar que esos filtros se apliquen correctamente.
- No se ha medido el rendimiento con usuarios concurrentes. No se debe asumir soporte para 100 usuarios sin desplegar y ejecutar una prueba de carga representativa.
- La implementación de creación, edición y detalle de dispositivos está conectada; los mensajes y la recuperación ante errores de guardado todavía requieren pruebas y validación de extremo a extremo.

Consulta [`Report.txt`](Report.txt) para el análisis estructural y las recomendaciones que se documentaron para el estado actual del repositorio.

## Pruebas y validación

No se identifica actualmente una suite de pruebas automatizadas en el repositorio. Como mínimo, antes de aceptar cambios en el módulo de dispositivos, verifica manualmente:

1. Crear un dispositivo con y sin marca, modelo o serial.
2. Editar un dispositivo existente y volver a consultar sus datos.
3. Abrir el detalle del equipo correcto desde una fila de la tabla.
4. Comprobar validaciones y respuestas ante datos incompletos o errores de API.
5. Confirmar persistencia en la base de datos y consistencia del listado.

Las pruebas de seguridad, compatibilidad, respaldo/restauración y carga deben realizarse en un ambiente de pruebas separado antes de considerar un despliegue productivo.

## Documentación relacionada

- [`Report.txt`](Report.txt): reporte de estructura, observaciones del JavaScript y consideraciones de rendimiento.
- [`requirements.txt`](requirements.txt): requerimientos funcionales y no funcionales.
- [`Diccionario de Datos.docx`](Diccionario%20de%20Datos.docx): diccionario de datos complementario.
- [`inces_inventario.sql`](inces_inventario.sql): esquema y datos iniciales de la base de datos.
