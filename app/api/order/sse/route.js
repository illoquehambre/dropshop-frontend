// /api/sse.js
/*const sseClients = new Map();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const idDraft = searchParams.get('idDraft');

    if (!idDraft) {
        return new Response('Missing idDraft', { status: 400 });
    }

    const stream = new ReadableStream({
        start(controller) {
            // Almacenar la conexión junto con el `idDraft`
            sseClients.set(idDraft, controller);
        },
        cancel() {
            // Limpiar cuando el cliente se desconecta
            sseClients.delete(idDraft);
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
*/


// /api/sse.js

const sseClients = new Map();  // Mapa de conexiones SSE activas por cada idDraft
const eventQueue = new Map();  // Mapa para almacenar eventos no entregados

// Endpoint para manejar las conexiones SSE
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const idDraft = searchParams.get('idDraft');

    if (!idDraft) {
        return new Response('Missing idDraft', { status: 400 });
    }

    const stream = new ReadableStream({
        start(controller) {
            // Guardamos la conexión SSE en el mapa sseClients
            sseClients.set(idDraft, controller);

            // Si hay eventos pendientes en la cola, enviarlos al cliente
            if (eventQueue.has(idDraft)) {
                const eventData = eventQueue.get(idDraft);
                notifyClient(idDraft, eventData);
                eventQueue.delete(idDraft);  // Limpiar la cola una vez enviado
            }
        },
        cancel() {
            // Limpiar la conexión SSE cuando el cliente se desconecta
            sseClients.delete(idDraft);
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}

// Función para enviar actualizaciones a un cliente
export const notifyClient = (idDraft, data) => {
    if (sseClients.has(idDraft)) {
        const controller = sseClients.get(idDraft);
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        controller.close();  // Cerrar la conexión después de enviar el mensaje
        sseClients.delete(idDraft);  // Limpiar la cola
    } else {
        // Si no hay conexión, almacenar el evento en la cola
        eventQueue.set(idDraft, data);
    }
};
