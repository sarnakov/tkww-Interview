import React, { useState, useEffect } from 'react';
import API from '../../api';
import ProductsContext from './ProductsContext';

const useLoadProducts = ({ onLoad }) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await API.getProduct();
				const products = res.data.map((product, idx) => ({
					...product,
					id: idx,
				}));
				setProducts(products);
				onLoad(products);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return products;
};

const getFilteredProducts = ({ products, searchValue, productType }) => {
	return products.filter((product) => {
		// Removed pushing components to array with purpose to filter products
		// Fixed bug when filter by name and type simultaneously
		if (!productType && !searchValue) return true;
		const hasTypeMatch = productType && product.type.match(productType);

		if (!searchValue && hasTypeMatch) return true;

		const searchValueRegExp = RegExp(searchValue, 'gi');
		const isFoundByName = product.name.match(searchValueRegExp);
		// I`would also recommend to use full-text search library to improve usability
		return hasTypeMatch && isFoundByName;
	});
};

function ProductsState({ children }) {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const products = useLoadProducts({ onLoad: setFilteredProducts });
	const filterProducts = ({ searchValue, productType }) => {
		const filteredProducts = getFilteredProducts({
			products,
			searchValue,
			productType,
		});
		setFilteredProducts(() => filteredProducts);
	};
	return (
		<ProductsContext.Provider
			value={{ products: filteredProducts, filterProducts }}
		>
			{children}
		</ProductsContext.Provider>
	);
}
export default ProductsState;
