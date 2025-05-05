'use client';
import React, { Suspense } from 'react';
import Status from '@/components/order/Status';
import { useSearchParams } from 'next/navigation';

function CompletionPageContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_intent') || '';
  const params = new URLSearchParams(window.location.search);
  // Guarda lo que necesites (p. ej. payment_intent) en memoria o llama al backend
  params.delete('payment_intent_client_secret');
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  if (!paymentId) {
    return (
      <p className="text-black">
        No se encontró el identificador de la orden. Revisa el enlace.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Status paymentId={paymentId} />
    </div>
  );
}

export default function CompletionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompletionPageContent />
    </Suspense>
  );
}
