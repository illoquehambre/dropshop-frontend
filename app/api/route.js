export async function GET(request) {
    return new Response(JSON.stringify({ message: 'Hola, Next.js!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }