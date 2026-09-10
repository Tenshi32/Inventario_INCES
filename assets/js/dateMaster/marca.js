function consultarMarcas() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/marcas/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaMarcas");


      let contenido = "";

      if ($.fn.DataTable.isDataTable('#MyTableMarcas')) {
        $('#MyTableMarcas').DataTable().destroy();
      }

      lista.forEach(item => {

        icon = (item.estado_marca == 1) ? '<i class="bi bi-toggle-off"></i> ' : '<i class="bi bi-toggle-on"></i> ';

        optionEditar = `
          <a class="btn btn-outline-primary EditarMarcas" 
           data-id="${item.id_marcas}"
           data-marca="${item.marca}">
           <i class="bi bi-pencil "></i> 
          </a>
          <a class="btn btn-outline-danger ToggleMarcas" 
           data-status="${item.estado_marca}"
           data-id="${item.id_marcas}"> 
           ${icon}
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_marcas}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.marca}</td>

                          <td class="pe-4 text-end">
                           
                            ${optionEditar}

                          </td>
                        </tr>
                      `;
      });

      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableMarcas');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomMarca").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomMarca").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formMarcas",
      "http://127.0.0.1:5000/marcas/Editar",
      "PUT",
      consultarMarcas
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formMarcas",
      "http://127.0.0.1:5000/marcas/Crear",
      "POST",
      consultarMarcas
    );
  }

  $("#MarcasModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivMarcas').on("click", "#CreateMarcas", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formMarcas");
  if (form) form.reset();

  $("#ModalLabelMarca").text("Crear Marca");

  // Forzar vaciado de inputs clave e hidden
  $("#id_Marca").val("");
  
  $("#marca").val("");

  // Configurar el botón maestro para creación
  $("#buttomMarca")
    .text("Guardar Marca")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#MarcasModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaMarcas').on("click", ".EditarMarcas", function (event) {
  event.preventDefault();

  const form = document.getElementById("formMarcas");
  if (form) form.reset();

  $("#ModalLabelMarca").text("Editar Marca");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#id_marcas").val($(this).data("id"));

  $("#marca").val($(this).data("marca"));

  // Cambiar el botón maestro para edición
  $("#buttomMarca")
    .text("Editar Marca")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#MarcasModal").modal("show");
});

$('#tablaMarcas').on("click", ".ToggleMarcas", function (event) {
  event.preventDefault();

  const id = $(this).data("id");
  const statusActual = $(this).data("status");
  
  ActionToggleDatosMaestros(statusActual, id, consultarMarcas, "marcas", "id_marcas")

});
