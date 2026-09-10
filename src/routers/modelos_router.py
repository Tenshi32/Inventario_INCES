from controller.modelo_controller import ModelosController
from flask import Blueprint, request, jsonify

def modelos(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = ModelosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_modelos()
            return jsonify(answer)

        if accion == 'ForDivice':
            marca = request.args.get('marca')
            answer = ctrl.modelos_for_device(marca)
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Modelo:", datos_recibidos)
            answer = ctrl.crear_modelo(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Modelo:", datos_recibidos)
            answer = ctrl.editar_modelo(datos_recibidos)
            return jsonify(answer)
        
        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Modelo:", datos_recibidos)
            answer = ctrl.toggle_modelo(datos_recibidos)
            return jsonify(answer)
