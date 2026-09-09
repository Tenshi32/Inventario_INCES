function consultarConsumibles() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/Consumible/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaConsumibles");

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
        ultimoCodigo = lista[lista.length - 1].id_consumible;
      }

      lista.forEach(item => {

        // (Asumiendo que es_original === 1 representa 'Operativo' según tu backend)
        if (item.es_original === "Original" || item.es_original === "Generico") {
          operativos++;
        }
        if (item.es_original === "Recargado") {
          inoperativos++;
        }

        // Manejo de estados (Activo/Inactivo)
        let textoAccion = (item.es_original !== "Recargado") ? 'Operativo' : 'Inoperativo';

        let optionVerDetalles = `
          <a class="dropdown-item py-2 VerDetalles text-info" 
           data-id="${item.id_consumible}"
           data-tipo_consumible="${item.id_tipo_consumible}"
           data-es_original="${item.es_original}"
           data-cantidad_stock="${item.cantidad_stock}"
           data-stock_minimo="${item.stock_minimo}"
           data-modelo_consumible="${item.modelo_consumible}"
           data-descripcion_consumible="${item.descripcion_consumible}"
           data-cant_espacio="${item.cant_espacio}"
           data-tipo_cable="${item.tipo_cable}"
           data-tipo_RAM="${item.tipo_RAM}"
           data-tipo_pasta="${item.tipo_pasta}"
           data-potencia_watts="${item.potencia_watts}"
           data-tipo_power="${item.tipo_power}"
           data-tipo_tinta="${item.tipo_tinta}"
           <i class="bi bi-eye me-2"></i>Ver Detalles 
          </a>
        `;

        optionEditar = `
          <button class="btn btn-outline-primary py-2 Editar" 
           data-id="${item.id_consumible}"
           data-tipo_consumible="${item.id_tipo_consumible}"
           data-es_original="${item.es_original}"
           data-cantidad_stock="${item.cantidad_stock}"
           data-stock_minimo="${item.stock_minimo}"
           data-modelo_consumible="${item.modelo_consumible}"
           data-descripcion_consumible="${item.descripcion_consumible}"
           data-cant_espacio="${item.cant_espacio}"
           data-tipo_cable="${item.tipo_cable}"
           data-tipo_RAM="${item.tipo_RAM}"
           data-tipo_pasta="${item.tipo_pasta}"
           data-potencia_watts="${item.potencia_watts}"
           data-tipo_power="${item.tipo_power}"
           data-tipo_tinta="${item.tipo_tinta}">
           <i class="bi bi-pencil"></i> 
          </button>
          `
        let opcionesCompletas = optionVerDetalles + optionEditar;

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_consumible}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.consumible}</td>

                          <td>
                            <span class="badge bg-light text-dark border border-gray-200">${item.es_original}</span>
                          </td>

                          <td>
                             <code class="text-primary-emphasis bg-primary-subtle px-2 py-1 rounded small font-monospace">
                              ${item.cantidad_stock}
                            </code>
                          </td>

                          <td class="text-muted font-monospace small">
                              ${item.stock_minimo}
                          </td>

                          <td class="text-center">
                            <span class="text-muted font-monospace small">
                              ${item.modelo_consumible}
                            </span>
                          </td>

                          <td class="pe-4 text-end">
                           

                                ${optionEditar}
                        
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

// Función para gestionar qué campos mostrar/ocultar
function controlarCamposConsumible() {
  const valor = $('#consumible').val();

  // 1. Ocultar todos los contenedores condicionales por defecto
  const $contenedores = $('#div-disco, #div-UTP, #div-RAM, #div-Pasta, #div-power, #div-tinta');
  $contenedores.hide();

  // Limpiar clases de error si usas jQuery Validate

  $contenedores.find('select, input').removeClass('is-invalid');
  // 2. Mostrar la sección correspondiente según el ID del consumible
  switch (valor) {

    // Cable UTP, Conector RJ45, Jack RJ45
    case '1':  // UTP
    case '13': // Conector RJ45
    case '14': // Jack RJ45
      $('#div-UTP').fadeIn(200);
      break;

    // Cartucho
    case '10':  // Cartucho
      $('#div-tinta').fadeIn(200);

    // Almacenamiento
    case '11':  // Disco SSD
    case '12': // Disco HDD
      $('#div-disco').fadeIn(200);
      break;

    // Fuente de Poder
    case '16': // Fuente de Poder
      $('#div-power').fadeIn(200);
      break;

    // Memoria RAM
    case '7': // RAM
      $('#div-RAM').fadeIn(200);
      break;

    // Pasta Térmica
    case '8': // Pasta Termica
      $('#div-Pasta').fadeIn(200);
      break;

    default:
      // Opciones que no requieren campos adicionales (VGA, HDMI, Toner, Batería BIOS, etc.)
      break;
  }
}

