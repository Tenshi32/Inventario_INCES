from controller.dispositivos_controller import DispositivosController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def dispositivos(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = DispositivosController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'All':
            answer = ctrl.all_dispositivos()
            return jsonify(answer)
        
        if accion == 'ExistenciaDispositivo':
            valorBuscar = request.args.get('valorBuscar')
            tipo_dispositivo = request.args.get('tipo_dispositivo')
            print("Datos que llegaron para buscar dispositivo por código:", valorBuscar, tipo_dispositivo)
            answer = ctrl.buscar_dispositivo_si_existe(tipo_dispositivo, valorBuscar)
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para crear Dispositivo: ", datos_recibidos)
            answer = ctrl.crear_dispositivo(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para editar Dispositivo: ", datos_recibidos)
            answer = ctrl.editar_dispositivo(datos_recibidos)
            return jsonify(answer)

        if accion == 'Toggle':
            datos_recibidos = request.form.to_dict()
            print("Datos que llegaron para Cambiar el status de Dispositivo: ", datos_recibidos)
            answer = ctrl.cambiar_estado_dispositivo(datos_recibidos)
            return jsonify(answer)
        
    # DELETE -> Toggle (same behavior)
    elif request.method == 'DELETE':
        datos_recibidos = request.form.to_dict()
        print("Datos que llegaron para eliminar Dispositivo: ", datos_recibidos)
        answer = ctrl.eliminar_dispositivo(datos_recibidos)
        return jsonify(answer)
