/**
 * Inicializa un Toast reutilizable
 * @param {string} estado - Estado de la respuesta { "danger", "success" }.
 * @param {string} message - Mensaje de la respuesta del servidor.
 * @returns {void} 
*/

export function initToast(estado, message) {

    const ToastIcon = (estado == "danger") ? "exclamation-triangle-fill" : "check-circle";

    const Toast = $("#MyToast")
    const ToastConted = `
        <div class="toast align-items-center bg-${estado} text-white border-0" role="alert" aria-live="assertive"
          aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body d-flex align-items-center">
              <i class="bi bi-${ToastIcon} me-2 fs-5"></i>
              <span>${message} </span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
              aria-label="Close"></button>
          </div>
        </div>`;

    const $nuevoToast = $(ToastConted).appendTo(Toast);

    let bootstrapToast = new bootstrap.Toast($nuevoToast[0], {
        delay: 4000,   // Tiempo en milisegundos (4 segundos)
        autohide: true // Asegura que se oculte automáticamente
    });

    bootstrapToast.show();

    $nuevoToast.on("hidden.bs.toast", function () {
        $(this).remove();
    })

}
