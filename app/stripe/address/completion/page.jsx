'use client';
import { useEffect, useState, useRef } from 'react';
import { useCart } from '@/app/hooks/useCart';

const CompletionPage = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const sseConnection = useRef(null); // Ref para manejar la conexión SSE
  const {idDraft} = useCart();
  useEffect(() => {
    console.log(idDraft);
    
    if (!idDraft) {
      setMessage("No se proporcionó el ID de pago.");
      return;
    }

    // Conectar al servidor SSE para recibir notificaciones sobre el pedido
    const connectToSSE = () => {
      console.log("Se manda?");
      
      sseConnection.current = new EventSource(`/api/order/sse?idDraft=${idDraft}`);
      console.log(sseConnection.current);
      
      sseConnection.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === 'success') {
          setMessage("¡Pedido confirmado exitosamente!");
        } else if (data.status === 'error') {
          setMessage(`Hubo un error: ${data.error}`);
        }
        
        // Cerrar la conexión SSE después de recibir la respuesta
        sseConnection.current.close();
      };

      sseConnection.current.onerror = () => {
        setMessage("Error al obtener el estado del pedido. Por favor, recarga la página.");
        sseConnection.current.close();
      };
      setIsLoading(false);
    };

    connectToSSE();

    // Timeout para cerrar la conexión SSE si no se recibe respuesta después de un tiempo
    const timeout = setTimeout(() => {
      setMessage("Tiempo de espera agotado. Por favor, intenta nuevamente.");
      sseConnection.current.close();
    }, 60000); // 1 minuto

    // Limpiar timeout y conexión SSE al desmontar el componente
    return () => {
      clearTimeout(timeout);
      if (sseConnection.current) {
        sseConnection.current.close();
      }
    };
  }, [idDraft]);

  return (
    <div className='text-black'>
      <h1>Confirmación de Pedido</h1>
      {isLoading ? (
        <p>Procesando tu pedido...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default CompletionPage;
