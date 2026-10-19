
import { initDataTable } from "../components/DatatableComponente.js"
import { initSelect2, destroySelect2 } from "../components/Select2Componente.js"
import { GetAjaxDevice, GetDevice, PostDevice, PutDevice } from "../services/DispositivoService.js"
import { GetModelo } from "../services/ModelosService.js"


let ModelosBuscados = [];

function datosDispositivo() {

  const column = [
    {
      data: 'cd_dispositivo', render: function (data, type, row) {
        return `<span class="fw-bold fs-6">${data || '-'}</span>`;
      }
    },
    {
      data: 'tipo_dispositivo', render: function (data, type, row) {
        return `<span class="text-secondary fw-medium">${data || '-'}</span>`;
      }
    },
    {
      data: 'marca', render: function (data, type, row) {
        return `<span class="text-secondary fw-medium">${data || '-'}</span>`;
      }
    },
    {
      data: 'modelo', render: function (data, type, row) {
        return `<span class="badge bg-light text-dark border border-gray-200">${data || '-'}</span>`;
      }
    },
    {
      data: 'serial', render: function (data, type, row) {
        return `<span class="text-muted font-monospace small">${data || 'S/N'}</span>`;
      }
    },
    {
      data: 'id_tipo_status', render: function (data, type, row) {

        let ListaTipoStatus = JSON.parse(localStorage.getItem("TipoStatusAll"));

        let datoTipoStatus = ListaTipoStatus.find(item => item.id_tipo_status == data);

        let status = datoTipoStatus.statu;
        // Puedes darle formato de Badge HTML a la columna Status
        return `
          <span class="badge ${estadoBadge(data)} px-3 py-2">
            ${status}
          </span>`;
      }
    },
    {
      data: null, orderable: false, render: function (data, type, row) {
        const optionEditar = `
          <a class="dropdown-item py-2 DispositivoEditar text-primary" href="#" 
             data-id_dispositivo="${row.id_dispositivo}">
            <i class="bi bi-pencil me-2"></i>Editar 
          </a>`;

        const optionDetalle = `
          <a class="dropdown-item py-2 DispositivoVerDetalle text-info" href="#" 
             data-id_dispositivo="${row.id_dispositivo}">
            <i class="bx bx-show me-2"></i>Ver Detalle 
          </a>`;

        let Actions = optionEditar + optionDetalle;

        return `${optionsActios(row, Actions)}`;
      }
    }
  ]

  const ajaxConfig = GetAjaxDevice()

  initDataTable('#MyTableDispositivo', column, ajaxConfig);

}

function datosMarcas() {

  const select = document.getElementById("marca_producto");

  let contenido;
  let lista;
  let data;

  data = JSON.parse(localStorage.getItem("MarcasAll"));

  contenido = '<option value="1" selected>Seleccione una opcion</option>';

  lista = Object.values(data);

  data.forEach(item => {
    // Manejo de estados (Activo/Inactivo)

    contenido += `
        <option value="${item.id_marcas}">${item.marca}</option>
        `;

  });

  // Inyectamos las filas
  select.innerHTML = contenido;

}

function datosTipoStatus() {

  const select = document.getElementById("status");

  let contenido;
  let lista;
  let data;

  data = JSON.parse(localStorage.getItem("TipoStatusAll"));

  contenido = '<option value="1" selected>Seleccione una opcion</option>';

  lista = Object.values(data);

  data.forEach(item => {
    // Manejo de estados (Activo/Inactivo)

    contenido += `
        <option value="${item.id_tipo_status}">${item.statu}</option>
        `;

  });

  // Inyectamos las filas
  select.innerHTML = contenido;

}

function datosTipoDispositivos() {

  let contenidofiltro;
  let contenido;
  let lista;
  let data;

  data = JSON.parse(localStorage.getItem("TipoDispositivoAll"));

  lista = Object.values(data);

  lista.forEach(item => {

    if (item.tipo_dispositivo === "S/Categoria") {
      contenidofiltro += `
          <option value="" selected>${item.tipo_dispositivo}</option>
        `;

    } else {

      contenidofiltro += `
          <option value="${item.id_tipo_dispositivo}">${item.tipo_dispositivo}</option>
        `;

    }

    if (item.estado_tipo_dispositivo == "1") {

      if (item.tipo_dispositivo === "S/Categoria") {
        contenido += `
          <option value="" selected>${item.tipo_dispositivo}</option>
        `;

      } else {

        contenido += `
          <option value="${item.id_tipo_dispositivo}">${item.tipo_dispositivo}</option>
        `;

      }
    }

  });

  document.getElementById("filtroTipo").innerHTML = contenidofiltro;
  document.getElementById("tipo_dispositivo").innerHTML = contenido;

}

