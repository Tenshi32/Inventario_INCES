from controller.login_controller import LoginController
from flask import Blueprint, request, jsonify
from model.db_connect import DbConnect

def login(accion):

    if request.method == 'OPTIONS':
        return '', 200

    ctrl = LoginController()

    # GET -> Consultar
    if request.method == 'GET':
        if accion == 'Ratrear':
            valorBuscar = request.args.get('valorBuscar')
            answer = ctrl.rastrear_login(valorBuscar)
            return jsonify(answer)

