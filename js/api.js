const API_URL = "http://localhost/gestor_documental_api/api";

async function peticionAPI(endpoint, opciones = {}) {
    try {
        const respuesta = await fetch(`${API_URL}${endpoint}`, opciones);

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "Error al realizar la solicitud");
        }

        return datos;

    } catch (error) {
        console.error("Error API:", error);
        throw error;
    }
}

async function obtenerDocumentos() {
    return peticionAPI("/documentos");
}

async function obtenerDocumento(id) {
    return peticionAPI(`/documentos/${id}`);
}

async function obtenerTiposDocumento() {
    return peticionAPI("/tipos-documento");
}

async function crearDocumento(documento) {
    return peticionAPI("/documentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(documento)
    });
}

async function actualizarDocumento(id, documento) {
    return peticionAPI(`/documentos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(documento)
    });
}

async function eliminarDocumento(id) {
    return peticionAPI(`/documentos/${id}`, {
        method: "DELETE"
    });
}