// Función que inicializa todo lo del módulo de dispositivos
export function renderPageDispositivos() {
  if (!$("#pageDispositivo").length) return; // Si no estamos en la vista, no hace nada

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  initializeTooltips(tooltipTriggerList);

  initSelect2("marca_producto", "DispositivoModal");
  initSelect2("modelo_producto", "DispositivoModal");
  datosDispositivo();

  datosMarcas();
  datosTipoStatus();
  datosTipoDispositivos();

  // Validación del Formulario
  $("#formDispositivo").validate({
    rules: {
      cd_dispositivo: { minlength: 3, maxlength: 20 },
      status: { required: true },
      posee_marca: { required: true },
      posee_modelo: { required: true },
      posee_serial: { required: true },
      serial_producto: { minlength: 6 },
    },
    messages: {
      cd_dispositivo: {
        minlength: "El código debe tener al menos 3 caracteres",
        maxlength: "El código no puede exceder 20 caracteres"
      },
      status: { required: "El estado es obligatorio" },
      posee_marca: { required: "Indique si posee o no marca" },
      posee_modelo: { required: "Indique si posee o no modelo" },
      posee_serial: { required: "Indique si posee o no número de serie" },
      marca_producto: { required: "La marca es obligatoria" },
      modelo_producto: { required: "El modelo es obligatorio" },
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
}

//Eventos para Crear Marcas y Modelos desde el Formulario

//Eventos para habilitar los campos Text
$(document).on("click", "#EventMarcaPlus", function () {
  destroySelect2("marca_producto");
  $("#marca_producto").remove(); // 

  $("#divMarca").append(`<input type="text" class="form-control" id="marca_producto" name="marca_producto" placeholder="Nueva Marca..">`);

  if ($("#modelo_producto").attr("type") != "text") {
    destroySelect2("modelo_producto");
    $("#modelo_producto").remove(); // 

    $("#divModelo").append(`<input type="text" class="form-control" id="modelo_producto" name="modelo_producto" placeholder="Nuevo Modelo..">`);

  }

  $(this).removeClass("bi-plus-circle text-success")
  $(this).addClass("bi-x-circle text-danger")
  $(this).attr("id", "EventMarcaMinus")

  $("#EventModeloPlus").removeClass("bi-plus-circle text-success")
  $("#EventModeloPlus").addClass("bi-x-circle text-danger")
  $("#EventModeloPlus").attr("id", "EventModeloMinus")


});

$(document).on("click", "#EventModeloPlus", function () {
  destroySelect2("modelo_producto");
  $("#modelo_producto").remove(); // 

  $("#divModelo").append(`<input type="text" class="form-control" id="modelo_producto" name="modelo_producto" placeholder="Nuevo Modelo..">`);

  $(this).removeClass("bi-plus-circle text-success")
  $(this).addClass("bi-x-circle text-danger")
  $(this).attr("id", "EventModeloMinus")

});

//Eventos para desabilitar los campos Text
$(document).on("click", "#EventMarcaMinus", function () {

  $("#marca_producto").remove(); // 

  $("#divMarca").append(`
    <select id="marca_producto" name="marca_producto" class="form-select">
      <option value="">Selecciona una marca</option>
    </select>`);

  initSelect2("marca_producto", "DispositivoModal");
  datosMarcas()

  $(this).removeClass("bi-x-circle text-danger")
  $(this).addClass("bi-plus-circle text-success")
  $(this).attr("id", "EventMarcaPlus")

});

$(document).on("click", "#EventModeloMinus", function () {

  $("#modelo_producto").remove(); // 

  $("#divModelo").append(`
    <select id="modelo_producto" name="modelo_producto" class="form-select">
      <option value="">Selecciona un modelo</option>
    </select>`);

  initSelect2("modelo_producto", "DispositivoModal");
  $("#marca_producto").trigger("change");
  $(this).removeClass("bi-x-circle text-danger")
  $(this).addClass("bi-plus-circle text-success")
  $(this).attr("id", "EventModeloPlus")

});

// Evento dependiente de Select Marca -> Modelos
$(document).on("change", "#marca_producto", async function () {

  if ("#formDispositivo".length) {

    const marcaId = $(this).val();

    const datos = await GetModelo("ForDivice?marca=" + marcaId)

    ModelosBuscados = Object.values(datos);

    const select = $("#modelo_producto");

    let contenido = "";

    ModelosBuscados.forEach(item => {

      contenido += `
          <option value="${item.id_modelos}">${item.modelo}</option>
          `;

    });

    // Inyectamos las filas
    // 2. Inyectamos el HTML al select nativo
    select.html(contenido);

    // 3. ¡IMPORTANTE! Notificamos a Select2 para que re-renderice la lista
    select.trigger('change');
  }

});

// SUBMIT UNIFICADO (CREAR / EDITAR)
$("#formDispositivo").on("submit", function (event) {
  event.preventDefault();

  if (!$(this).valid()) return false;

  const accion = $("#buttomMaster").attr("action");
  const formData = new FormData(this);

  const nuevoDispositivo = Object.fromEntries(formData.entries());

  if (accion === "edit") {

    actualizarFilaDataTable(nuevoDispositivo);

  } else {

    agregarFilaDataTable(nuevoDispositivo, ModelosBuscados);

  }

  $("#DispositivoModal").modal("hide");

});

function actualizarFilaDataTable(nuevoDispositivo, ModelosBuscados) {


  const tabla = $("#MyTableDispositivo").DataTable();

  const ListaTiposDispositivos = JSON.parse(localStorage.getItem("TipoDispositivoAll"));
  const ListaMarcas = JSON.parse(localStorage.getItem("MarcasAll"));
  const ListaTipoStatus = JSON.parse(localStorage.getItem("TipoStatusAll"));

  let datoTipo_dispositivo = ListaTiposDispositivos.find(item => item.id_tipo_dispositivo == nuevoDispositivo.tipo_dispositivo);
  nuevoDispositivo.tipo_dispositivo = datoTipo_dispositivo.tipo_dispositivo;
  nuevoDispositivo.id_tipo_dispositivo = datoTipo_dispositivo.id_tipo_dispositivo;

  // 2. Manejo de la Marca (Puede ser nueva o existente)
  if (!nuevoDispositivo.marca_producto) {
    nuevoDispositivo.marca = "S/Marca";
  } else {
    let datoMarca = ListaMarcas.find(item => item.id_marcas == nuevoDispositivo.marca_producto);
    nuevoDispositivo.marca = datoMarca ? datoMarca.marca : (nuevoDispositivo.marca || "S/Marca");
  }

  // 3. Manejo del Modelo (Puede ser nuevo, existente o S/Modelo)
  if (!nuevoDispositivo.modelo_producto) {
    nuevoDispositivo.modelo = "S/Modelo";
  } else {
    // Intentamos buscarlo en ModelosBuscados o en el localStorage si lo tuvieras
    let datoModelo = ModelosBuscados ? ModelosBuscados.find(item => item.id_modelos == nuevoDispositivo.modelo_producto) : null;

    nuevoDispositivo.modelo = datoModelo ? datoModelo.modelo : (nuevoDispositivo.modelo || "S/Modelo");
  }

  let datoTipoStatus = ListaTipoStatus.find(item => item.id_tipo_status == nuevoDispositivo.status);
  nuevoDispositivo.statu = datoTipoStatus.statu;
  nuevoDispositivo.id_tipo_status = nuevoDispositivo.status;

  nuevoDispositivo.serial = nuevoDispositivo.serial_producto;

  PutDevice(nuevoDispositivo, "Editar")

  let filaEncontrada = null;
  tabla.rows().every(function (rowIdx, tableLoop, rowLoop) {
    let dataRow = this.data();
    // Comparamos el ID del dispositivo actual con el que estamos editando
    if (dataRow.id_dispositivo == nuevoDispositivo.id_dispositivo) {
      filaEncontrada = this; // Guardamos la instancia correcta de la fila de DataTables
    }
  });

  filaEncontrada.data(nuevoDispositivo).draw(false);

}

function agregarFilaDataTable(nuevoDispositivo, ModelosBuscados) {

  const tabla = $("#MyTableDispositivo").DataTable();

  const ListaTiposDispositivos = JSON.parse(localStorage.getItem("TipoDispositivoAll"));
  const ListaMarcas = JSON.parse(localStorage.getItem("MarcasAll"));
  const ListaTipoStatus = JSON.parse(localStorage.getItem("TipoStatusAll"));

  let datoTipo_dispositivo = ListaTiposDispositivos.find(item => item.id_tipo_dispositivo == nuevoDispositivo.tipo_dispositivo);
  nuevoDispositivo.tipo_dispositivo = datoTipo_dispositivo.tipo_dispositivo;
  nuevoDispositivo.id_tipo_dispositivo = datoTipo_dispositivo.id_tipo_dispositivo;

  // 2. Manejo de la Marca (Puede ser nueva o existente)
  if (!nuevoDispositivo.marca_producto) {
    nuevoDispositivo.marca = "S/Marca";
  } else {
    let datoMarca = ListaMarcas.find(item => item.id_marcas == nuevoDispositivo.marca_producto);
    nuevoDispositivo.marca = datoMarca ? datoMarca.marca : (nuevoDispositivo.marca || "S/Marca");
  }

  // 3. Manejo del Modelo (Puede ser nuevo, existente o S/Modelo)
  if (!nuevoDispositivo.modelo_producto) {
    nuevoDispositivo.modelo = "S/Modelo";
  } else {
    // Intentamos buscarlo en ModelosBuscados o en el localStorage si lo tuvieras
    let datoModelo = ModelosBuscados ? ModelosBuscados.find(item => item.id_modelos == nuevoDispositivo.modelo_producto) : null;

    nuevoDispositivo.modelo = datoModelo ? datoModelo.modelo : (nuevoDispositivo.modelo || "S/Modelo");
  }

  let datoTipoStatus = ListaTipoStatus.find(item => item.id_tipo_status == nuevoDispositivo.status);
  nuevoDispositivo.statu = datoTipoStatus.statu;
  nuevoDispositivo.id_tipo_status = nuevoDispositivo.status;

  nuevoDispositivo.serial = nuevoDispositivo.serial_producto;

  PostDevice(nuevoDispositivo)
  tabla.row.add(nuevoDispositivo).draw(false);

}

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
$("#tablaDispositivos").on("click", ".DispositivoEditar", async function (event) {
  event.preventDefault();

  const form = document.getElementById("formDispositivo");
  if (form) form.reset();

  const $filaActual = `#dispositivo-${$(this).data("id_dispositivo")}`;
  $("#formDispositivo").attr("data-fila_editar", $filaActual);


  $("#ModalLabel").text("Editar Dispositivo");

  // Manejo correcto del ID Hidden
  $("#id_dispositivo").remove();

  let data = await GetDevice("Search?valorBuscar=" + $(this).data("id_dispositivo"));
  console.log(data)
  $("#formDispositivo").append(`<input type="hidden" id="id_dispositivo" name="id_dispositivo" value="${data.id_dispositivo}">`);

  $("#tipo_dispositivo").val(data.id_tipo_dispositivo);

  $("#cd_dispositivo").val(data.cd_dispositivo);
  $("#status").val(data.id_tipo_status);

  // Marca

  const poseeMarca = data.posee_marca;
  const id_marca = data.id_marcas;
  $("#posee_marca").val(poseeMarca).trigger("change");
  if (poseeMarca === "Si") {
    $("#marca_producto").val(id_marca);
  }

  // Modelo
  const poseeModelo = data.posee_modelo;
  $("#posee_modelo").val(poseeModelo).trigger("change");

  if (poseeModelo === "Si") {
    $("#marca_producto").val(id_marca).trigger("change");
    $("#modelo_producto").val(data.id_modelos);
  }

  // Serial
  const poseeSerial = data.posee_serial;
  $("#posee_serial").val(poseeSerial).trigger("change");
  if (poseeSerial === "Si") {
    $("#serial_producto").val(data.serial);
  }

  $("#descripcion_general").val(data.descripcion_general);
  $("#observaciones_tecnicas").val(data.observaciones_tecnicas);


  // Configurar botón principal
  $("#buttomMaster")
    .text("Editar Dispositivo")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  $("#DispositivoModal").modal("show");
});

$("#tablaDispositivos").on("click", ".DispositivoVerDetalle", function (event) {
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
  $("#detail_descripcion").text(descripcion);

  $("#detail_observaciones").text(observaciones);

  // 5. Mostrar el Modal
  $("#DispositivoDetallesModal").modal("show");
});

// Cambiar estado Operativo / Inoperativo
$("#tablaDispositivos").on("click", ".Toggle", function (event) {
  const id = $(this).data("id");
  const statusActual = $(this).data("status");

  ActionToggle(statusActual, id, consultarDispositivo);
});