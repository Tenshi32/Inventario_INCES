$(document).on("click", "a[data-page]", function (e) {
    e.preventDefault();
    const pageToLoad = $(this).data("page");
    loadContent(pageToLoad, $(this));
    sessionStorage.setItem('lastPage', pageToLoad);
});

$(document).ready(function() {
    const pageToLoad = sessionStorage.getItem('lastPage') || 'home'; 
    loadContent(pageToLoad);

    const nombre = sessionStorage.getItem('usuario_nombre');
    $('.username').text(nombre);
});

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

function SessionActiva(){
  const nombre = sessionStorage.getItem('usuario_nombre') || '';
  $('.username').text(nombre);
}