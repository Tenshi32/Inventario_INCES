import { GetMarca } from "../js/services/MarcasService.js"
import { GetTipoDispositivo } from "../js/services/TipoDispositivoService.js"
import { GetStatus } from "../js/services/StatusService.js"

$(document).on("click", "a[data-page]", function (e) {
  e.preventDefault();
  const pageToLoad = $(this).data("page");
  loadContent(pageToLoad, $(this));
  sessionStorage.setItem('lastPage', pageToLoad);
});

$(document).ready(function () {

  const pageToLoad = sessionStorage.getItem('lastPage') || 'dispositivo';
  loadContent(pageToLoad);

  const nombre = sessionStorage.getItem('usuario_nombre');
  $('.username').text(nombre);
  

  datosMarcas();
  datosTipoDispositivos();
  datosTipoStatus();

});

async function datosMarcas() {

  let data;

  if (!localStorage.getItem("MarcasAll")) {

    data = await GetMarca("All");
    localStorage.setItem("MarcasAll", JSON.stringify(data));
    //localStorage.removeItem("MarcasAll");
  } 

}

async function datosTipoDispositivos() {

  let data;

  if (!localStorage.getItem("TipoDispositivoAll")) {

    data = await GetTipoDispositivo("All");
    localStorage.setItem("TipoDispositivoAll", JSON.stringify(data));

  } 

}

async function datosTipoStatus() {

  let data;

  if (!localStorage.getItem("TipoStatusAll")) {

    data = await GetStatus("All");
    localStorage.setItem("TipoStatusAll", JSON.stringify(data));

  } 

}

document.addEventListener('keyup', e => {
  // Verificamos si el evento proviene del input con id "buscador"
  if (e.target.matches('#buscador')) {
    const valorBusqueda = e.target.value.toLowerCase();

    // Seleccionamos todas las filas del cuerpo de la tabla
    document.querySelectorAll('.table tbody tr').forEach(fila => {
      // Comparamos el texto de la fila con lo que escribió el usuario
      const textoFila = fila.textContent.toLowerCase();

      // Si el texto coincide, mostramos la fila, si no, la ocultamos
      if (textoFila.includes(valorBusqueda)) {
        fila.style.display = 'table-row';
      } else {
        fila.style.display = 'none';
      }
    });
  }
});

function SessionActiva() {
  const nombre = localStorage.getItem('usuario_nombre') || '';
  $('.username').text(nombre);
}

