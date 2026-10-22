/** 
 * MarcasService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const pathMarcas = "Marcas"

export function GetAjaxMarca(endpoint) {
  return {
    url: `${window.CONFIG.API_URL}/${pathMarcas}/${endpoint}`,
    dataType: 'json',
    delay: 350, // Pequeño retraso integrado (debounce) para no saturar al tipear rápido
    data: function (params) {
      return {
        q: params.term // Parámetro que lee Flask (ej: ?q=texto)
      };
    },
    processResults: function (data) {
      return {
        results: data.results // Select2 espera un arreglo con formato { id, text }
      };
    },
    cache: true
  }
}

export function GetMarca(endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "GET");
}

export function PostMarca(datos) {
  return request(`${pathMarcas}/Crear`, "POST", datos);
}

export function PutMarca(datos, endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "PUT", datos);
}

// ¡E incluso puedes agregar un DELETE gratis y muy fácil!
export function DeleteMarca(endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "DELETE");
}