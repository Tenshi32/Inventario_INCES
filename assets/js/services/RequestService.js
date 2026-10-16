/**
 * Función genérica para manejar cualquier petición HTTP
 * @param {string} endpoint - La ruta específica (ej: "Dispositivos/Crear" o "Dispositivos/1")
 * @param {string} method - "GET", "POST", "PUT", "DELETE", etc.
 * @param {Object} [data=null] - Los datos a enviar (opcional, solo para POST/PUT)
 */

export async function request(endpoint, method, data = null) {
  try {
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

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
    }

    // Opcional: Si el backend responde sin contenido (ej: un 204 No Content), evitamos que rompa el .json()
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return { success: true };

  } catch (error) {
    console.error(`Error en la petición [${method} ${endpoint}]:`, error);
    return null; // O puedes lanzar el error nuevamente si prefieres manejarlo en la interfaz
  }
}