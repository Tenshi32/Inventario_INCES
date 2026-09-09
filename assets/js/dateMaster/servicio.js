function consultarServicios() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/tipo_servicios/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaServicios");


      let contenido = "";

      if ($.fn.DataTable.isDataTable('#MyTableServicios')) {
        $('#MyTableServicios').DataTable().destroy();
      }

      lista.forEach(item => {

        optionEditar = `
          <a class="btn btn-outline-primary EditarServicios" 
           data-id="${item.id_tipo_servicios}"
           data-servicio="${item.servicio}" >
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger EliminarServicios" 
           data-status="${item.estado_servicio}" 
           data-id="${item.id_tipo_servicios}" >
           <i class="bi bi-trash "></i> 
          </a>
          `

        contenido += `
          <tr class="border-bottom border-gray-100">
            <td class="ps-4 py-3">
              <span class=" fw-bold fs-6">${item.id_tipo_servicios}</span>
            </td>

            <td class="text-secondary fw-medium">${item.servicio}</td>

            <td class="pe-4 text-end">
             
              ${optionEditar}
          
            </td>
          </tr>
        `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableServicios');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomServicio").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomServicio").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "buttomServicio",
      "formServicios",
      "http://127.0.0.1:5000/tipo_servicios/Editar",
      "PUT",
      consultarServicios
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "buttomServicio",
      "formServicios",
      "http://127.0.0.1:5000/tipo_servicios/Crear",
      "POST",
      consultarServicios
    );
  }

  $("#ServiciosModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivServicios').on("click", "#CreateServicios", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formServicios");
  if (form) form.reset();

  $("#ModalLabelServicio").text("Crear Servicio");

  // Forzar vaciado de inputs clave e hidden
  $("#createdServicio").val("");
  
  $("#servicio").val("");

  // Configurar el botón maestro para creación
  $("#buttomServicio")
    .text("Guardar Servicio")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#ServiciosModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaServicios').on("click", ".EditarServicios", function (event) {
  event.preventDefault();

  const form = document.getElementById("formServicios");
  if (form) form.reset();

  $("#ModalLabelServicio").text("Editar Servicio");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#createdServicio").val($(this).data("id"));

  $("#servicio").val($(this).data("servicio"));
  
  // Cambiar el botón maestro para edición
  $("#buttomServicio")
    .text("Editar Servicio")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#ServiciosModal").modal("show");
});

$('#tablaServicios').on("click", ".EliminarServicios", function (event) {
  event.preventDefault();

  const id = $(this).data("id");
  const statusActual = $(this).data("status");
  
  ActionToggleDatosMaestros(statusActual, id, consultarServicios, "tipo_servicios", "id_tipo_servicios")

});
