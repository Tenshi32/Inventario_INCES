
//------------------PLUGINS DE DECORACION-----------------------//
function initializeTooltips(tooltipTriggerList) {
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

function initializeSelect2(selectId) {
  const select = document.getElementById(selectId);
  if (select) {
    $(select).select2({
      width: '100%',
    });
  }
}

function initializeDataTable(IDtable) {
  const table = $(IDtable).DataTable({
    pageLength: 5,
    ordering: true,
    responsive: true,
    // Forzamos a DataTables a SOLO renderizar la tabla ('t'). 
    // Quitamos los elementos por defecto ('l', 'f', 'i', 'p') ya que los manejamos nosotros.
    dom: 'tp',
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ switches",
      infoEmpty: "Mostrando 0 a 0 de 0 switches",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      loadingRecords: "Cargando...",
      zeroRecords: "No se encontraron resultados",
      emptyTable: "Ningún dato disponible en esta tabla",
      paginate: {
        first: "Primero",
        previous: '<i class="bi bi-chevron-left"></i>', // Icono moderno para anterior
        next: '<i class="bi bi-chevron-right"></i>',    // Icono moderno para siguiente
        last: "Último"
      }
    },


  });

  // Conectar tu input de búsqueda personalizado con el filtro de la tabla
  $('#searchTable').off('input').on('input', function () {
    if (this.value == "") {
      table.search("").draw(); // Limpia el filtro interno y redibuja todo
    } else {
      table.search(this.value).draw(); // Filtra normalmente
    }
  });

  $('#filtroEstado').off('change').on('change', function () {
    if (this.value == "") {
      table.column(5).search("").draw(); // Limpia el filtro interno y redibuja todo
    } else {
      table.column(5).search(this.value).draw();// Filtra normalmente
    }
  });
  

  $('#filtroTipo').off('change').on('change', function () {
    if (this.value == "") {
      table.column(1).search("").draw(); // Limpia el filtro interno y redibuja todo
    } else {
      table.column(1).search(this.value).draw();// Filtra normalmente
    }
  });

}

//--------------MENSAJE DE REPUESTA DEL SERVIDOR---------------//

//Metodo de repuesta del servidor con Toast
function initializeToast(message, estado) {

  const ToastIcon = (estado == "danger") ? "exclamation-triangle-fill" : "check-circle";

  const Toast = $("#MyToast")
  const ToartConted = `
        <div class="toast align-items-center bg-${estado} text-white border-0" role="alert" aria-live="assertive"
          aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body d-flex align-items-center">
              <i class="bi bi-${ToastIcon} me-2 fs-5"></i>
              <span>${message} </span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
              aria-label="Close"></button>
          </div>
        </div>`;

  const $nuevoToast = $(ToartConted).appendTo(Toast);

  let bootstrapToast = new bootstrap.Toast($nuevoToast[0], {
    delay: 4000,   // Tiempo en milisegundos (4 segundos)
    autohide: true // Asegura que se oculte automáticamente
  });

  bootstrapToast.show();

  $nuevoToast.on("hidden.bs.toast", function () {
    $(this).remove();
  })
}

//-------------FUNCIONES PARA ACCIONES DE CRUD-----------------//

// Accion para crear o editar cualquier Formulario
function ActionCreateEdit(IDForm, URL, Method, callback) {
  if (!$("#" + IDForm).valid()) return;

  const formSw = document.getElementById(IDForm);
  const formData = (formSw instanceof FormData) ? formSw : new FormData(formSw);

  let Form = {
    UrlControl: URL,
    Formulario: formData,
    Method: Method,
  };

  methodSend(Form, callback);
}

// Accion para cambiar de estado en cualquier dispositivo
function ActionToggle(statusActual, id, callback) {

  const nuevoStatus = (statusActual == 1) ? 2 : (statusActual == 2) ? 1 : 3;

  // Creamos el contenedor de datos manual
  const datosManuales = new FormData();

  datosManuales.append("id_dispositivo", id);
  datosManuales.append("status", nuevoStatus);

  const FormnDepa = {
    UrlControl: "http://127.0.0.1:5000/Dispositivos/Toggle",
    Formulario: datosManuales,
    Method: "PUT",
  };

  methodSend(FormnDepa, callback);
}


