# Sistema de Inventario INCI / INSI

Este repositorio contiene un sistema de gestión de inventario y dependencias para la organización, con una arquitectura basada en Flask para la API, una interfaz web estática con Bootstrap y un esquema de base de datos MySQL para registrar equipos, dependencias, usuarios, tipos de dispositivos y consumibles.

## Visión general

El proyecto está orientado a controlar recursos tecnológicos y administrativos del inventario institucional, incluyendo:

- Dependencias y ubicaciones
- Usuarios del sistema
- Dispositivos y estados
- Marcas, modelos y tipos de dispositivos
- Consumibles
- Servicios y estaciones de trabajo
- Estados regionales y gestión de inventario

La estructura actual permite que el sistema funcione con una API backend y una capa frontend que consume esos servicios desde páginas HTML y scripts JavaScript.

---

## Arquitectura del sistema

### 1. Backend

La lógica principal del backend se encuentra en la carpeta [src](src):

- [src/router.py](src/router.py): archivo principal que levanta la aplicación Flask y registra las rutas de la API.
- [src/controller](src/controller): controladores que reciben la lógica de negocio por entidad.
- [src/model](src/model): acceso a base de datos y consultas SQL.
- [src/routers](src/routers): definiciones de rutas y validación por acción (Crear, Editar, Toggle, All, etc.).

### 2. Frontend

La interfaz del sistema está construida con páginas HTML, CSS y JavaScript en:

- [html](html)
- [assets/css](assets/css)
- [assets/js](assets/js)

El frontend incluye pantallas como:

- [html/home.html](html/home.html)
- [html/login.html](html/login.html)
- [html/dispositivo.html](html/dispositivo.html)
- [html/consumibles.html](html/consumibles.html)
- [html/est_trabajo.html](html/est_trabajo.html)
- [html/internos.html](html/internos.html)
- [html/usuario.html](html/usuario.html)
- [html/dateMaster.html](html/dateMaster.html)

### 3. Base de datos

La base de datos del proyecto se encuentra en:

- [inces_inventario.sql](inces_inventario.sql)

Este dump SQL define las tablas principales del sistema y sus relaciones.

---

## Módulos y entidades del sistema

### Dependencias

La gestión de dependencias permite registrar unidades o sedes institucionales, su estado y su piso asociado.

Archivos relevantes:

- [src/controller/dependencias_controller.py](src/controller/dependencias_controller.py)
- [src/model/dependencias_model.py](src/model/dependencias_model.py)
- [src/routers/dependencias_router.py](src/routers/dependencias_router.py)

Funcionalidades principales:

- Listar dependencias
- Crear dependencia
- Editar dependencia
- Cambiar estado activo/inactivo

### Usuarios

La entidad usuarios almacena la información técnica y funcional del personal que interactúa con el sistema.

Archivos relevantes:

- [src/controller/usuario_controller.py](src/controller/usuario_controller.py)
- [src/model/usuario_model.py](src/model/usuario_model.py)
- [src/routers/usuario_router.py](src/routers/usuario_router.py)

Incluye:

- Registro de cédula, nombre, apellido, correo, cargo y teléfono
- Consulta por identificación
- Estado del usuario
- Actualización y cambio de estado

### Dispositivos

Es el módulo central del inventario. Permite registrar y consultar equipos tecnológicos, sus propiedades y su estado operativo.

Archivos relevantes:

- [src/controller/dispositivos_controller.py](src/controller/dispositivos_controller.py)
- [src/model/dispositivos_model.py](src/model/dispositivos_model.py)
- [src/routers/dispositivos_router.py](src/routers/dispositivos_router.py)

Campos principales del inventario:

- código del equipo
- marca y modelo
- tipo de dispositivo
- serial
- descripción general
- observaciones técnicas
- estado del equipo

### Marcas y modelos

Estos módulos permiten clasificar los activos según sus características de fabricante y referencia.

Archivos:

- [src/controller/marcas_controller.py](src/controller/marcas_controller.py)
- [src/model/marcas_model.py](src/model/marcas_model.py)
- [src/routers/marcas_router.py](src/routers/marcas_router.py)
- [src/controller/modelo_controller.py](src/controller/modelo_controller.py)
- [src/model/modelos_model.py](src/model/modelos_model.py)
- [src/routers/modelos_router.py](src/routers/modelos_router.py)

### Tipo de dispositivos

Controla la categoría del equipo o activo tecnológico.

Archivos:

- [src/controller/tipo_dispositivos_controller.py](src/controller/tipo_dispositivos_controller.py)
- [src/model/tipo_dispositivos_model.py](src/model/tipo_dispositivos_model.py)
- [src/routers/tipo_dispositivos_router.py](src/routers/tipo_dispositivos_router.py)

Ejemplos de tipos: Switches, Laptop, Escáner, Impresora, UPS, Router, Monitor, Teclado, CPU, etc.

### Tipo de consumibles

Permite clasificar artículos de consumo y materiales de soporte para equipos.

Archivos:

- [src/controller/tipo_consumibles_controller.py](src/controller/tipo_consumibles_controller.py)
- [src/model/tipo_consumibles_model.py](src/model/tipo_consumibles_model.py)
- [src/routers/tipo_consumibles_router.py](src/routers/tipo_consumibles_router.py)

