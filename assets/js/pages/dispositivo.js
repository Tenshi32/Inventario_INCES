function consultarDispositivo(forzarRecarga = false) {

  const datosGuardados = sessionStorage.getItem("dispositivosData");

  if (datosGuardados && !forzarRecarga) {
    console.log("Cargando desde sessionStorage (Sin consumo de API)");
    const data = JSON.parse(datosGuardados);
    renderizarTablaDispositivos(data); // Función separada para renderizar
    return;
  }

  console.log("Consultando API Flask por red...");
  // 1. URL de tu servidor Flask
  fetch("http://127.0.0.1:5000/Dispositivos/All", {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      // 3. Guardar en sessionStorage transformando el JSON a string
      sessionStorage.setItem("dispositivosData", JSON.stringify(data));

      // 4. Renderizar
      renderizarTablaDispositivos(data);

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function renderizarTablaDispositivos(data) {

  const lista = Object.values(data);
  const tabla = document.getElementById("tablaDispositivos");

  let contenido = "";
  let total = lista.length;
  let operativos = 0;
  let inoperativos = 0;
  let ultimoCodigo = "-";

  if ($.fn.DataTable.isDataTable('#MyTable')) {
    $('#MyTable').DataTable().destroy();
  }

  if (lista.length > 0) {
    ultimoCodigo = lista[lista.length - 1].cd_dispositivo;
  }

  lista.forEach(item => {

    if (item.id_status === 1) operativos++;
    if (item.id_status === 2) inoperativos++;

    let textoAccion = (item.id_status !== 1) ? 'Operativo' : 'Inoperativo';

    const optionEditar = `
      <a class="dropdown-item py-2 DispositivoEditar text-primary" 
         data-id_dispositivo="${item.id_dispositivo}"
         data-cd_dispositivo="${item.cd_dispositivo}"
         data-posee_marca="${item.posee_marca}"
         data-marca="${item.id_marcas}"
         data-posee_modelo="${item.posee_modelo}"
         data-modelo="${item.id_modelo}"
         data-posee_serial="${item.posee_serial}"
         data-serial="${item.serial}"
         data-id_tipo_dispositivo="${item.id_tipo_dispositivo}"
         data-descripcion_general="${item.descripcion_general}"
         data-observaciones_tecnicas="${item.observaciones_tecnicas}" 
         data-status="${item.id_tipo_status}">
         <i class="bi bi-pencil me-2"></i>Editar 
      </a>
    `;

    // Agrega esto junto a tus otras opciones de la tabla (ej. optionEditar)
    const optionDetalle = `
      <a class="dropdown-item py-2 DispositivoVerDetalleVerDetalle text-info" 
         href="#"
         data-cd_dispositivo="${item.cd_dispositivo}"
         data-tipo_dispositivo="${item.tipo_dispositivo}"
         data-statu="${item.statu}"
         data-id_status="${item.id_status}"
         data-posee_codigo="${item.posee_codigo}"
         data-posee_marca="${item.posee_marca}"
         data-id_marca="${item.id_marca}"
         data-posee_modelo="${item.posee_modelo}"
         data-id_modelo="${item.id_modelo}"
         data-posee_serial="${item.posee_serial}"
         data-serial="${item.serial || 'N/A'}"
         data-descripcion="${item.descripcion_general || 'Sin descripción'}"
         data-observaciones="${item.observaciones_tecnicas || 'Sin observaciones'}"
         data-fecha_carga="${item.fecha_carga}"
         data-fecha_modificacion="${item.fecha_modificacion}">
         <i class="bx bx-show me-2"></i>Ver Detalle 
      </a>
    `;

    let Actions = optionEditar + optionDetalle;

    contenido += `
          <tr class="border-bottom border-gray-100">
            <td class="ps-4 py-3">
              <span class="fw-bold fs-6">${item.cd_dispositivo}</span>
            </td>
            <td class="text-secondary fw-medium">${item.tipo_dispositivo || 'N/A'}</td>
        

            <td class="text-secondary fw-medium">${item.marca || 'N/A'}</td>

            <td>
              <span class="badge bg-light text-dark border border-gray-200">${item.modelo || 'N/A'}</span>
            </td>

            <td class="text-muted font-monospace small">${item.serial || 'S/N'}</td>

            <td class="text-center">
              <span class="badge rounded-pill ${estadoBadge(item.id_status)} px-3 py-2">
                ${item.statu}
              </span>
            </td>
            <td class="pe-4 text-end">
              ${optionsActios(item, textoAccion, Actions)}
            </td>
          </tr>
        `;
  });

  tabla.innerHTML = contenido;

  initializeDataTable('#MyTable');
  if (document.getElementById("totalDevice")) document.getElementById("totalDevice").textContent = total;
  if (document.getElementById("operativoCount")) document.getElementById("operativoCount").textContent = operativos;
  if (document.getElementById("inoperativoCount")) document.getElementById("inoperativoCount").textContent = inoperativos;
  if (document.getElementById("lastId")) document.getElementById("lastId").textContent = ultimoCodigo;

}

function consultarTipoDispositivo() {

  console.log("Consultando API Flask por red...");
  // 1. URL de tu servidor Flask
  fetch("http://127.0.0.1:5000/tipo_dispositivos/All", {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      // 3. Guardar en sessionStorage transformando el JSON a string
      sessionStorage.setItem("tipoDispositivosData", JSON.stringify(data));

      // 4. Renderizar
      SelectTipoDispositivos(data);

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function SelectTipoDispositivos(data) {

  const lista = Object.values(data);
  let contenido = ``;

  lista.forEach(item => {

    contenido += `
      <option value="${item.id_tipo_dispositivo}">${item.tipo_dispositivo}</option>
    `;

  });

  document.getElementById("tipo_dispositivo").innerHTML = contenido;

}

// Evento dependiente de Select Marca -> Modelos
$(document).on("change", "#marca_producto", function () {
  const marcaId = $(this).val();

  if (marcaId) {
    selectDependiente("modelo_producto", "modelos", "modelo", marcaId);
  }

});

$(document).ready(function () {
  selectModelos("marca_producto", "marcas", "marca");

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  initializeTooltips(tooltipTriggerList);

  initializeDataTable("#MyTable");

  consultarTipoDispositivo();

  // Validación del Formulario
  $("#formDispositivo").validate({
    rules: {
      cd_dispositivo: {
        minlength: 3,
        maxlength: 20
      },
      status: {
        required: true
      },
      posee_marca: {
        required: true
      },
      posee_modelo: {
        required: true
      },
      posee_serial: {
        required: true
      },
      serial_producto: {
        minlength: 6
      },

    },
    messages: {
      cd_dispositivo: {
        minlength: "El código debe tener al menos 3 caracteres",
        maxlength: "El código no puede exceder 20 caracteres"
      },
      status: {
        required: "El estado es obligatorio"
      },
      posee_marca: {
        required: "Indique si posee o no marca"
      },
      posee_modelo: {
        required: "Indique si posee o no modelo"
      },
      posee_serial: {
        required: "Indique si posee o no número de serie"
      },
      marca_producto: {
        required: "La marca es obligatoria"
      },
      modelo_producto: {
        required: "El modelo es obligatorio"
      },
      serial_producto: {
        required: "El número de serie es obligatorio",
        minlength: "El número de serie debe tener al menos 6 caracteres"
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element) {
      $(element).removeClass('is-invalid');
    }
  });

  consultarDispositivo(true);
});

// SUBMIT UNIFICADO (CREAR / EDITAR)
$("#formDispositivo").on("submit", function (event) {
  event.preventDefault();

  if (!$(this).valid()) return false;

  const accion = $("#buttomMaster").attr("action");

  if (accion === "edit") {
    ActionCreateEdit(
      "buttomMaster",
      "formDispositivo",
      "http://127.0.0.1:5000/Dispositivo/Editar",
      "PUT",
      consultarDispositivo(true)
    );
  } else {
    ActionCreateEdit(
      "buttomMaster",
      "formDispositivo",
      "http://127.0.0.1:5000/Dispositivo/Crear",
      "POST",
      consultarDispositivo(true)
    );
  }

  $("#DispositivoModal").modal("hide");
});

// ABRIR MODAL EN MODO CREAR
$(document).on("click", "#openCreate", function (event) {
  const form = document.getElementById("formDispositivo");
  if (form) form.reset();

  $("#ModalLabel").text("Crear Dispositivo");

  // Limpiar campos e IDs hidden
  $("#id_dispositivo").remove();

  // Resetear selects condicionales
  $("#posee_marca").val("No").trigger("change");
  $("#posee_modelo").val("No").trigger("change");
  $("#posee_serial").val("No").trigger("change");

  $("#marca_producto").val("");
  $("#modelo_producto").val("");
  $("#serial_producto").val("");

  $("#descripcion_general").val("");
  $("#observaciones_tecnicas").val("");

  // Configurar botón principal
  $("#buttomMaster")
    .text("Guardar Dispositivo")
    .removeClass("btn-warning")
    .addClass("btn-primary")
    .attr("action", "create");

  $("#DispositivoModal").modal("show");
});

// ABRIR MODAL EN MODO EDITAR
$("#tablaDispositivos").on("click", ".DispositivoEditar", function (event) {
  event.preventDefault();

  const form = document.getElementById("formDispositivo");
  if (form) form.reset();

  $("#ModalLabel").text("Editar Dispositivo");

  // Manejo correcto del ID Hidden
  $("#id_dispositivo").remove();
  $("#formDispositivo").append(`<input type="hidden" id="id_dispositivo" name="id_dispositivo" value="${$(this).data("id_dispositivo")}">`);

  $("#cd_dispositivo").val($(this).data("cd_dispositivo"));
  $("#status").val($(this).data("status"));

  // Marca
  const poseeMarca = $(this).data("posee_marca");
  const id_marca = $(this).data("marca");
  $("#posee_marca").val(poseeMarca).trigger("change");
  if (poseeMarca === "Si") {
    selectModelos("marca_producto", "marcas", "marca", id_marca);
    $("#marca_producto").val(id_marca);
  }

  // Modelo
  const poseeModelo = $(this).data("posee_modelo");
  $("#posee_modelo").val(poseeModelo).trigger("change");
  $("#modelo_producto").val($(this).data("modelo"));

  // Serial
  const poseeSerial = $(this).data("posee_serial");
  $("#posee_serial").val(poseeSerial).trigger("change");
  if (poseeSerial === "Si") {
    $("#serial_producto").val($(this).data("serial"));
  }

  $("#descripcion_general").val($(this).data("descripcion_general"));
  $("#observaciones_tecnicas").val($(this).data("observaciones_tecnicas"));

  // Configurar botón principal
  $("#buttomMaster")
    .text("Editar Dispositivo")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  $("#DispositivoModal").modal("show");
});

$(document).on("click", ".DispositivoVerDetalleVerDetalle", function (event) {
  event.preventDefault();

  // 1. Extraer datos del elemento cliqueado
  const codigo = $(this).data("cd_dispositivo");
  const tipo = $(this).data("tipo_dispositivo");
  const estadoTexto = $(this).data("statu");
  const statusId = $(this).data("id_status");
  const serial = $(this).data("serial");
  const marca = $(this).data("marca");
  const modelo = $(this).data("modelo");
  const descripcion = $(this).data("descripcion_general");
  const observaciones = $(this).data("observaciones_tecnicas");

  // 2. Asignar los datos simples a las etiquetas correspondientes
  $("#detail_codigo").text(codigo);
  $("#detail_tipo").text(tipo);
  $("#detail_serial").text(serial);
  $("#detail_marca").text(marca);
  $("#detail_modelo").text(modelo);

  // 3. Asignar estado aplicando clase dinámica según statusId
  const $badgeStatus = $("#detail_status");
  $badgeStatus.text(estadoTexto);
  
  // Reutilizamos la función estadoBadge si existe, o asignamos directo
  if (typeof estadoBadge === "function") {
    $badgeStatus.attr("class", `badge rounded-pill ${estadoBadge(statusId)} px-3 py-2`);
  } else {
    // Alternativa manual
    const badgeClass = statusId === 1 ? "bg-success" : "bg-danger";
    $badgeStatus.attr("class", `badge ${badgeClass}`);
  }

  // 4. Manejar campos de texto largo con fallback cuando están vacíos
  $("#detail_descripcion").text(
    descripcion && descripcion.trim() !== "" ? descripcion : "Sin información registrada."
  );
  
  $("#detail_observaciones").text(
    observaciones && observaciones.trim() !== "" ? observaciones : "Sin observaciones registradas."
  );

  // 5. Mostrar el Modal
  $("#DispositivoDetallesModal").modal("show");
});

// Cambiar estado Operativo / Inoperativo
$("#tablaDispositivos").on("click", ".DispositivoToggle", function (event) {
  const id = $(this).data("id");
  const statusActual = $(this).data("status");

  ActionToggle(statusActual, id, consultarDispositivo(true));
});