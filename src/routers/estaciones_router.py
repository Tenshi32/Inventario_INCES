from controller.estaciones_controller import EstacionesController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def estacionesTrabajo(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = EstacionesController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_estaciones()
            return jsonify(answer)
    
    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Estacion:", datos_recibidos)
            answer = ctrl.crear_estacion(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Estacion:", datos_recibidos)
            answer = ctrl.Edit_estacion(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de Estacion:", datos_recibidos)
            answer = ctrl.Toggle_estacion(datos_recibidos)
            return jsonify(answer)

    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle lineamiento (DELETE):", datos_recibidos)
        answer = ctrl.toggle(datos_recibidos)
        return jsonify(answer)
