
const spanishLanguage = {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ registros",
    info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    infoFiltered: "(filtrado de un total de _MAX_ registros)",
    loadingRecords: "Cargando...",
    zeroRecords: "No se encontraron resultados",
    emptyTable: "Ningún dato disponible en esta tabla",
    paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
    },
    aria: {
        sortAscending: ": Activar para ordenar la columna de manera ascendente",
        sortDescending: ": Activar para ordenar la columna de manera descendente"
    }
};

/**
 * Inicializa un DataTable reutilizable
 * @param {string|HTMLElement} selector - Selector JS del <table>
 * @param {Array} columns - Configuración de las columnas [{ data: 'nombre', title: 'Nombre' }]
 * @param {Object} customOptions - Opciones adicionales o sobrescrituras (p. ej. ajax, data, serverSide)
 * @returns {Object} Instancia de DataTable
*/

export function initDataTable(selector, columns = [], ajaxConfig = {}) {

    const tableEl = $(selector);

    if (!tableEl) {
        console.error(`No se encontró el elemento tabla: ${selector}`);
        return null;
    }

    // 1. Destruir la instancia previa si la tabla ya había sido inicializada
    if ($.fn.DataTable.isDataTable(tableEl)) {
        $.fn.DataTable.fnDestroy(tableEl);
        $(tableEl).empty();
        // Limpia el HTML interno generado
    }

    const defaultConfig = {
        columns: columns,
        ordering: false,
        responsive: true,
        autoWidth: false,
        pageLength: 5,
        processing: true,
        serverSide: true,
        ajax: ajaxConfig,
        language: spanishLanguage,
        dom: 'tp' // Combina u sobrescribe cualquier propiedad
    };

    // 3. Inicializar y retornar la instancia
    return $(tableEl).DataTable(defaultConfig);
}
