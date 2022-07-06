import React, { useState, useEffect, useContext } from 'react';
import ProductsContext from '../../context/Products/ProductsContext';
import ProductCard from './ProductCard';

function ProductList(props) {
	const { products } = useContext(ProductsContext);
	return (
		<>
			<h2>Results: </h2>
			<div>
				{products.map((product, idx) => (
					<ProductCard key={idx} {...product} />
				))}
			</div>
		</>
	);
}

export default ProductList;
