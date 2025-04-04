// pages/order-status.js
'use client';
import { useRouter } from 'next/router';
import Status from '@/components/order/status';
import { useSearchParams } from 'next/navigation';


export default function CompletionPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_intent') || '';

  if (!paymentId) return <p className='text-black'>No se encontró el identificador de la orden. Revisa el enlace.</p>;

  return (
    <div>
      <h1>Seguimiento de tu pedido</h1>
      <Status paymentId={paymentId} />
    </div>
  );
}
