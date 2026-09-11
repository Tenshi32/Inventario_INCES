function consultarUsuario() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/Usuario/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaUsuario");

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
function ValidacionUnicoInterno(id_campo) {

  const valorCampo = $(id_campo).val();

  if (valorCampo.length >= 3) {

    const url = "http://localhost:5000/Usuario/Existencia?valorBuscar=" + valorCampo ;

    fetch(url, {
      method: "GET",
    })

      .then(response => {
        if (!response.ok) throw new Error("Error en la red");
        $("#apellidoInterno").val("")
        $("#nombreInterno").val("")
        return response.json();

      })

      .then(data => {
        const lista = Object.values(data);
          const name = lista[5];
          const ape = lista[0];
          console.log(lista);
          $("#nombreInterno").val(name)
          $("#apellidoInterno").val(ape)
        
      })

      .catch(error => {
        initializeToast("Hubo un problema con la consulta o el empleado no está registrado", "danger");
        console.error("Hubo un problema con la consulta:", error);
      });
  }

}


$(document).ready(function () {

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  initializeDataTable("#MyTable")

  $("#formUsuario").validate({
    rules: {
      //Reglas de validacion para el "Dispositivo"
      cedula: {
        minlength: 5,
        maxlength: 10,
        pattern: /^[0-9]{5,10}$/
      },

      status: {
        required: true,
      },

      nombre: {
        required: true,
        pattern: /^[a-zA-ZÀ-ý\s]{1,45}$/,
      },
      apellido: {
        required: true,
        pattern: /^[a-zA-ZÀ-ý\s]{1,45}$/,
      },
      cargo: {
        required: true,
      },
      telefono: {
        minlength: 6,
        pattern: /^(?:\d{4}-?\d{7}|\d{11})?$/
      },
      correo: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      }
    },

    messages: {
      cedula: {
        required: "La cédula es obligatoria",
        minlength: "La cédula debe tener al menos 5 caracteres",
        maxlength: "La cédula no puede exceder 10 caracteres",
        pattern: "La cédula debe contener solo números",
      },

      status: {
        required: "El estado del empleado es obligatorio"
      },

      nombre: {
        required: "El nombre es obligatorio"
      },

      apellido: {
        required: "El apellido es obligatorio"
      },
      cargo: {
        required: "El cargo es obligatorio"
      },
      telefono: {
        minlength: "Indique el teléfono del empelado si lo posee",
        pattern: "El teléfono debe contener solo números y puede incluir un guion"
      },
      correo: {
        required: "El correo debe tener un formato válido (ejemplo@gmail.com)",
        pattern: "El correo debe tener un formato válido (ejemplo@gmail.com)"
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
  $("#formInterno").validate({
    rules: {
      //Reglas de validacion para el "Dispositivo"
      cedulaInterno: {
        minlength: 5,
        maxlength: 13,
        pattern: /^[0-9]{5,13}$/,
      },

      password: {
        required: true,
        minlength: 6,
        maxlength: 25,
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,}$/
      },
    },

    messages: {
      cedulaInterno: {
        minlength: "Indique la cédula del empleado",
        maxlength: "Indique la cédula del empleado",
        pattern: "Indique la cédula del empleado en números",
        required: "Indique la cédula del empleado"
      },

      password: {
        required: "La contraseña debe poseer letras y números, mínimo 6 caracteres",
        minlength: "La contraseña debe tener al menos 6 caracteres",
        maxlength: "La contraseña no puede exceder 25 caracteres",
        pattern: "La contraseña debe poseer letras y números, mínimo 6 caracteres"
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

  consultarUsuario()

});

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#formUsuario").on("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomMaster").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formUsuario",
      "http://127.0.0.1:5000/Usuario/Editar",
      "PUT",
      consultarUsuario
    );

    $("#UsuarioModal").modal("hide");

  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formUsuario",
      "http://127.0.0.1:5000/Usuario/Crear",
      "POST",
      consultarUsuario
    );
  }


});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivUsuario').on("click", "#openCreate", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formUsuario");
  if (form) form.reset();

  $("#ModalLabel").text("Crear Empleado");

  // Forzar vaciado de inputs clave e hidden
  $("#created").val("");
  $("#cedula").val("");
  $("#status").val("1");
  $("#nombre").val("");
  $("#apellido").val("");
  $("#cargo").val("");
  $("#telefono").val("");

  // Configurar el botón maestro para creación
  $("#buttomMaster")
    .text("Guardar Empleado")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#UsuarioModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaUsuario').on("click", ".Editar", function (event) {
  event.preventDefault();

  const form = document.getElementById("formUsuario");
  if (form) form.reset();

  $("#ModalLabel").text("Editar Empleado");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#created").val($(this).data("id"));
  $("#cedula").val($(this).data("cedula"));
  $("#status").val($(this).data("status_usuario"));
  $("#nombre").val($(this).data("nombre"));
  $("#correo").val($(this).data("correo"));
  $("#apellido").val($(this).data("apellido"));
  $("#cargo").val($(this).data("cargo"));
  $("#telefono").val($(this).data("telefono"));

  // Cambiar el botón maestro para edición
  $("#buttomMaster")
    .text("Editar Usuario")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#UsuarioModal").modal("show");
});
// ==========================================
// 3. EVENTO PARA ABRIR FORMULARIO CREAR USUARIO (INTERNO)
// ==========================================
$('#DivUsuario').on("click", "#openRecreate", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formUsuario");
  if (form) form.reset();

  $("#ModalInterLabel").text("Crear Usuario (interno)");

  // Configurar el botón maestro para creación
  $("#buttomInterno")
    .text("Agregar Usuario")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#InternoModal").modal("show");
});

// Evento para Operativo/Inoperativo o Desincorporar departamento
$('#tablaUsuario').on("click", ".Toggle", function (event) {

  const id = $(this).data("id");
  const statusActual = $(this).data("status");

  const nuevoStatus = (statusActual == 1) ? 2 : (statusActual == 2) ? 1 : 3;

  const datosManuales = new FormData();

  datosManuales.append("cedula", id);
  datosManuales.append("status", nuevoStatus);

  ActionCreateEdit(
    "buttomMaster",
    datosManuales,
    "http://127.0.0.1:5000/Usuario/Toggle",
    "PUT",
    consultarUsuario
  );

})

