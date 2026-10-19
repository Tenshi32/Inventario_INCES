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
            offset = request.args.get('offset', default=0, type=int)
            limit = request.args.get('limit', default=5, type=int)
            search = request.args.get('search', default="")
            estado = request.args.get('estado')
            tipo = request.args.get('tipo')

            answer = ctrl.all_dispositivos(offset, limit, search, estado, tipo)

            return jsonify({
            "recordsTotal": answer[1],
            "recordsFiltered":  answer[1],
            "data": answer[0]
            })
        
        if accion == 'Search':
            valorBuscar = request.args.get('valorBuscar')
            print("Datos que llegaron para buscar dispositivo por código:", valorBuscar)
            answer = ctrl.rastrear_dispositivo(valorBuscar)
            return jsonify(answer) 

        if accion == 'ExistenciaDispositivo':
            valorBuscar = request.args.get('valorBuscar')
            tipo_dispositivo = request.args.get('tipo_dispositivo')
            print("Datos que llegaron para buscar dispositivo por código:", valorBuscar, tipo_dispositivo)
            answer = ctrl.buscar_dispositivo_si_existe(tipo_dispositivo, valorBuscar)
            return jsonify(answer)
        
        if accion == 'RatrearEstTrabajo':
            valorBuscar = request.args.get('valorBuscar')
            tipoCategoria = request.args.get('tipoCategoria')
            print("Datos que llegaron para buscar dispositivo por código:", valorBuscar, tipoCategoria)
            answer = ctrl.rastrear_dispositivo_est_trabajo(valorBuscar, tipoCategoria)
            return jsonify(answer)

    # POST -> Crear
    elif request.method == 'POST':
        if accion == 'Crear':
            datos_recibidos = request.get_json(silent=True)
            print("Datos que llegaron para crear Dispositivo: ", datos_recibidos)
            answer = ctrl.crear_dispositivo(datos_recibidos)
            return jsonify(answer)

    # PUT -> Editar / Toggle
    elif request.method == 'PUT':
        if accion == 'Editar':
            datos_recibidos = request.get_json(silent=True)
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
