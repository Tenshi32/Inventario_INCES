from controller.tipo_dispositivos_controller import TipoDispositivosController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def tipo_dispositivos(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = TipoDispositivosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_tipo_dispositivos()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Tipo de Dispositivo: ", datos_recibidos)
            answer = ctrl.crear_tipo_dispositivo(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Tipo de Dispositivo: ", datos_recibidos)
            answer = ctrl.editar_tipo_dispositivo(datos_recibidos)
            return jsonify(answer)

    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle Tipo de Dispositivo: ", datos_recibidos)
        answer = ctrl.eliminar_tipo_dispositivo(datos_recibidos)
        return jsonify(answer)
