/** 
 * MarcasService.js 
 */

// Importas tu función genérica (si está en otro archivo) o la mantienes arriba
import { request } from './RequestService.js';

const pathMarcas = "tipo_dispositivos"

export function GetAjaxMarca(){
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
    dataSrc: function (json) {
      // 1. Actualizamos totales generales (vienen del backend)
      document.getElementById("totalDevice").textContent = json.recordsTotal || 0;

      // 2. Si el backend te devuelve los conteos de estados, los pintas aquí
      if (json.conteo) {
        document.getElementById("operativoCount").textContent = json.conteo.operativos || 0;
        document.getElementById("inoperativoCount").textContent = json.conteo.inoperativos || 0;
      }

      // 3. Obtenemos el último código de los datos actuales de la página
      if (json.data && json.data.length > 0) {
        let ultimoCodigo = json.data[json.data.length - 1].cd_dispositivo;
        document.getElementById("lastId").textContent = ultimoCodigo || "-";
      } else {
        document.getElementById("lastId").textContent = "-";
      }

      // Retornamos estrictamente el array que DataTables necesita para pintar la tabla
      return json.data;
    }

  }
}

export function GetTipoDispositivo(endpoint) {
  return request(`${pathMarcas}/${endpoint}`, "GET");
}

export async function PostTipoDispositivo(datos) {
  return await request(`${pathMarcas}/Crear`, "POST", datos);
}

export async function PutTipoDispositivo(datos, endpoint) {
  return await request(`${pathMarcas}/${endpoint}`, "PUT", datos);
}

// ¡E incluso puedes agregar un DELETE gratis y muy fácil!
export async function DeleteTipoDispositivo(endpoint) {
  return await request(`${pathMarcas}/${endpoint}`, "DELETE");
}