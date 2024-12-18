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

const sseClients = new Map();  // Mapa de conexiones SSE activas por cada paymentIntentId
const eventQueue = new Map();  // Mapa para almacenar eventos no entregados

// Endpoint para manejar las conexiones SSE
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get('paymentIntentId');

    if (!paymentIntentId) {
        return new Response('Missing paymentIntentId', { status: 400 });
    }

    const stream = new ReadableStream({
        start(controller) {
            // Guardamos la conexión SSE en el mapa sseClients
            sseClients.set(paymentIntentId, controller);

            // Si hay eventos pendientes en la cola, enviarlos al cliente
            if (eventQueue.has(paymentIntentId)) {
                const eventData = eventQueue.get(paymentIntentId);
                notifyClient(paymentIntentId, eventData);
                eventQueue.delete(paymentIntentId);  // Limpiar la cola una vez enviado
            }
        },
        cancel() {
            // Limpiar la conexión SSE cuando el cliente se desconecta
            sseClients.delete(paymentIntentId);
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
export const notifyClient = (paymentIntentId, data) => {
    if (sseClients.has(paymentIntentId)) {
        const controller = sseClients.get(paymentIntentId);
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        controller.close();  // Cerrar la conexión después de enviar el mensaje
        sseClients.delete(paymentIntentId);  // Limpiar la cola
    } else {
        // Si no hay conexión, almacenar el evento en la cola
        eventQueue.set(paymentIntentId, data);
    }
};
