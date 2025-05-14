'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PrintfulCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code  = searchParams.get('code');
    const state = searchParams.get('state');

    (async () => {
      if (!code || !state) {
        // Informe de error
        window.opener?.postMessage(
          { type: 'PRINTFUL_ERROR', payload: { message: 'Faltan parametros' } },
          window.origin
        );
        window.close();
        return;
      }
      try {
        // Llamada al backend para intercambiar tokens y actualizar store
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/printful-oauth/callback?code=${code}&state=${state}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Error en callback');
        // Enviar store actualizado a la ventana padre
        window.opener?.postMessage(
          { type: 'PRINTFUL_CONNECTED', payload: { store: json.store } },
          window.origin
        );
      } catch (err) {
        window.opener?.postMessage(
          { type: 'PRINTFUL_ERROR', payload: { message: err.message } },
          window.origin
        );
      } finally {
        window.close();
      }
    })();
  }, [searchParams]);

  return <p>Procesando conexión con Printful…</p>;
}
