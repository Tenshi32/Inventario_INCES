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

        optionEditar = `
          <a class="btn btn-outline-primary EditarDepartamentos" 
           data-id="${item.id_dependencia}"
           data-codigo="${item.codigo}"
           data-id_piso="${item.id_piso}"
           data-id_estado="${item.id_estado}"
           data-departamento="${item.dependencia}" >
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger ToggleDepartamentos" 
           data-id="${item.id_dependencia}" >
           <i class="bi bi-trash "></i> 
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
      "buttomDepartamento",
      "formDepartamentos",
      "http://127.0.0.1:5000/dependencia/Editar",
      "PUT",
      consultarDepartamentos
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "buttomDepartamento",
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
  $("#createdDepartamento").val("");
  
  $("#codigoDepa").val("");

  $("#departamento").val("");

  $("#id_piso_depa").val("");

  // Configurar el botón maestro para creación
  $("#buttomDepartamento")
    .text("Guardar Departamento")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#DepartamentosModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaDepartamentos').on("click", ".EditarDepartamentos", function (event) {
  event.preventDefault();

  const form = document.getElementById("formDepartamentos");
  if (form) form.reset();

  $("#ModalLabelDepartamento").text("Editar Departamento");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#createdDepartamento").val($(this).data("id"));

  $("#codigoDepa").val($(this).data("codigo"));

  $("#departamento").val($(this).data("departamento"));

  $("#id_piso_depa").val($(this).data("id_piso"));

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