function ActionToggleDatosMaestros(statusActual, id, callback, EndPoint, campobd = null) {

  const nuevoStatus = (statusActual == 1) ? 2 : (statusActual == 2) ? 1 : 3;

  // Creamos el contenedor de datos manual
  const datosManuales = new FormData();

  datosManuales.append(campobd, id);
  datosManuales.append("id_status", nuevoStatus);

  const FormnDepa = {
    UrlControl: "http://127.0.0.1:5000/"+ EndPoint +"/Toggle",
    Formulario: datosManuales,
    Method: "PUT",
  };

  methodSend(FormnDepa, callback);
}

//---------FUNCIONES DE CAMPOS PARA DISPOSITIVOS---------------//

//Funcion para mostrar campos ocultos de Dispositivos
function PoseeCampos(IDselect, IDCampo, DivOculto) {

  const poseeMarca = $(IDselect).val();
  if (poseeMarca === "Si") {

    $(IDCampo).rules("add", {
      required: true
    });
    $(DivOculto).show();

  } else {

    $(IDCampo).rules("remove", "required");
    $(DivOculto).hide();

  }

}

//Funcion para validar el codigo y el serial del Dispositivo
function ValidacionUnico(id_campo, id_categoria) {

  const valorCampo = $(id_campo).val();
  const valorCategoria = $(id_categoria).val();

  if (valorCampo.length >= 3) {

    ValidationDispositivoRepetido(valorCampo, valorCategoria);

  }

}

//----------FUNCIONES DE STATUS Y OPCIONES---------------------//

//Funciones para establecer el "Status" del Dispositivo y sus Opciones en la consulta
function estadoBadge(status) {
  if (status === 1) return 'bg-success';
  if (status === 2) return 'bg-warning';
  return 'bg-danger';

}

function optionsActiosUsuario(item, textoAccion, optionEditar) {
  icon = (item.id_status == 1) ? '<i class="bi bi-toggle-off"></i> ' : '<i class="bi bi-toggle-on"></i> ';

  if (item.id_status !== 3) {

    console.log(item)

    let optionAction = `
    <div class="dropdown d-inline-block" style="cursor:pointer;">
      <button class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-bs-toggle="dropdown" aria-expanded="false" style="border: none; background: transparent;">
        <i class="bi bi-three-dots-vertical fs-5 text-muted"></i>
      </button>
      <div class="dropdown-menu dropdown-menu-end shadow-sm border-0">
     
        ${optionEditar}

        <div class="dropdown-divider border-gray-100"></div>
          <a class="dropdown-item Toggle text-info py-1" 
            data-id="${item.cedula}"
            data-status="${item.status_usuario}" >
            ${icon} ${textoAccion}
          </a >

          <a class="dropdown-item Toggle text-danger py-1"
            data-id="${item.cedula}"
            data-status="3">
            <i class="bi bi-trash"></i> Desincorporar
          </a>
      </div>
    </div>
    `

    return optionAction;

  } else {

    return '';

  }

}

function optionsActios(item, textoAccion, optionEditar) {

  icon = (item.id_tipo_status == 1) ? '<i class="bi bi-toggle-off"></i> ' : '<i class="bi bi-toggle-on"></i> ';

  if (item.id_tipo_status !== 3) {

    console.log(item)

    let optionAction = `
    <div class="dropdown d-inline-block" style="cursor:pointer;">
      <button class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-bs-toggle="dropdown" aria-expanded="false" style="border: none; background: transparent;">
        <i class="bi bi-three-dots-vertical fs-5 text-muted"></i>
      </button>
      <div class="dropdown-menu dropdown-menu-end shadow-sm border-0">
     
        ${optionEditar}

        <div class="dropdown-divider border-gray-100"></div>
          <a class="dropdown-item Toggle text-info py-1" 
            data-id="${item.id_dispositivo}"
            data-status="${item.id_tipo_status}" >
            ${icon} ${textoAccion}
          </a >

          <a class="dropdown-item Toggle text-danger py-1"
            data-id="${item.id_dispositivo}"
            data-status="3">
            <i class="bi bi-trash"></i> Desincorporar
          </a>
      </div>
    </div>
    `

    return optionAction;

  } else {

    return '';

  }

}

//----------------FUNCIONES PRIMCIPALES----------------------//

