/** 
 * MarcasService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const pathMarcas = "tipo_dispositivos"

export function GetTipoDispositivo(endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "GET");
}

export function PostTipoDispositivo(datos) {
  return request(`${pathMarcas}/Crear`, "POST", datos);
}

export function PutTipoDispositivo(datos, endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "PUT", datos);
}

// ¡E incluso puedes agregar un DELETE gratis y muy fácil!
export function DeleteTipoDispositivo(endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "DELETE");
}