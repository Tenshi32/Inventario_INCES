/**
 * Inicializa un Toast reutilizable
 * @param {string} estado - Estado de la respuesta { "danger", "success" }.
 * @param {string} message - Mensaje de la respuesta del servidor.
 * @returns {void} 
*/

export function initSelect2(selectId, modalId) {
  const select = document.getElementById(selectId);
  if (select) {
    $(select).select2({
      width: '100%',
      dropdownParent: $(`#${modalId}`),
    });
  }
}

export function initSelect2Buscador(selectId, modalId, peticion) {
  const select = document.getElementById(selectId);
  if (select) {
    $(select).select2({
      width: '100%',
      dropdownParent: $(`#${modalId}`),
      minimumInputLength: 2,
      ajax: peticion
    });
  }
}

export function destroySelect2(selectId) {
  const select = document.getElementById(selectId);
  if (select) {
    // Verificamos si Select2 está inicializado antes de destruirlo
    // (opcional pero recomendado para evitar errores)
    if ($(select).data('select2')) {
      $(select).select2('destroy');
    }
  }
}
