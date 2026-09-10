from controller.tipo_servicios_controller import TipoServiciosController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def tipo_servicios(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = TipoServiciosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_tipo_servicios()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Tipo de Servicio:", datos_recibidos)
            answer = ctrl.crear_tipo_servicio(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Tipo de Servicio:", datos_recibidos)
            answer = ctrl.editar_tipo_servicio(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de Tipo de Servicio:", datos_recibidos)
            answer = ctrl.toggle_tipo_servicio(datos_recibidos)
            return jsonify(answer)
            
