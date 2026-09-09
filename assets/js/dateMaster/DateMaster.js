$(document).ready(function () {

  selectModelos("marca_modelo", "marcas", "marca");

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  $("#formMarcas").validate({
    rules: {

      marca: {
        required: true,
        minlength: 3,
        maxlength: 20
      },

    },

    messages: {

      marca: {
        minlength: "El código debe tener al menos 3 caracteres",
        maxlength: "El código no puede exceder 20 caracteres",
        required: "El estado es obligatorio"
      },

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

  $("#formModelos").validate({
    rules: {

      status: {
        required: true,
      },

      status: {
        required: true,
        minlength: 3,
        maxlength: 20
      },

    },

    messages: {

      status: {
        required: "El estado es obligatorio"
      },

      status: {
        minlength: "El código debe tener al menos 3 caracteres",
        maxlength: "El código no puede exceder 20 caracteres",
        required: "El estado es obligatorio"
      },

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

  consultarCategorias()
  consultarMarcas()
  consultarModelos()
  consultarDepartamentos()
  consultarConsumibles()
  consultarServicios()
  
});