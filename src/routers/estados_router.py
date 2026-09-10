from controller.estados_controller import EstadosController
from flask import Blueprint, request, jsonify

def estados(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = EstadosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_estados()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear estado:", datos_recibidos)
            answer = ctrl.crear_estado(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar estado:", datos_recibidos)
            answer = ctrl.editar_estado(datos_recibidos)
            return jsonify(answer)
        
        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para toggle estado:", datos_recibidos)
            answer = ctrl.toggle_estado(datos_recibidos)
            return jsonify(answer)