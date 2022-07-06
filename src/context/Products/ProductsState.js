import React, { useState, useEffect } from 'react';
import API from '../../api';
import ProductsContext from './ProductsContext';

const useLoadProducts = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await API.getProduct();
				setProducts(res.data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
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
	const products = useLoadProducts();
	const [filteredProducts, setFilteredProducts] = useState(products);
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
