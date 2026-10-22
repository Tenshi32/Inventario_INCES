/**
 * Función genérica para manejar cualquier petición HTTP
 * @param {string} endpoint - La ruta específica (ej: "Dispositivos/Crear" o "Dispositivos/1")
 * @param {string} method - "GET", "POST", "PUT", "DELETE", etc.
 * @param {Object} [data=null] - Los datos a enviar (opcional, solo para POST/PUT)
 */

import { initToast } from "../components/ToastComponente.js"

export async function request(endpoint, method, data = null) {

  // Aseguramos que la URL se arme correctamente
  const url = `${window.CONFIG.API_URL}/${endpoint}`;

  const options = {
    method: method,
    headers: {}
  };

  // Si enviamos datos, los convertimos a JSON y agregamos el Content-Type
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error en la red: ${response.statusText}`);
    }
    // 1. PRIMERO parseamos la respuesta del servidor a un objeto de JavaScript
    const resultado = await response.json();

    if (resultado.status && resultado.mensaje) {

      let status = resultado.status == true ? "success" : "danger"
      initToast(status, resultado.mensaje);
      
    }

    // 3. SIEMPRE devolvemos el resultado para que el archivo que llamó a esta función pueda usarlo
    return resultado;

  } catch (error) {
    console.error("Hubo un problema con la consulta:", error);
    throw error; // Lanzamos el error para que quien lo llame sepa que falló
  }

}