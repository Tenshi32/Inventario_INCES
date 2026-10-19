from controller.status_controller import StatusController
from flask import Blueprint, request, jsonify

def status(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = StatusController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_status()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear statu:", datos_recibidos)
            answer = ctrl.crear_status(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar statu:", datos_recibidos)
            answer = ctrl.editar_status(datos_recibidos)
            return jsonify(answer)
        
"""         if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para toggle statu:", datos_recibidos)
            answer = ctrl.toggle_statu(datos_recibidos)
            return jsonify(answer) """