//metodo para actualizar informacion
function methodSend(Obj, callback = null) {
  event.preventDefault();

  const data = Obj["Formulario"]

  fetch(Obj["UrlControl"], {
    method: Obj["Method"],
    body: data,
  })

    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.status == true) {

        initializeToast(data.mensaje, "success");

        // Si pasamos una función, la ejecutamos ahora
        if (callback && typeof callback === "function") {
          callback();
        }

      } else if (data.status == false) {

        initializeToast(data.mensaje, "danger");

      } else {

        initializeToast(data.mensaje, "danger");

      }
    })

    .catch((error) => {

      initializeToast("No se pudo conectar con el servidor" + error, "danger");
      console.error("Error:", error);

    });

  return true;
}

// Función para cargar el contenido
async function loadContent(pageName, elementClicked = null) {

  const contentArea = $("#content-area");

  if (elementClicked) {

    $(".nav-link").removeClass("active");
    elementClicked.closest(".nav-link").addClass("active");

  }

  const loader = $("#loader-overlay");
  loader.fadeIn(200);

  // 1. Validación de seguridad
  /*     const regex = /^[a-zA-Z0-9\-\/]+$/;
      if (!regex.test(pageName)) {
          pageName = "../public/404";
      } */

  // 2. Construir la ruta (Ajusta la ruta a tu carpeta de páginas)
  const filepath = `${pageName}.html`;

  // 3. Simular el "include" usando fetch
  try {

    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await fetch(filepath);

    if (response.ok) {

      const html = await response.text();
      contentArea.hide().html(html).fadeIn(500);

    } else {

      throw new Error("Página no encontrada");

    }

  } catch (error) {

    // Equivalente al include del 404.php
    $.get("404.php", function (data) {
      contentArea.html(data);
    });

  } finally {
    // 2. Ocultar el loader SIEMPRE (haya error o no)
    loader.fadeOut(300);
  }
}

//---------------------------------------------------------------//

function actualizarContador(input, selectorCounter) {
  const max = input.getAttribute('maxlength');
  const actual = input.value.length;
  const restantes = max - actual;
  document.querySelector(selectorCounter).textContent = `${restantes}/${max}`;
}

function ValidationDispositivoRepetido(valor, tipo_dispositivo) {

  const url = "http://localhost:5000/Dispositivos/ExistenciaDispositivo?valorBuscar=" + valor + "&tipo_dispositivo=" + tipo_dispositivo;

  fetch(url, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      if (data != null) {

        initializeToast("El Código o Serial de activo ya Existe.", "danger");

      }

    })
    .catch(error => {

      initializeToast("Hubo un problema con la consulta:" + error, "danger");
      console.error("Hubo un problema con la consulta:", error);

    });
}

function togglepassword() {
  var password = document.getElementById("Passwd");
  var confirm_password = document.getElementById("PasswdConfirm");
  if (password.type === "password") {
    password.type = "text";
    confirm_password.type = "text";
  } else {
    confirm_password.type = "password";
    password.type = "password";
  }
}

function selectModelos(selectId, nameTable, nameColumn, ValorSelected = null) {
  // 1. URL de tu servidor Flask
  const url = "http://127.0.0.1:5000/" + nameTable + "/All";

  fetch(url, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      const select = document.getElementById(selectId);

      let contenido = '<option value="1">Seleccione una opcion</option>';

      // Convertimos el objeto en array
      const lista = Object.values(data);

      console.log(ValorSelected)

      lista.forEach(item => {
        // Manejo de estados (Activo/Inactivo)

        let textoAccion = "id_" + nameTable;
        if (ValorSelected && ValorSelected == item[textoAccion]) {

          contenido += `
          <option value="${item[textoAccion]}" selected>${item[nameColumn]}</option>
          `;

        } else {

          contenido += `
          <option value="${item[textoAccion]}">${item[nameColumn]}</option>
          `;

        }
      });

      // Inyectamos las filas
      select.innerHTML = contenido;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function selectDependiente(selectId, nameTable, nameColumn, idForeignKey1) {
  // 1. URL de tu servidor Flask
  const url = "http://127.0.0.1:5000/" + nameTable + "/ForDivice?marca=" + idForeignKey1;

  fetch(url, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      const select = document.getElementById(selectId);

      let contenido = "";

      // Convertimos el objeto en array
      const lista = Object.values(data);

      lista.forEach(item => {
        // Manejo de estados (Activo/Inactivo)

        let textoAccion = (item.status !== "Operativo") ? 'Operativo' : 'Inoperativo';

        contenido += `
                <option value="${item.id_ + nameTable}">${item[nameColumn]}</option>
            `;
      });

      // Inyectamos las filas
      select.innerHTML = contenido;

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}