$(document).ready(function () {

  $('#miSelect').select2({
    placeholder: "Seleccione una opción",
    allowClear: true
  });

  selectModelos("id_departamento", "departamento", "departamento", 1);

  selectModelos("marca_producto", "marcas", "marca");

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  initializeDataTable("#MyTable")

  $("#formConsumibles").validate({
    rules: {
      //Reglas de validacion para el "Dispositivo"
      cd_dispositivo: {
        minlength: 3,
        maxlength: 20
      },

      status: {
        required: true,
      },

      posee_marca: {
        required: true,
      },
      posee_modelo: {
        required: true,
      },
      posee_serial: {
        required: true,
      },

      serial_producto: {
        minlength: 6,
      },

      //Reglas de validacion para el CPU
      id_departamento: {
        required: true
      },
      tipo_conexion: {
        required: true
      },
      tipo_consumible: {
        required: true
      },
      tipo_tinta: {
        required: true
      },
      tamano_maximo: {
        required: true
      },
      resolucion_dpi: {
        required: true,
        digits: true,
        min: 1
      },
      posee_scanner_adf: {
        required: true
      },
      funciona_Consumibles: {
        required: true
      },
      funciona_escaner: {
        required: true
      }

    },

    messages: {
      cd_dispositivo: {
        minlength: "El código debe tener al menos 3 caracteres",
        maxlength: "El código no puede exceder 20 caracteres",
      },

      status: {
        required: "El estado es obligatorio"
      },

      tipo_mouse: {
        required: "El tipo de Mouse es obligatorio"
      },

      posee_marca: {
        required: "Indique si posee o no marca",
      },
      posee_modelo: {
        required: "Indique si posee o no modelo",
      },
      posee_serial: {
        required: "Indique si posee o no número de serie",
      },

      marca_producto: {
        required: "La marca es obligatoria",
      },
      modelo_producto: {
        required: "El modelo es obligatorio",
      },
      serial_producto: {
        required: "El número de serie es obligatorio",
        minlength: "El número de serie debe tener al menos 6 caracteres",
      },

      id_departamento: {
        required: "Seleccione el departamento donde se ubica la Consumibles."
      },
      tipo_conexion: {
        required: "El tipo de conexión es obligatorio."
      },
      tipo_consumible: {
        required: "El tipo de consumible es obligatorio."
      },
      tipo_tinta: {
        required: "El tipo de tinta es obligatorio."
      },
      tamano_maximo: {
        required: "El tamaño máximo de papel es obligatorio."
      },
      resolucion_dpi: {
        required: "La resolución en DPI es obligatoria.",
        digits: "Ingrese únicamente valores numéricos enteros.",
        min: "Ingrese una resolución mayor a 0."
      },
      posee_scanner_adf: {
        required: "Indique si posee escáner ADF."
      },
      funciona_Consumibles: {
        required: "Indique si funciona la Consumibles."
      },
      funciona_escaner: {
        required: "Indique si funciona el escáner."
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

  consultarConsumibles()

});

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#formConsumibles").on("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomMaster").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "buttomMaster",
      "formConsumibles",
      "http://127.0.0.1:5000/Consumible/Editar",
      "PUT",
      consultarConsumibles
    );

    $("#ConsumiblesModal").modal("hide");

  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "buttomMaster",
      "formConsumibles",
      "http://127.0.0.1:5000/Consumible/Crear",
      "POST",
      consultarConsumibles
    );
  }


});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivConsumibles').on("click", "#openCreate", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formConsumibles");
  if (form) form.reset();

  $("#ModalLabel").text("Crear Consumibles");

  // Forzar vaciado de inputs clave e hidden
  $("#created").val("");
  $('#formConsumibles').parent("#id_dispositivo").remove()
  $('#formConsumibles').parent("#id_procesador").remove()

  // Forzar que los selectores condicionales vuelvan a "No" y disparar su evento
  $("#posee_marca").val("No").trigger("change");
  $("#posee_modelo").val("No").trigger("change");
  $("#posee_serial").val("No").trigger("change");

  // Limpiar otros valores opcionales manualmente si es necesario
  $("#marca_producto").val("");
  $("#modelo_producto").val("");
  $("#serial_producto").val("");

  $("#tipo_conexion").val();
  $("#tipo_consumible").val();
  $("#tipo_tinta").val();
  $("#tamano_maximo").val();
  $("#resolucion_dpi").val();
  $("#posee_scanner_adf").val("No");
  $("#funciona_impresora").val("Si");
  $("#funciona_escaner").val("Si");

  // Configurar el botón maestro para creación
  $("#buttomMaster")
    .text("Guardar Consumibles")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#ConsumiblesModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaConsumibles').on("click", ".Editar", function (event) {
  event.preventDefault();

  const form = document.getElementById("formConsumibles");
  if (form) form.reset();

  $("#ModalLabel").text("Editar Consumibles");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#created").val($(this).data("id"));

  $('#formConsumibles').append('<input type="hidden" id="id_dispositivo" name="id_dispositivo">');
  $("#id_dispositivo").val($(this).data("id_dispositivo"));

  $("#created").val($(this).data("id"));

  // Lógica de Marca
  const poseeMarca = $(this).data("posee_marca");
  const id_marca = $(this).data("marca");
  $("#posee_marca").val(poseeMarca).trigger("change"); // trigger fuerza a que se muestre el input_marca
  if (poseeMarca == "Si") {

    selectModelos("marca_producto", "marcas", "marca", id_marca);

    $("#marca_producto").val($(this).data("marca"));
  }

  $("#es_original").val($(this).data("es_original"));
  $("#consumible").val($(this).data("tipo_consumible")).trigger("change");
  $("#cantidad_stock").val($(this).data("cantidad_stock"));
  $("#stock_minimo").val($(this).data("stock_minimo"));
  $("#modelo_consumible").val($(this).data("modelo_consumible"));
  $("#descripcion_consumible").val($(this).data("descripcion_consumible"));
  $("#cant_espacio").val($(this).data("cant_espacio"));
  $("#tipo_cable").val($(this).data("tipo_cable"));
  $("#tipo_RAM").val($(this).data("tipo_RAM"));
  $("#tipo_pasta").val($(this).data("tipo_pasta"));

  $("#potencia_watts").val($(this).data("potencia_watts"));
  $("#tipo_power").val($(this).data("tipo_power"));
  
  $("#tipo_tinta").val($(this).data("tipo_tinta"));


  // Cambiar el botón maestro para edición
  $("#buttomMaster")
    .text("Editar Consumibles")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#ConsumiblesModal").modal("show");
});

