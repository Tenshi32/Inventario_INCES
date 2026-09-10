function consultarCategorias() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/tipo_dispositivos/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaCategorias");


      let contenido = "";

      if ($.fn.DataTable.isDataTable('#MyTableCategorias')) {
        $('#MyTableCategorias').DataTable().destroy();
      }

      
      lista.forEach(item => {
        
        icon = (item.estado_tipo_dispositivo == 1) ? '<i class="bi bi-toggle-off"></i> ' : '<i class="bi bi-toggle-on"></i> ';

        optionEditar = `
          <a class="btn btn-outline-primary EditarCategorias" 
           data-id="${item.id_tipo_dispositivo}"
           data-tipo_dispositivo="${item.tipo_dispositivo}" >
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger ToggleCategorias" 
           data-status="${item.estado_tipo_dispositivo}"
           data-id="${item.id_tipo_dispositivo}">
           ${icon}
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_tipo_dispositivo}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.tipo_dispositivo}</td>

                          <td class="pe-4 text-end">
                           

                                ${optionEditar}
                        
                          </td>
                        </tr>
                      `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableCategorias');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomCategoria").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomCategoria").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formCategorias",
      "http://127.0.0.1:5000/tipo_dispositivos/Editar",
      "PUT",
      consultarCategorias
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formCategorias",
      "http://127.0.0.1:5000/tipo_dispositivos/Crear",
      "POST",
      consultarCategorias
    );
  }

  $("#CategoriasModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivCategorias').on("click", "#CreateCategorias", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formCategorias");
  if (form) form.reset();

  $("#ModalLabelCategoria").text("Crear Categoria");

  // Forzar vaciado de inputs clave e hidden
  $("#id_tipo_dispositivo").val("");
  
  $("#tipo_dispositivo").val("");

  // Configurar el botón maestro para creación
  $("#buttomCategoria")
    .text("Guardar Categoria")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#CategoriasModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaCategorias').on("click", ".EditarCategorias", function (event) {
  event.preventDefault();

  const form = document.getElementById("formCategorias");
  if (form) form.reset();

  $("#ModalLabelCategoria").text("Editar Categoria");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#id_tipo_dispositivo").val($(this).data("id"));

  $("#tipo_dispositivo").val($(this).data("tipo_dispositivo"));


  // Cambiar el botón maestro para edición
  $("#buttomCategoria")
    .text("Editar Categoria")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#CategoriasModal").modal("show");
});


$('#tablaCategorias').on("click", ".ToggleCategorias", function (event) {
  event.preventDefault();

  const id = $(this).data("id");
  const statusActual = $(this).data("status");
  
  ActionToggleDatosMaestros(statusActual, id, consultarCategorias, "tipo_dispositivos", "id_tipo_dispositivo")

});


