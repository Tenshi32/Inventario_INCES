from controller.dependencias_controller import DependenciasController
from flask import Blueprint, request, jsonify

def dependencias(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = DependenciasController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_dependencias()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Dependencia:", datos_recibidos)
            answer = ctrl.crear_dependencia(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Dependencia:", datos_recibidos)
            answer = ctrl.editar_dependencia(datos_recibidos)
            return jsonify(answer)


    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle lineamiento (DELETE):", datos_recibidos)
        answer = ctrl.eliminar_dependencia(datos_recibidos)
        return jsonify(answer)
