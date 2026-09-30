from model.login_model import LoginModel
from datetime import datetime
import random

class LoginController:

    def __init__(self):
        self.modelo = LoginModel()
    
    def rastrear_login(self, id_login):
        if not id_login:
            return None
        return self.modelo.get_login(id_login)