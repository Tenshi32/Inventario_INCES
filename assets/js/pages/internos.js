function consultarInterno() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/Interno/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaInterno");

      let contenido = "";
      let total = lista.length;
      let operativos = 0;
      let inoperativos = 0;
      let ultimoCodigo = "-";

      if ($.fn.DataTable.isDataTable('#MyTable')) {
        $('#MyTable').DataTable().destroy();
      }

      // Si hay elementos, obtenemos el código del último switch registrado
      if (lista.length > 0) {
        // Asumiendo que el último elemento del array es el más reciente
        ultimoCodigo = lista[lista.length - 1].cedula;
      }

      lista.forEach(item => {

        // (Asumiendo que id_status === 1 representa 'Operativo' según tu backend)
        if (item.status_usuario === "1") {
          operativos++;
        }
        if (item.status_usuario === "2") {
          inoperativos++;
        }

        // Manejo de estados (Activo/Inactivo)
        let textoAccion = (item.id_status !== 1) ? 'Operativo' : 'Inoperativo';

        optionEditar = `
          <a class="dropdown-item py-2 Editar text-primary" 
           data-cedula="${item.cedula}"
           data-nombre="${item.nombre}"
           data-apellido="${item.apellido}"
           data-correo="${item.correo}"
           data-status_usuario="${item.status_usuario}"
           data-cargo="${item.cargo}"
           data-telefono="${item.telefono}"
           data-id_rol_interno="${item.id_rol_interno}"

           <i class="bi bi-pencil me-2"></i>Editar 
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.cedula}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.nombre}</td>

                          <td>
                            <span class="badge bg-light text-dark border border-gray-200">${item.apellido || 'N/A'}</span>
                          </td>

                          <td class="text-muted font-monospace small">${item.correo || 'S/N'}</td>

                          <td>
                            <code class="text-primary-emphasis bg-primary-subtle px-2 py-1 rounded small font-monospace">
                              ${item.cargo}
                            </code>
                          </td>

                          <td class="text-center">
                            <span class="badge rounded-pill px-3 py-2">
                              ${item.telefono}
                            </span>
                          </td>

                          <td class="pe-4 text-end">
                           

                                ${optionsActiosUsuario(item, textoAccion, optionEditar)}
                        
                          </td>
                        </tr>
                      `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTable');
      document.getElementById("totalDevice").textContent = total;
      document.getElementById("operativoCount").textContent = operativos;
      document.getElementById("inoperativoCount").textContent = inoperativos;
      document.getElementById("lastId").textContent = ultimoCodigo;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function ValidacionUnicoUsuario(id_campo) {

  const valorCampo = $(id_campo).val();

  if (valorCampo.length >= 3) {

    const url = "http://localhost:5000/Usuario/Existencia?valorBuscar=" + valorCampo ;

    fetch(url, {
      method: "GET",
    })

      .then(response => {
        if (!response.ok) throw new Error("Error en la red");
        return response.json();
      })

      .then(data => {
        if (data != null) {
          initializeToast("El Cedula o Telefono de activo ya Existe.", "danger");
        }
      })

      .catch(error => {
        initializeToast("Hubo un problema con la consulta:" + error, "danger");
        console.error("Hubo un problema con la consulta:", error);
      });
  }

}

$(document).ready(function () {

  $('#togglePassword').on('click', function() {

    const passwordInput = $('#password');
    const icon = $('#togglePasswordIcon');
    const iconLock = $('#toggleLockdIcon');
    
    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
      icon.removeClass('bi-eye').addClass('bi-eye-slash');
      iconLock.removeClass('bi-unlock').addClass('bi-lock');
    } else {
      passwordInput.attr('type', 'password');
      icon.removeClass('bi-eye-slash').addClass('bi-eye');
      iconLock.removeClass('bi-lock').addClass('bi-unlock');
    }
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  initializeDataTable("#MyTable")

  $.validator.addMethod("strongPassword", function (value, element) {
    return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(value);
  });

  $("#formInterno").validate({
    rules: {
      id_usuario: {
        required: true,
        digits: true,
        minlength: 6,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6,
        strongPassword: true
      },
      passwordConfirm: {
        required: true,
        equalTo: "#password"
      },
      id_rol_interno: {
        required: true
      }
    },

    messages: {
      id_usuario: {
        required: "La cédula es obligatoria.",
        digits: "Ingrese solo números.",
        minlength: "La cédula debe tener al menos 6 dígitos.",
        maxlength: "La cédula no debe superar los 10 dígitos."
      },
      password: {
        required: "La contraseña es obligatoria.",
        minlength: "La contraseña debe tener al menos 6 caracteres.",
        strongPassword: "Debe incluir al menos una letra, un número y un carácter especial (!@#$%...)."
      },
      passwordConfirm: {
        required: "Debe confirmar la contraseña.",
        equalTo: "Las contraseñas no coinciden."
      },
      id_rol_interno: {
        required: "Seleccione un rol de interno."
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

  consultarInterno()

});

function BuscarUsuario() {

  fetch("http://localhost:5000/Usuario/Ratrear?valorBuscar=" + document.getElementById("id_usuario").value, {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const item = data;
      const tabla = document.getElementById("datosUsuario");
      console.log(item);
      let contenido = "";

      // Manejo de estados (Activo/Inactivo)
      let textoStatus = (item.status_usuario !== 1) ? 'Activo' : 'Inactivo';

      contenido = `
                    <div class="card card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold fs-6">${item.cedula}</span>
                        <span class="badge ${item.status_usuario === 1 ? 'bg-success' : 'bg-danger'}">
                          ${textoStatus}
                        </span>
                      </div>
                      <div><strong>Nombre:</strong> ${item.nombre} ${item.apellido || ''}</div>
                      <div><strong>Correo:</strong> ${item.correo || 'S/N'}</div>
                      <div><strong>Cargo:</strong> ${item.cargo}</div>
                      <div><strong>Teléfono:</strong> ${item.telefono}</div>
                    </div>
                  `;

      // Inyectamos las filas
      tabla.innerHTML = contenido;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#formInterno").on("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomMaster").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formInterno",
      "http://127.0.0.1:5000/Interno/Editar",
      "PUT",
      consultarInterno
    );

    $("#InternoModal").modal("hide");

  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formInterno",
      "http://127.0.0.1:5000/Interno/Crear",
      "POST",
      consultarInterno
    );
  }


});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivInterno').on("click", "#openCreate", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formInterno");
  if (form) form.reset();

  $("#ModalLabel").text("Crear Interno");

  // Forzar vaciado de inputs clave e hidden
  $("#created").val("");

  $("#passwordFields").show();
  $("#passwordConfirmFields").show();

  $("#password").val("");
  $("#passwordConfirm").val("");
  $("#id_rol_interno").val("1");

  // Configurar el botón maestro para creación
  $("#buttomMaster")
    .text("Guardar Interno")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#InternoModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaInterno').on("click", ".Editar", function (event) {
  event.preventDefault();

  const form = document.getElementById("formInterno");
  if (form) form.reset();

  $("#ModalLabel").text("Editar Interno");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#created").val($(this).data("cedula"));
  $("#id_usuario").val($(this).data("cedula"));

  $("#passwordFields").hide();
  $("#passwordConfirmFields").hide();

  $("#id_rol_interno").val($(this).data("id_rol_interno"));

  // Cambiar el botón maestro para edición
  $("#buttomMaster")
    .text("Editar Interno")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#InternoModal").modal("show");
});

// Evento para Operativo/Inoperativo o Desincorporar departamento
$('#tablaInterno').on("click", ".Toggle", function (event) {

  const id = $(this).data("id");
  const statusActual = $(this).data("status");

  const nuevoStatus = (statusActual == 1) ? 2 : (statusActual == 2) ? 1 : 3;

  const datosManuales = new FormData();

  datosManuales.append("cedula", id);
  datosManuales.append("status", nuevoStatus);

  ActionCreateEdit(
    "buttomMaster",
    datosManuales,
    "http://127.0.0.1:5000/Interno/Toggle",
    "PUT",
    consultarInterno
  );

})