### Tipo de servicios

Gestiona los servicios asociados a red o infraestructura que apoyan a la organización.

Archivos:

- [src/controller/tipo_servicios_controller.py](src/controller/tipo_servicios_controller.py)
- [src/model/tipo_servicios_model.py](src/model/tipo_servicios_model.py)
- [src/routers/tipo_servicios_router.py](src/routers/tipo_servicios_router.py)

### Estados y ubicaciones

Se gestiona la información geográfica y general del sistema, como estados y pisos.

Archivos:

- [src/controller/estados_controller.py](src/controller/estados_controller.py)
- [src/model/estado_model.py](src/model/estado_model.py)
- [src/routers/estados_router.py](src/routers/estados_router.py)

También se cuenta con la entidad de pisos para categorizar ubicaciones internas dentro de una dependencia.

---

## Endpoints principales

La API es expuesta a través del archivo [src/router.py](src/router.py). Las rutas registradas incluyen:

- `/dependencia/<accion>`
- `/Usuario/<accion>`
- `/modelos/<accion>`
- `/marcas/<accion>`
- `/Dispositivos/<accion>`
- `/EstacionesTrabajo/<accion>`
- `/tipo_servicios/<accion>`
- `/tipo_dispositivos/<accion>`
- `/tipo_consumibles/<accion>`
- `/estados/<accion>`

Acciones comunes:

- `All`: listar todos los registros
- `Crear`: registrar nuevo dato
- `Editar`: actualizar datos
- `Toggle`: cambiar estado o activar/desactivar
- `Existencia`: consultar si un registro ya existe

La API utiliza `POST`, `GET`, `PUT`, `DELETE` y maneja solicitudes `OPTIONS` para compatibilidad con navegadores.

---

## Esquema de base de datos

La base de datos principal está nombrada como `inces_inventario` y cuenta con tablas como:

- `usuarios`
- `interno`
- `rol`
- `dependencia`
- `pisos`
- `estados`
- `dispositivos`
- `marcas`
- `modelos`
- `tipo_dispositivos`
- `tipo_servicios`
- `tipo_consumible`
- `consumibles`
- `softwares`
- `redes`
- `auditoria_sistema`
- `tipo_status`

### Relaciones principales

- `dependencia` → `estados`
- `dependencia` → `pisos`
- `dispositivos` → `marcas`
- `dispositivos` → `modelos`
- `dispositivos` → `tipo_dispositivos`
- `dispositivos` → `tipo_status`
- `interno` → `usuarios`
- `interno` → `rol`
- `consumibles` → `tipo_consumible`

---

## Configuración de la base de datos

La conexión a la base de datos se establece en [src/model/db_connect.py](src/model/db_connect.py):

- Host: `localhost`
- Usuario: `root`
- Base de datos: `inces_inventario`
- Contraseña: vacía

Este archivo utiliza `mysql.connector` para conectarse a MySQL/MariaDB.

---

## Cómo ejecutar el proyecto

Desde la raíz del repositorio:

```bash
python src/router.py
```

Esto levantará la aplicación Flask en el puerto 5000.

La aplicación queda disponible en:

```text
http://localhost:5000
```

> El proyecto usa CORS y está preparado para consumir datos desde páginas HTML del frontend.

---

## Tecnologías usadas

- Python
- Flask
- MySQL / MariaDB
- HTML5
- CSS3
- Bootstrap
- JavaScript
- jQuery
- SQL

---

## Estado actual del proyecto

El sistema ya tiene una base funcional para:

- registro de dependencias
- administración de usuarios
- inventario de dispositivos
- clasificación por marcas, modelos y tipos
- control de estados y consumibles
- consumo de datos mediante API REST
- vista web con administración por páginas HTML

Aun así, el proyecto sigue en evolución y presenta varios detalles de implementación que pueden mejorarse, como:

- normalización de nombres y convenciones de código
- validación más robusta de formularios
- manejo centralizado de errores
- seguridad de autenticación y sesiones
- mejor organización de archivos del frontend y backend
- limpieza de endpoints y denominaciones inconsistentes

---

## Recomendaciones futuras

Para seguir desarrollando el sistema, se recomienda:

1. Consolidar una API más uniforme y consistente entre controladores y modelos.
2. Añadir autenticación con sesiones y roles reales.
3. Mejorar la auditoría con trazabilidad de cambios por usuario y fecha.
4. Centralizar validaciones de formularios en el backend.
5. Añadir pruebas automatizadas para endpoints y lógica de negocio.
6. Documentar cada módulo con ejemplos de uso y payloads JSON.

---

## Resumen

Este repositorio representa un sistema de inventario institucional funcional, orientado a la gestión de activos, ubicaciones, dependencias y usuarios, con una base de datos bien estructurada y una interfaz web simple pero operativa. El backend en Flask permite la lógica de negocio y la persistencia, mientras que el frontend estático ofrece una experiencia de usuario rápida para las tareas de administración.

---

## Contribución

Este proyecto puede continuar ampliándose para incluir más módulos, más seguridad y mejores reportes. Si se trabaja en una nueva versión, o si se desea ampliar funcionalidad, es recomendable mantener la estructura actual y documentar cada cambio en el código y en la base de datos.
