




const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request, { params }) {


    const { id } = params;

    try {
        const response = await fetch(`https://api.printful.com/store/variants/@${id}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }
        const data = await response.json();

        const result = {
            id: id.toString(),
            price: data.result.retail_price,
            url: `/api/user/product/${id}`,
        };

        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}