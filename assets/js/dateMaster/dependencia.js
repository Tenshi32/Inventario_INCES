function consultarDepartamentos() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/dependencia/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaDepartamentos");


      let contenido = "";

      if ($.fn.DataTable.isDataTable('#MyTableDepartamentos')) {
        $('#MyTableDepartamentos').DataTable().destroy();
      }

      lista.forEach(item => {
        
        icon = (item.activo == 1) ? '<i class="bi bi-toggle-off"></i> ' : '<i class="bi bi-toggle-on"></i> ';

        optionEditar = `
          <a class="btn btn-outline-primary EditarDepartamentos" 
           data-id="${item.id_dependencia}"
           data-codigo="${item.codigo}"
           data-id_piso="${item.id_piso}"
           data-id_estado="${item.id_estado}"
           data-dependencia="${item.dependencia}" >
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger ToggleDepartamentos" 
           data-status="${item.activo}" 
           data-id="${item.id_dependencia}" >
           ${icon} 
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.codigo}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.dependencia}</td>
                          <td class="text-secondary fw-medium">${item.piso}</td>

                          <td class="pe-4 text-end">
                           

                                ${optionEditar}
                        
                          </td>
                        </tr>
                      `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableDepartamentos');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomDepartamento").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomDepartamento").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formDepartamentos",
      "http://127.0.0.1:5000/dependencia/Editar",
      "PUT",
      consultarDepartamentos
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formDepartamentos",
      "http://127.0.0.1:5000/dependencia/Crear",
      "POST",
      consultarDepartamentos
    );
  }

  $("#DepartamentosModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivDepartamentos').on("click", "#CreateDepartamentos", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formDepartamentos");
  if (form) form.reset();

  $("#ModalLabelDepartamento").text("Crear Departamento");

  // Forzar vaciado de inputs clave e hidden
  $("#id_dependencia").val("");
  
  $("#codigo").val("");

  $("#dependencia").val("");

  $("#id_piso").val("");

  $("#estado_dependencia").val("");

  // Configurar el botón maestro para creación
  $("#buttomDepartamento")
    .text("Guardar Departamento")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#DepartamentosModal").modal("show");
});

function consultarEstados() {

  fetch("http://127.0.0.1:5000/estados/All", {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la red");
      return response.json();
    })
    .then(data => {

      // 3. Guardar en sessionStorage transformando el JSON a string
      sessionStorage.setItem("estadosData", JSON.stringify(data));

    })
    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

function SelectEstados() {

  const datosGuardados = sessionStorage.getItem("estadosData")

  const data = JSON.parse(datosGuardados);

  const lista = Object.values(data);
  let contenido = ``;

  lista.forEach(item => {

    contenido += `
      <option value="${item.id_estado}">${item.estado}</option>
    `;

  });

  document.getElementById("estado_dependencia").innerHTML = contenido;

}

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaDepartamentos').on("click", ".EditarDepartamentos", function (event) {
  event.preventDefault();

  const form = document.getElementById("formDepartamentos");
  if (form) form.reset();

  $("#ModalLabelDepartamento").text("Editar Departamento");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#id_dependencia").val($(this).data("id"));

  $("#codigo").val($(this).data("codigo"));

  $("#dependencia").val($(this).data("dependencia"));

  $("#id_piso").val($(this).data("id_piso"));

  $("#estado_dependencia").val($(this).data("id_estado"));

  // Cambiar el botón maestro para edición
  $("#buttomDepartamento")
    .text("Editar Departamento")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#DepartamentosModal").modal("show");
});

$('#tablaDepartamentos').on("click", ".ToggleDepartamentos", function (event) {
  event.preventDefault();

  const id = $(this).data("id");
  const statusActual = $(this).data("status");
  
  ActionToggleDatosMaestros(statusActual, id, consultarDepartamentos, "dependencia", "id_dependencia")

});
