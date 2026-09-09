$(document).ready(function () {

    if (sessionStorage.getItem('usuario_nombre')) {
        window.location.href = "index.html";
    }

    $('#togglePassword').on('click', function () {
        const passwordInput = $('#loginPassword');
        const icon = $('#togglePasswordIcon');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });

    // Validación del formulario
    $("#formAuthentication").validate({
        // --- REGLAS DE VALIDACIÓN ---
        rules: {
            loginEmail: {
                required: true,
                minlength: 7,
                maxlength: 20,
                email: true
            },
            loginPassword: {
                required: true,
                minlength: 2,
                maxlength: 50
            }

        },
        // --- MENSAJES PERSONALIZADOS ---
        messages: {
            loginEmail: {
                required: "El correo electrónico es obligatorio",
                email: "Ingresa un correo electrónico válido",
                minlength: "La cédula debe tener al menos 7 dígitos",
                maxlength: "La cédula no debe exceder los 20 caracteres"
            },
            loginPassword: {
                required: "El nombre es obligatorio",
                minlength: "Mínimo 2 caracteres",
                maxlength: "Máximo 50 caracteres"
            }
        },

        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

});