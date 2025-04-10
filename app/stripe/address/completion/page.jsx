'use client';
import React, { Suspense } from 'react';
import Status from '@/components/order/status';
import { useSearchParams } from 'next/navigation';

function CompletionPageContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_intent') || '';

  if (!paymentId) {
    return (
      <p className="text-black">
        No se encontró el identificador de la orden. Revisa el enlace.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
