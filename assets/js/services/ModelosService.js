/** 
 * ModelosService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const path = "Modelos"

export function GetModelo(endpoint) {
  return request(`${path}/${endpoint}`, "GET");
}