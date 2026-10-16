export async function obtenerTipoCategoria() {
  try {
    
    const url = await "http://127.0.0.1:5000/" + nameTable + "/All";

    await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error en la red");
    }
    const data = await response.json();
    return data;

  } catch (error) {

    console.error("Hubo un problema con la consulta:", error);
    return null; // O un array vacío [] según lo que prefieras manejar en caso de error

  }
  
}