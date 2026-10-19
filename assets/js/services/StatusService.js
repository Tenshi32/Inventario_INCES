/** 
 * StatusService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const path = "Status"

export function GetStatus(endpoint) {
  return request(`${path}/${endpoint}`, "GET");
}