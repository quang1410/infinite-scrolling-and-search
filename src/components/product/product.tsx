import React from 'react';
import styles from './product.module.css';
import { ProductType } from '../../types/type';



type Props = {
    product: ProductType
}

const Product = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const { product } = props;
    const productBody = (
        <div className={styles.product_container}>
            <img src={product.thumbnail} alt="thumbnail" className={styles.product_img} />
            <h5>{product.title}</h5>
            <p>{product.price}</p>
        </div>
    )

    const content = ref
        ? <article ref={ref}>{productBody}</article>
        : <article>{productBody}</article>

    return content;
})

export default Product
