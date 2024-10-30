const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request) {
    
    console.log(request.url);
    const params = new URL(request.url).searchParams;
    const categories = params.get('category');
   
    try {
        let response;
        if (!categories || categories==null) {
            console.log("entra");
            response = await fetch(`https://api.printful.com/store/products`, {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });
        } else {
            const categoryList = categories.split(',').map(id => id.trim());
            console.log(`Fetching products for categories: ${categoryList}`);
            const categoryParams = categoryList.map(id => `category_id=${id}`).join('&');
            response = await fetch(`https://api.printful.com/store/products?category_id=${categories}`, {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(JSON.stringify(errorData), { status: response.status, headers: { 'Content-Type': 'application/json' } });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
