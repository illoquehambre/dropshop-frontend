




const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request, { params }) {


    const { id } = params;

    try {
        const response = await fetch(`https://api.printful.com/products/${id}/sizes`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}