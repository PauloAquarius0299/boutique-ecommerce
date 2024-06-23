import ProductCard from '@/components/ProductCard'
import {getSearhedProducts} from '@/lib/actions/actions'

const SearchPage = async ({params}: {params: {query: string}}) => {
    const searchedProducts = await getSearhedProducts(params.query)

    const decodedQuery = decodeURIComponent(params.query)

    return (
        <div className='px-10 py-5'>
            <p className='text-heading3-bold my-10'>Resultados da pesquisa: {decodedQuery}</p>
            {!searchedProducts || searchedProducts.length === 0 && (
                <p className='text-body-bold my-5'>Nenhum resultado encontrado :/</p>
            )}
            <div className='flex flex-wrap justify-between gap-16'>
                {searchedProducts?.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                </div>
            </div>
    )
}

export default SearchPage;