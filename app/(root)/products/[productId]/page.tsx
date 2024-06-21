import Gallery from "@/components/Gallery";
import { getProductDetails } from "@/lib/actions/actions";
import ProductInfo from '@/components/ProductInfo';

const ProductDetails = async ({params}: {params: {productId: string}}) => {
    const productDetails = await getProductDetails(params.productId)
    console.log(productDetails)

    return (
        <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
            <Gallery productMedia={productDetails.media} />
            <ProductInfo productInfo={productDetails} />
        </div>
    )
}

export default ProductDetails;