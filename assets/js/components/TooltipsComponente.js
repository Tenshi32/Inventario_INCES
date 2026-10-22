/**
 * Inicializa un Toast reutilizable
 * @param {string} estado - Estado de la respuesta { "danger", "success" }.
 * @param {string} message - Mensaje de la respuesta del servidor.
 * @returns {void} 
*/

export function initTooltips(tooltipTriggerList) {

  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

}
