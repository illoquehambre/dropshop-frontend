

export const getCheapestVariante = async (variants) => {

    try {
   
        variants.sort((a, b) => parseFloat(a.retail_price) - parseFloat(b.retail_price));

        if (variants.length > 0) {
            return variants[0].retail_price;
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error:', err);
    }
}  

export const checkVariantAvailable = async (id)=>{

    try{
        const {result} = await fetch(`/api/variant/${id}`)

        return result.availability_status=="active"
    }catch (err) {
        console.error('Error:', err);
    }
}

