from flask import Flask, request, jsonify, session, make_response, send_from_directory
from flask_cors import CORS
import os

#Controllers
from routers.dependencias_router import dependencias
from routers.tipo_servicios_router import tipo_servicios
from routers.tipo_dispositivos_router import tipo_dispositivos
from routers.tipo_consumibles_router import tipo_consumibles
from routers.usuario_router import usuario
from routers.marcas_router import marcas
from routers.estados_router import estados
from routers.modelos_router import modelos
from routers.dispositivos_router import dispositivos
from routers.estaciones_router import estacionesTrabajo

app = Flask(__name__, static_folder='../html', static_url_path='')
CORS(app) # Evita errores de bloqueo en el navegador 


# Ruta para la página principal
@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all: si usas enrutamiento en el cliente (SPA), redirige cualquier otra ruta desconocida a index.html
@app.route('/<path:path>')
def catch_all(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')
 

#------------------- RUTAS ------------------


#------------------- DEPENDENCIAS ------------------
@app.route('/dependencia/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def dependencias_route(accion):
    return dependencias(accion)

#------------------- USUARIO ------------------
@app.route('/Usuario/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def usuario_route(accion):
    return usuario(accion)

#------------------- MODELOS ------------------
@app.route('/modelos/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def modelos_route(accion):
    return modelos(accion)

#------------------- MARCAS ------------------
@app.route('/marcas/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def marcas_route(accion):
    return marcas(accion)

#------------------- DISPOSITIVOS ------------------
@app.route('/Dispositivos/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def dispositivos_route(accion):
    return dispositivos(accion)

#------------------- ESTACIONES DE TRABAJO ------------------
@app.route('/EstacionesTrabajo/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def estaciones_trabajo_route(accion):
    return estacionesTrabajo(accion)

#------------------- TIPO DE SERVICIOS ------------------
@app.route('/tipo_servicios/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def tipo_servicios_route(accion):
    return tipo_servicios(accion)

#------------------- TIPO DE DISPOSITIVOS ------------------
@app.route('/tipo_dispositivos/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def tipo_dispositivos_route(accion):
    return tipo_dispositivos(accion)

#------------------- TIPO DE CONSUMIBLES ------------------
@app.route('/tipo_consumibles/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def tipo_consumibles_route(accion):
    return tipo_consumibles(accion)

#------------------- ESTADOS ------------------
@app.route('/estados/<accion>', methods=['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'])
def estados_route(accion):
    return estados(accion)


if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='127.0.0.1', port=5000)