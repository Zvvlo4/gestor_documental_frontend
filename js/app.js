const tabla = document.getElementById("tablaDocumentos");
const estadoCarga = document.getElementById("estadoCarga");
const mensaje = document.getElementById("mensaje");
const formulario = document.getElementById("formDocumento");
const buscar = document.getElementById("buscar");
const btnCancelar = document.getElementById("btnCancelar");
const filtroTipo = document.getElementById("filtroTipo");

let documentos = [];

document.addEventListener("DOMContentLoaded", async () => {
    await cargarTipos();
    await cargarDocumentos();
});

async function cargarTipos() {
    try {
        const respuesta = await obtenerTiposDocumento();
        const select = document.getElementById("tipoDocumento");

        respuesta.tipos_documento.forEach(tipo => {

            const opcion = document.createElement("option");
            opcion.value = tipo.id;
            opcion.textContent = tipo.nombre;
            select.appendChild(opcion);

            const opcionFiltro = document.createElement("option");
            opcionFiltro.value = tipo.nombre;
            opcionFiltro.textContent = tipo.nombre;
            filtroTipo.appendChild(opcionFiltro);
        });

    } catch (error) {
        mostrarMensaje(
            "No fue posible cargar los tipos de documento.",
            true
        );
    }
}

async function cargarDocumentos() {
    estadoCarga.textContent = "Cargando documentos...";

    try {
        const respuesta = await obtenerDocumentos();

        documentos = respuesta.documentos || [];

        aplicarFiltros();

        estadoCarga.textContent =
            documentos.length === 0
                ? "No existen documentos registrados."
                : "";

    } catch (error) {
        estadoCarga.textContent =
            "Error al cargar los documentos.";
    }
}

function mostrarDocumentos(lista) {

    tabla.innerHTML = "";

    if (lista.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6">
                    No se encontraron documentos.
                </td>
            </tr>
        `;
        return;
    }

    lista.forEach(documento => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${escaparHTML(documento.titulo)}</td>

            <td>
                ${escaparHTML(documento.tipo_documento || "")}
            </td>

            <td>${escaparHTML(documento.fecha)}</td>

            <td>
                ${escaparHTML(documento.descripcion || "")}
            </td>

            <td>
                ${escaparHTML(documento.archivo || "")}
            </td>

            <td>
                <button
                    class="btn btn-editar"
                    onclick="editarDocumento(${documento.id})"
                    aria-label="Editar ${escaparHTML(documento.titulo)}"
                >
                    Editar
                </button>

                <button
                    class="btn btn-eliminar"
                    onclick="borrarDocumento(${documento.id})"
                    aria-label="Eliminar ${escaparHTML(documento.titulo)}"
                >
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id =
        document.getElementById("documentoId").value;

    const documento = {

        titulo:
            document.getElementById("titulo")
                .value.trim(),

        tipo_documento_id:
            Number(
                document.getElementById("tipoDocumento")
                    .value
            ),

        fecha:
            document.getElementById("fecha").value,

        descripcion:
            document.getElementById("descripcion")
                .value.trim(),

        archivo:
            document.getElementById("archivo")
                .value.trim()
    };

    try {

        if (id) {

            await actualizarDocumento(id, documento);

            mostrarMensaje(
                "Documento actualizado correctamente."
            );

        } else {

            await crearDocumento(documento);

            mostrarMensaje(
                "Documento creado correctamente."
            );
        }

        limpiarFormulario();

        await cargarDocumentos();

    } catch (error) {

        mostrarMensaje(error.message, true);
    }
});

async function editarDocumento(id) {

    try {

        const respuesta =
            await obtenerDocumento(id);

        const documento =
            respuesta.documento;

        document.getElementById("documentoId").value =
            documento.id;

        document.getElementById("titulo").value =
            documento.titulo;

        document.getElementById("tipoDocumento").value =
            documento.tipo_documento_id;

        document.getElementById("fecha").value =
            documento.fecha;

        document.getElementById("descripcion").value =
            documento.descripcion || "";

        document.getElementById("archivo").value =
            documento.archivo || "";

        document.getElementById(
            "titulo-formulario"
        ).textContent = "Editar documento";

        btnCancelar.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        mostrarMensaje(
            "No fue posible cargar el documento.",
            true
        );
    }
}

async function borrarDocumento(id) {

    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este documento?"
    );

    if (!confirmar) {
        return;
    }

    try {

        await eliminarDocumento(id);

        mostrarMensaje(
            "Documento eliminado correctamente."
        );

        await cargarDocumentos();

    } catch (error) {

        mostrarMensaje(error.message, true);
    }
}

btnCancelar.addEventListener("click", () => {
    limpiarFormulario();
});

function limpiarFormulario() {

    formulario.reset();

    document.getElementById("documentoId").value = "";

    document.getElementById(
        "titulo-formulario"
    ).textContent = "Registrar documento";

    btnCancelar.hidden = true;
}

buscar.addEventListener(
    "input",
    aplicarFiltros
);

filtroTipo.addEventListener(
    "change",
    aplicarFiltros
);


function aplicarFiltros() {

    const texto =
        buscar.value.toLowerCase().trim();

    const tipo =
        filtroTipo.value;

    const filtrados =
        documentos.filter(documento => {

            const coincideTexto =
                documento.titulo
                    .toLowerCase()
                    .includes(texto) ||

                (documento.descripcion || "")
                    .toLowerCase()
                    .includes(texto);

            const coincideTipo =
                tipo === "" ||
                documento.tipo_documento === tipo;

            return coincideTexto && coincideTipo;
        });

    mostrarDocumentos(filtrados);
}

function mostrarMensaje(
    texto,
    esError = false
) {

    mensaje.textContent = texto;

    mensaje.className =
        esError
            ? "mensaje-error"
            : "mensaje-exito";

    setTimeout(() => {

        mensaje.textContent = "";
        mensaje.className = "";

    }, 4000);
}

function escaparHTML(valor) {

    const elemento =
        document.createElement("div");

    elemento.textContent =
        valor ?? "";

    return elemento.innerHTML;
}