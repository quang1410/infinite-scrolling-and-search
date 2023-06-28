import { useState, useRef, useCallback } from 'react';

import { Product } from '../../components/product';
import SearchInput from '../../components/searchInput/searchInput';

import useProduct from '../../hooks/useProduct';
import useStore from '../../hooks/useStore';
import { getProductBySearch } from '../../api/axios';

import { ProductType } from '../../types/type';
import { ACTION_TYPE } from '../../utils/constants';

import styles from './productPage.module.css';

const ProductPage = () => {
    const [limit, setLimit] = useState<number>(20);
    const {
        isLoading,
        isError,
        error,
        hasNextPage,
        setHasNextPage,
    } = useProduct({ limit });
    const { state: stateProduct, dispatch } = useStore();

    const intObserver = useRef<IntersectionObserver | null>(null);

    const lastPostRef = useCallback((product: HTMLElement) => {
        if (isLoading) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(products => {
            if (products[0].isIntersecting && hasNextPage) {
                setLimit(prev => prev + 20)
            }
        })

        if (product) intObserver.current.observe(product)
    }, [isLoading, hasNextPage])

    if (isError) return <p className='center'>Error: {error.message}</p>

    const content = stateProduct?.products?.map((product: ProductType, i: number) => {
        if (stateProduct.products.length === i + 1) {
            return <Product ref={lastPostRef} key={product.id} product={product} />
        }
        return <Product key={product.id} product={product} />
    })

    const handleSearch = async (valueSearch: string) => {
        const result = await getProductBySearch({ params: { q: valueSearch } });
        dispatch({ type: ACTION_TYPE.GET_PRODUCT, payload: result })
        setHasNextPage((result.products.length === result.total) ? false : true)
    }

    return (
        <div className={styles.product_page_container}>
            <h1 id="top">Infinite Scrolling and Searchable Product List</h1>
            <SearchInput placeholder='Search product by title' type='search' fetchSearch={handleSearch} />
            <div className={styles.list_product_container}>
                {content}
            </div>
            {isLoading && <p className="center">Loading More Posts...</p>}
            <a href="#top" className={styles.back_to_top}></a>
        </div>
    )
}
export default ProductPage