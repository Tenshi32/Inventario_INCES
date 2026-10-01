function consultarEstTrabajo() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/EstacionesTrabajo/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaEstTrabajo");

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
        ultimoCodigo = lista[lista.length - 1].id_es_trabajo;
      }

      lista.forEach(item => {

        if (item.en_red == "No") {
          // Asumiendo que el último elemento del array es el más reciente
          EnRed = "Sin Punto de Red";
        } else {
          EnRed = "Con Punto de Red";
        }


        optionEditar = `
          <a class="dropdown-item py-2 Editar text-primary" 
           data-id="${item.id_es_trabajo}"

           data-id_usuario="${item.id_usuario}"
           
           data-cd_pc="${item.cd_pc}"
           data-cd_monitor="${item.cd_monitor}"
           data-cd_mouse="${item.cd_mouse}"
           data-cd_teclado="${item.cd_teclado}"
           data-posee_regulador="${item.posee_regulador}"
           data-cd_regulador="${item.cd_regulador}"
           data-posee_corneta="${item.posee_corneta}"
           data-cd_corneta="${item.cd_corneta}"

           data-tipo_so="${item.tipo_so}"
           data-tipo_particion="${item.tipo_particion}"
           data-tipo_distribucion="${item.tipo_distribucion}"
           data-arquitectura="${item.arquitectura}"
           data-es_dual_boot="${item.es_dual_boot}"
           data-segundo_so="${item.segundo_so}"
           data-programas="${item.programas}"
           

           <i class="bi bi-pencil me-2"></i>Editar 
          </a>
        `

        optionVerDetalles = `
          <a class="dropdown-item py-2 VerDetalles text-primary" 
           data-id="${item.id_es_trabajo}"

           data-id_usuario="${item.id_usuario}"
           
           data-cd_pc="${item.cd_pc}"
           data-cd_monitor="${item.cd_monitor}"
           data-cd_mouse="${item.cd_mouse}"
           data-cd_teclado="${item.cd_teclado}"
           data-posee_regulador="${item.posee_regulador}"
           data-cd_regulador="${item.cd_regulador}"
           data-posee_corneta="${item.posee_corneta}"
           data-cd_corneta="${item.cd_corneta}"

           data-tipo_so="${item.tipo_so}"
           data-tipo_particion="${item.tipo_particion}"
           data-tipo_distribucion="${item.tipo_distribucion}"
           data-arquitectura="${item.arquitectura}"
           data-es_dual_boot="${item.es_dual_boot}"
           data-segundo_so="${item.segundo_so}"
           data-programas="${item.programas}"
           

           <i class="bi bi-eye me-2"></i>Ver Detalles 
          </a>
        `

        optionesConsulta = optionVerDetalles + optionEditar

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_es_trabajo}</span>
                          </td>

                          <td class="text-secondary fw-medium">CI ${item.cedula} <br> ${item.nombre} ${item.apellido}</td>

                          <td>
                            <span class="badge bg-light text-dark border border-gray-200">${item.tipo_distribucion} ${item.arquitectura}</span>
                          </td>

                          <td class=" font-monospace small">
                            ${item.cd_pc}. 
                            <i class="bi bi-copy" 
                               style="cursor: pointer;" 
                               data-bs-toggle="tooltip" 
                               data-bs-placement="top" 
                               title="Copiado" 
                               onclick="copiarTexto('${item.cd_pc}', this)"></i>
                          </td>

                          <td>
                            <code class="text-primary-emphasis bg-primary-subtle px-2 py-1 rounded small font-monospace">
                              ${EnRed}
                            </code>
                          </td>

                          <td class="pe-4 text-end">
                           

                                ${optionsActios(item, "", optionesConsulta)}
                        
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

function copiarTexto(valor, elemento) {
  // 1. Copiar al portapapeles
  navigator.clipboard.writeText(valor).then(() => {
    
    // 2. Cambiar icono a check verde
    elemento.classList.remove('bi-copy');
    elemento.classList.add('bi-check-lg', 'text-success');

    // 3. Mostrar el tooltip con el texto "¡Copiado!"
    let tooltip = bootstrap.Tooltip.getInstance(elemento);
    if (!tooltip) {
      tooltip = new bootstrap.Tooltip(elemento);
    }
    
    tooltip.setContent({ '.tooltip-inner': '¡Copiado!' });
    tooltip.show();

    // 4. Restaurar el estado original a los 1.5 segundos
    setTimeout(() => {
      elemento.classList.remove('bi-check-lg', 'text-success');
      elemento.classList.add('bi-copy');
      tooltip.setContent({ '.tooltip-inner': elemento.getAttribute('title') });
      tooltip.hide();
    }, 3000);

  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
}

$(document).on("change", "#marca_producto", function () {

  const marcaId = $(this).val();
  selectDependiente("modelo_producto", "modelos", "modelo", marcaId);

})

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
      let textoStatus = (item.status_usuario === "1") ? 'Activo' : 'Inactivo';

      contenido = `
                    <div class="card card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold fs-6">${item.nombre} ${item.apellido || ''}</span> 
                        <span class="badge ${item.status_usuario === "1" ? 'bg-success' : 'bg-danger'}">
                          ${textoStatus}
                        </span>
                        </div>
                        <div><strong>Correo:</strong> ${item.correo || 'S/C'} </div>
                        <div><strong>Cargo:</strong> ${item.cargo} </div>
                      </div>
                      
                    </div>
                  `;

      // Inyectamos las filas
      tabla.innerHTML = contenido;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function BuscarDispositivos(campo, valor, tabla) {

  fetch("http://localhost:5000/Dispositivos/RatrearEstTrabajo?valorBuscar=" + campo.value + "&tipoCategoria=" + valor, {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const item = data;

      console.log(item);
      let contenido = "";

      contenido = `
                    <div class="card card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold fs-6"> ${item.cd_dispositivo}</span>
                        <span class="badge ${item.id_status === 1 ? 'bg-success' : 'bg-danger'}">
                          ${item.statu}
                        </span>
                      </div>

                      <input type="hidden" id="id_${valor}" name="id_${valor}" value="${item.id_dispositivo}">
                      <div>Marca : <strong>${item.marca} / ${item.modelo}</strong></div>
                      <div>Serial : <strong>${item.serial} </strong></div>

                      <div>
                        descripcion : <strong>${item.descripcion_general}</strong>
                        <br>
                        observaciones : <strong>${item.observaciones_tecnicas}</strong>
                      </div>
                    </div>
                  `;
      // Inyectamos las filas
      tabla.innerHTML = contenido;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

$(document).ready(function () {

  //selectModelos("marca_producto", "marcas", "marca");

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  initializeDataTable("#MyTable")

  $("#formEstTrabajo").validate({

    rules: {
      // 1. Detalles del Usuario y Componentes Principales
      id_usuario: {
        required: true
      },
      cd_cpu: {
        required: true
      },
      cd_monitor: {
        required: true
      },
      cd_mouse: {
        required: true
      },
      cd_teclado: {
        required: true
      },

      // Selects de Pregunta (Regulador / Corneta)
      posee_regulador: {
        required: true
      },
      posee_corneta: {
        required: true
      },

      // Campos Condicionales (Solo obligatorios si la opción seleccionada es "Si")
      cd_regulador: {
        required: function (element) {
          return $("#posee_regulador").val() === "Si";
        }
      },
      cd_corneta: {
        required: function (element) {
          return $("#posee_corneta").val() === "Si";
        }
      },

      // 2. Detalles del Software
      tipo_so: {
        required: true
      },
      arquitectura: {
        required: true
      },
      tipo_distribucion: {
        required: true
      },
      es_dual_boot: {
        required: true
      },
      segundo_so: {
        required: function (element) {
          return $("#es_dual_boot").val() === "Si";
        }
      },
      programas: {
        required: false // Opcional
      }
    },

    messages: {

      // 1. Detalles del Usuario y Componentes
      id_usuario: {
        required: "Debe ingresar y buscar la cédula del usuario"
      },
      cd_cpu: {
        required: "El código/serial del CPU es obligatorio"
      },
      cd_monitor: {
        required: "El código/serial del monitor es obligatorio"
      },
      cd_mouse: {
        required: "El código/serial del mouse es obligatorio"
      },
      cd_teclado: {
        required: "El código/serial del teclado es obligatorio"
      },

      // Selects de Pregunta
      posee_regulador: {
        required: "Indique si posee regulador"
      },
      posee_corneta: {
        required: "Indique si posee corneta"
      },

      // Campos Condicionales
      cd_regulador: {
        required: "Ingrese el código o serial del regulador"
      },
      cd_corneta: {
        required: "Ingrese el código o serial de la corneta"
      },

      // 2. Detalles del Software
      tipo_so: {
        required: "Seleccione el tipo de sistema operativo"
      },
      arquitectura: {
        required: "Seleccione la arquitectura del sistema"
      },
      tipo_distribucion: {
        required: "Indique la distribución del SO (Ej: Windows 10)"
      },
      es_dual_boot: {
        required: "Indique si el equipo es Dual Boot"
      },
      segundo_so: {
        required: "Especifique el segundo sistema operativo"
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

  consultarEstTrabajo()

});

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#formEstTrabajo").on("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomMaster").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formEstTrabajo",
      "http://127.0.0.1:5000/EstacionesTrabajo/Editar",
      "PUT",
      consultarEstTrabajo
    );

    $("#EstTrabajoModal").modal("hide");

  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formEstTrabajo",
      "http://127.0.0.1:5000/EstacionesTrabajo/Crear",
      "POST",
      consultarEstTrabajo
    );
  }


});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivEstTrabajo').on("click", "#openCreate", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formEstTrabajo");
  if (form) form.reset();

  $("#ModalLabel").text("Crear Estaciones de Trabajo");

  // Forzar vaciado de inputs clave e hidden
  $("#created").val("");
  $('#formEstTrabajo').parent("#id_dispositivo").remove()

  // Forzar que los selectores condicionales vuelvan a "No" y disparar su evento
  $("#posee_regulador").val("No").trigger("change");
  $("#posee_corneta").val("No").trigger("change");


  $("#id_usuario").val("");
  $("#cd_cpu").val("");
  $("#cd_monitor").val("");
  $("#cd_mouse").val("");
  $("#cd_teclado").val("");
  $("#cd_regulador").val("");
  $("#cd_corneta").val("");

  document.getElementById("datosUsuario").innerHTML = "";
  document.getElementById("datosCPU").innerHTML = "";
  document.getElementById("datosMonitor").innerHTML = "";
  document.getElementById("datosMouse").innerHTML = "";
  document.getElementById("datosTeclado").innerHTML = "";
  document.getElementById("datosRegulador").innerHTML = "";
  document.getElementById("datosCorneta").innerHTML = "";

  $("#tipo_so").val("Privado");
  $("#tipo_particion").val();
  $("#tipo_distribucion").val();
  $("#arquitectura").val("64-bit");
  $("#es_dual_boot").val("No").trigger("change");
  $("#segundo_so").val();
  $("#programas").val();

  // Configurar el botón maestro para creación
  $("#buttomMaster")
    .text("Guardar")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#EstTrabajoModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaEstTrabajo').on("click", ".Editar", function (event) {
  event.preventDefault();

  const form = document.getElementById("formEstTrabajo");
  if (form) form.reset();

  $("#ModalLabel").text("Editar Estaciones de Trabajo");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#created").val($(this).data("id"));

  $("#id_usuario").val($(this).data("id_usuario"));
  $("#SearchUser").trigger("onclick");

  $("#cd_cpu").val($(this).data("cd_pc"));
  $("#SearchCPU").trigger("onclick");

  $("#cd_monitor").val($(this).data("cd_monitor"));
  $("#SearchMonitor").trigger("onclick");

  $("#cd_mouse").val($(this).data("cd_mouse"));
  $("#SearchMouse").trigger("onclick");

  $("#cd_teclado").val($(this).data("cd_teclado"));
  $("#SearchTeclado").trigger("onclick");

  const posee_regulador = $(this).data("posee_regulador");
  $("#posee_regulador").val(posee_regulador).trigger("change"); // trigger fuerza a que se muestre el input_serial
  if (posee_regulador == "Si") {

    $("#cd_regulador").val($(this).data("cd_regulador"));
    $("#SearchRegulador").trigger("onclick");

  }

  const posee_corneta = $(this).data("posee_corneta");
  $("#posee_corneta").val(posee_corneta).trigger("change"); // trigger fuerza a que se muestre el input_serial
  if (posee_corneta == "Si") {

    $("#cd_corneta").val($(this).data("cd_corneta"));
    $("#SearchCorneta").trigger("onclick");

  }


  $("#id_softwares").val($(this).data("id_softwares"));
  $("#tipo_so").val($(this).data("tipo_so"));
  $("#tipo_particion").val($(this).data("tipo_particion"));
  $("#tipo_distribucion").val($(this).data("tipo_distribucion"));
  $("#arquitectura").val($(this).data("arquitectura"));

  $("#es_dual_boot").val($(this).data("es_dual_boot"));
  // Lógica de Serial
  const esDualBoot = $(this).data("es_dual_boot");
  $("#es_dual_boot").val(esDualBoot).trigger("change"); // trigger fuerza a que se muestre el input_serial
  if (esDualBoot == "Si") {
    $("#segundo_so").val($(this).data("segundo_so"));
  }

  $("#programas").val($(this).data("programas"));

  // Cambiar el botón maestro para edición
  $("#buttomMaster")
    .text("Editar")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#EstTrabajoModal").modal("show");
});

// Evento para Operativo/Inoperativo o Desincorporar departamento
$('#tablaEstTrabajo').on("click", ".VerDetalles", function (event) {

 event.preventDefault();

  $("#id_usuario_ver").text($(this).data("id_usuario"));


  $("#cd_cpu_ver").text($(this).data("cd_pc"));
  BuscarDispositivos($(this).data("cd_pc"), 20, $("#datosCPU_ver"));

  $("#cd_monitor_ver").text($(this).data("cd_monitor"));
  BuscarDispositivos($(this).data("cd_monitor"), 17, $("#datosMonitor_ver"));

  $("#cd_mouse_ver").text($(this).data("cd_mouse"));
  BuscarDispositivos($(this).data("cd_mouse"), 18, $("#datosMouse_ver"));

  $("#cd_teclado_ver").text($(this).data("cd_teclado"));
  BuscarDispositivos($(this).data("cd_teclado"), 19, $("#datosTeclado_ver"));

  /*$("#id_softwares").val($(this).data("id_softwares"));
  $("#tipo_so").val($(this).data("tipo_so"));
  $("#tipo_particion").val($(this).data("tipo_particion"));
  $("#tipo_distribucion").val($(this).data("tipo_distribucion"));
  $("#arquitectura").val($(this).data("arquitectura"));

  $("#es_dual_boot").val($(this).data("es_dual_boot"));
  // Lógica de Serial
  const esDualBoot = $(this).data("es_dual_boot");
  $("#es_dual_boot").val(esDualBoot).trigger("change"); // trigger fuerza a que se muestre el input_serial
  if (esDualBoot == "Si") {
    $("#segundo_so").val($(this).data("segundo_so"));
  }

  $("#programas").val($(this).data("programas"));*/

  // Abrir el modal de forma segura
  $("#EstTrabajoVerDetalles").modal("show");

})