/** 
 * ModelosService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const path = "Modelos"

export function GetAjaxModelo(endpoint) {
  return {
    url: `${window.CONFIG.API_URL}/${path}/${endpoint}`,
    dataType: 'json',
    delay: 350, // Pequeño retraso integrado (debounce) para no saturar al tipear rápido
    data: function (params) {
      return {
        q: params.term, // Parámetro que lee Flask (ej: ?q=texto)
        marcas: params.term // Parámetro que lee Flask (ej: ?q=texto)
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

export function GetModelo(endpoint) {
  return request(`${path}/${endpoint}`, "GET");
}