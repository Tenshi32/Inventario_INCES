from controller.interno_controller import InternosController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def interno(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = InternosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_internos()
            return jsonify(answer)
        if accion == 'Existencia':
            valorBuscar = request.args.get('valorBuscar')
            answer = ctrl.unico_internos(valorBuscar)
            return jsonify(answer)
        if accion == 'Ratrear':
            valorBuscar = request.args.get('valorBuscar')
            answer = ctrl.rastrear_interno(valorBuscar)
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear interno:", datos_recibidos)
            answer = ctrl.crear_interno(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar interno:", datos_recibidos)
            answer = ctrl.editar_interno(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de interno:", datos_recibidos)
            answer = ctrl.toggle_interno(datos_recibidos)
            return jsonify(answer)

    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle lineamiento (DELETE):", datos_recibidos)
        answer = ctrl.toggle(datos_recibidos)
        return jsonify(answer)
