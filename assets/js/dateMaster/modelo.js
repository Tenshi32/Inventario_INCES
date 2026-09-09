function consultarModelos() {
  // 1. URL de tu servidor Flask
  fetch("http://localhost:5000/modelos/All", {
    method: "GET",
  })
    .then(response => {

      if (!response.ok) throw new Error("Error en la red");
      return response.json();

    })
    .then(data => {

      const lista = Object.values(data);
      const tabla = document.getElementById("tablaModelos");


      let contenido = "";

      if ($.fn.DataTable.isDataTable('#MyTableModelos')) {
        $('#MyTableModelos').DataTable().destroy();
      }

      lista.forEach(item => {

        optionEditar = `
          <a class="btn btn-outline-primary EditarModelos" 
           data-id="${item.id_modelos}"
           data-modelo="${item.modelo}"
           data-id_marca="${item.id_marca}">
           <i class="bi bi-pencil"></i> 
          </a>

          <a class="btn btn-outline-danger EliminarModelos" 
           data-id="${item.id_modelos}" >
           <i class="bi bi-trash "></i> 
          </a>
          `

        contenido += `
                        <tr class="border-bottom border-gray-100">
                          <td class="ps-4 py-3">
                            <span class=" fw-bold fs-6">${item.id_modelos}</span>
                          </td>

                          <td class="text-secondary fw-medium">${item.modelo}</td>

                          <td>
                            <span class="badge bg-light text-dark border border-gray-200">${item.marca}</span>
                          </td>

                          <td class="pe-4 text-end">
                           

                                ${optionEditar}
                        
                          </td>
                        </tr>
                      `;
      });
      // Inyectamos las filas
      tabla.innerHTML = contenido;

      initializeDataTable('#MyTableModelos');
    })

    .catch(error => {
      console.error("Hubo un problema con la consulta:", error);
    });
}

// ==========================================
// CONTROLADOR ÚNICO DE ENVÍO (CREAR / EDITAR)
// ==========================================
$("#buttomModelo").on("click", function (event) {

  event.preventDefault(); // Evita que la página se recargue
  
  // Obtenemos la acción actual del botón maestro
  const accion = $("#buttomModelo").attr("action");

  if (accion === "edit") {
    // Acción para EDITAR
    ActionCreateEdit(
      "buttomModelo",
      "formModelos",
      "http://127.0.0.1:5000/modelos/Editar",
      "PUT",
      consultarModelos
    );
  } else {
    // Acción por defecto: CREAR (incluso si action no está definido aún)
    ActionCreateEdit(
      "buttomModelo",
      "formModelos",
      "http://127.0.0.1:5000/modelos/Crear",
      "POST",
      consultarModelos
    );
  }

  $("#ModelosModal").modal("hide");

});

// ==========================================
// 1. EVENTO PARA NUEVO REGISTRO (CREAR)
// ==========================================
$('#DivModelos').on("click", "#CreateModelos", function (event) {
  // Resetear el formulario completamente
  const form = document.getElementById("formModelos");
  if (form) form.reset();

  $("#ModalLabelModelo").text("Crear Modelo");

  // Forzar vaciado de inputs clave e hidden
  $("#createdModelo").val("");
  
  $("#marca").val("");
  $("#modelo").val("");

  // Configurar el botón maestro para creación
  $("#buttomModelo")
    .text("Guardar Modelo")
    .removeClass("btn-warning")
    .addClass("btn-primary").attr("action", "create");

  $("#ModelosModal").modal("show");
});

// ==========================================
// 2. EVENTO PARA LLENAR EL FORMULARIO (EDITAR)
// ==========================================
$('#tablaModelos').on("click", ".EditarModelos", function (event) {
  event.preventDefault();

  const form = document.getElementById("formModelos");
  if (form) form.reset();

  $("#ModalLabelModelo").text("Editar Modelo");

  // Llenar campos con los valores correspondientes de los data-attributes
  $("#createdModelo").val($(this).data("id"));

  $("#modelo").val($(this).data("modelo"));

  $("#marca_modelo").val($(this).data("id_marca"));

  // Cambiar el botón maestro para edición
  $("#buttomModelo")
    .text("Editar Modelo")
    .removeClass("btn-primary")
    .addClass("btn-warning")
    .attr("action", "edit");

  // Abrir el modal de forma segura
  $("#ModelosModal").modal("show");
});