$('#tablaConsumibles').on("click", ".VerDetalles", function (event) {
  event.preventDefault();

  // Lectura de los data-attributes de la fila

  const es_original = $(this).data("es_original");

  // Asignación de valores en el Modal
  $("#det_id_consumible").text($(this).data("id_consumible"));
  $("#det_id_tipo_consumible").text($(this).data("id_tipo_consumible"));
  $("#det_es_original").text($(this).data("es_original"));
  $("#det_cantidad_stock").text($(this).data("cantidad_stock"));
  $("#det_stock_minimo").text($(this).data("stock_minimo"));
  $("#det_modelo_consumible").text($(this).data("modelo_consumible"));
  $("#det_descripcion_consumible").text($(this).data("descripcion_consumible"));
  $("#det_cant_espacio").text($(this).data("cant_espacio"));
  $("#det_tipo_cable").text($(this).data("tipo_cable"));
  $("#det_tipo_RAM").text($(this).data("tipo_RAM"));
  $("#det_tipo_pasta").text($(this).data("tipo_pasta"));
  $("#det_potencia_watts").text($(this).data("potencia_watts"));
  $("#det_tipo_power").text($(this).data("tipo_power"));
  $("#det_tipo_tinta").text($(this).data("tipo_tinta"));

  // Estado del Activo (Badge)
  if (es_original == "Orifinal" || es_original == "Generico") {
    $("#det_status")
      .text(es_original)
      .removeClass()
      .addClass("badge bg-success-subtle text-success fs-7");
  } else {
    $("#det_status")
      .text(es_original)
      .removeClass()
      .addClass("badge bg-warning-subtle text-warning fs-7");
  }
  // Apertura del modal
  $("#VerDetallesModal").modal("show");
});

// Evento para Operativo/Inoperativo o Desincorporar departamento
$('#tablaConsumibles').on("click", ".Toggle", function (event) {

  const id = $(this).data("id");
  const statusActual = $(this).data("status");

  ActionToggle(statusActual, id, consultarConsumibles);

})