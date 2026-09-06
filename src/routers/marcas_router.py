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
        
        if accion == 'ViewPeriodo':
            answer = ctrl.listar()
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Switch:", datos_recibidos)
            answer = ctrl.crear_switch(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Switch:", datos_recibidos)
            answer = ctrl.Edit_switch(datos_recibidos)
            return jsonify(answer)


    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle lineamiento (DELETE):", datos_recibidos)
        answer = ctrl.toggle(datos_recibidos)
        return jsonify(answer)
