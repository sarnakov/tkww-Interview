import React, { useContext } from 'react';
import ProductsContext from '../../context/Products/ProductsContext';
import ProductCard from './ProductCard';

function ProductList() {
	const { products } = useContext(ProductsContext);
	return (
		<>
			<h2>Results: </h2>
			<div>
				{products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</>
	);
}

export default ProductList;
