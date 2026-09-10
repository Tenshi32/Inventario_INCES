function consultarConsumibles() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/tipo_consumibles/All", {
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

      if ($.fn.DataTable.isDataTable('#MyTableConsumibles')) {
        $('#MyTableConsumibles').DataTable().destroy();
      }

      lista.forEach(item => {

        optionEditar = `
          <a class="btn btn-outline-primary EditarConsumibles" 
           data-id="${item.id_tipo_consumible}"
           data-grupo_consumible="${item.grupo_consumible}"
           data-consumible="${item.consumible}" >
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger EliminarConsumibles" 
           data-id="${item.id_tipo_consumible}" >
           <i class="bi bi-trash "></i> 
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_tipo_consumible}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.consumible}</td>
                          <td class="text-secondary fw-medium">${item.grupo_consumible}</td>

                          <td class="pe-4 text-end">
                           
                            ${optionEditar}
                        
                          </td>
                        </tr>
                      `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableConsumibles');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomConsumible").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomConsumible").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "formConsumibles",
      "http://127.0.0.1:5000/tipo_consumibles/Editar",
      "PUT",
      consultarConsumibles
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "formConsumibles",
      "http://127.0.0.1:5000/tipo_consumibles/Crear",
      "POST",
      consultarConsumibles
    );
  }

  $("#ConsumiblesModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivConsumibles').on("click", "#CreateConsumibles", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formConsumibles");
  if (form) form.reset();

  $("#ModalLabelConsumible").text("Crear Consumible");

  // Forzar vaciado de inputs clave e hidden
  $("#id_consumible").val("");
  
  $("#consumible").val("");

  $("#grupo_consumible").val("");

  // Configurar el botón maestro para creación
  $("#buttomConsumible")
    .text("Guardar Consumible")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#ConsumiblesModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaConsumibles').on("click", ".EditarConsumibles", function (event) {
  event.preventDefault();

  const form = document.getElementById("formConsumibles");
  if (form) form.reset();

  $("#ModalLabelConsumible").text("Editar Consumible");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#id_consumible").val($(this).data("id"));

  $("#consumible").val($(this).data("consumible"));
  
  $("#grupo_consumible").val($(this).data("grupo_consumible"));

  // Cambiar el botón maestro para edición
  $("#buttomConsumible")
    .text("Editar Consumible")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#ConsumiblesModal").modal("show");
});

$('#tablaConsumibles').on("click", ".ToggleConsumibles", function (event) {
  event.preventDefault();

  const id = $(this).data("id");
  const statusActual = $(this).data("status");
  
  ActionToggleDatosMaestros(statusActual, id, consultarConsumibles, "tipo_consumibles", "id_tipo_dispositivo")

});