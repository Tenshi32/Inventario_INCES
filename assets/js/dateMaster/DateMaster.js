$(document).ready(function () {

  selectModelos("marca_modelo", "marcas", "marca");

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  initializeTooltips(tooltipTriggerList)

  consultarCategorias()
  consultarMarcas()
  consultarModelos()
  consultarDepartamentos()
  consultarEstados()
  SelectEstados()
  consultarConsumibles()
  consultarServicios()
  
});

$(".sidebar-accordion").on("click", ".btnDM", function () {
  var tablaver = $(this);
  $(".collapse").not(tablaver.attr("href")).collapse("hide");

  if (tablaver.attr("aria-expanded") === "false") {
    $("#multiMarcas").collapse("show");
  }

  $(".nav-link").removeClass("active");

  tablaver.closest(".nav-link").addClass("active");

});