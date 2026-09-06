from controller.usuario_controller import UsuariosController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def usuario(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = UsuariosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_usuarios()
            return jsonify(answer)
        if accion == 'Existencia':
            valorBuscar = request.args.get('valorBuscar')
            answer = ctrl.unico_usuarios(valorBuscar)
            return jsonify(answer)
        if accion == 'Ratrear':
            valorBuscar = request.args.get('valorBuscar')
            answer = ctrl.rastrear_usuario(valorBuscar)
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear usuario:", datos_recibidos)
            answer = ctrl.crear_usuario(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar usuario:", datos_recibidos)
            answer = ctrl.editar_usuario(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de usuario:", datos_recibidos)
            answer = ctrl.toggle_usuario(datos_recibidos)
            return jsonify(answer)

    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para toggle lineamiento (DELETE):", datos_recibidos)
        answer = ctrl.toggle(datos_recibidos)
        return jsonify(answer)
