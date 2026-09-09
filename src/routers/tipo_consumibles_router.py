from controller.tipo_consumibles_controller import TipoConsumiblesController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def tipo_consumibles(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = TipoConsumiblesController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_tipo_consumibles()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Tipo de Consumible:", datos_recibidos)
            answer = ctrl.crear_tipo_consumible(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Tipo de Consumible:", datos_recibidos)
            answer = ctrl.editar_tipo_consumible(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de Tipo de Consumible:", datos_recibidos)
            answer = ctrl.toggle_tipo_consumible(datos_recibidos)
            return jsonify(answer)
            
        if accion == 'Trash':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Desincorporar Tipo de Consumible:", datos_recibidos)
            answer = ctrl.trash_tipo_consumible(datos_recibidos)
            return jsonify(answer)

    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle Tipo de Consumible (DELETE):", datos_recibidos)
        answer = ctrl.toggle_tipo_consumible(datos_recibidos)
        return jsonify(answer)
