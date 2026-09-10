from flask import Flask, request, jsonify, session, make_response
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

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Evita errores de bloqueo en el navegador 
app.secret_key = '2026'
 

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
    app.run(debug=True, host='0.0.0.0', port=5000)