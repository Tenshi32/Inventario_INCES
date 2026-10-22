/** 
 * DispositivoService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from '../services/RequestService.js';

const pathDipositivo = "Dispositivos"

export function GetAjaxDevice(){
    return {
    url: `${window.CONFIG.API_URL}/Dispositivos/All`, // La ruta a tu script o backend
    type: 'GET',
    data: function (d) {

      return {
        // Mapeas los nombres que tu backend en Python espera recibir
        offset: d.start,                      // Índice de inicio (OFFSET)
        limit: d.length,                      // Cantidad de filas a traer (LIMIT)
        search: $('#searchTable').val() || '', // Captura el valor del input de búsqueda
        estado: $('#filtroEstado').val() || '', // Captura el estado seleccionado
        tipo: $('#filtroTipo').val() || ''       // Opcional: término de búsqueda
      };
    },

    // Interceptamos la respuesta del backend para actualizar los contadores en pantalla
    
  }
}

export async function GetDevice(endpoint) {
  return await request(`${pathDipositivo}/${endpoint}`, "GET");
}

export function PostDevice(datos) {
  return request(`${pathDipositivo}/Crear`, "POST", datos);
}

export async function PutDevice(datos, endpoint) {
  return await request(`${pathDipositivo}/${endpoint}`, "PUT", datos);
}

// ¡E incluso puedes agregar un DELETE gratis y muy fácil!
export async function DeleteDevice(endpoint) {
  return await request(`${pathDipositivo}/${endpoint}`, "DELETE");
}