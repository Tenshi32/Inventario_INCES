from controller.marcas_controller import MarcasController
from flask import Blueprint, request, jsonify

def marcas(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = MarcasController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_marcas()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Marca:", datos_recibidos)
            answer = ctrl.crear_marca(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Marca:", datos_recibidos)
            answer = ctrl.editar_marca(datos_recibidos)
            return jsonify(answer)
        
        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para toggle Marca:", datos_recibidos)
            answer = ctrl.toggle_marca(datos_recibidos)
            return jsonify(answer)