import React, { useState, useEffect } from 'react';
import API from './api';
import ProductCard from './components/Products/ProductCard';
import Jumbotron from './components/UI/Jumbotron';
import Footer from './components/UI/Footer';
import Select from './components/UI/Select';
import Input from './components/UI/Input';

const useLoadProducts = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		API.getProduct().then((res) => {
			setProducts(res.data);
		});
	}, []);
	return products;
};

const useFilteredProducts = ({ products, searchInput, productType }) => {
	return products.filter((product) => {
		// Removed pushing components to array with purpose to filter products
		// Fixed bug when filter by name and type simultaneously
		if (!productType && !searchInput) return true;
		const hasTypeMatch = productType && product.type.match(productType);

		if (!searchInput && hasTypeMatch) return true;

		const searchInputRegExp = RegExp(searchInput, 'gi');
		const isFoundByName = product.name.match(searchInputRegExp);
		// I`would also recommend to use full-text search library to improve usability
		return hasTypeMatch && isFoundByName;
	});
};

function App() {
	const products = useLoadProducts();
	const [searchInput, setSearchInput] = useState('');
	const [productType, setProductType] = useState('RETAIL');
	const filteredProducts = useFilteredProducts({
		products,
		searchInput,
		productType,
	});

	return (
		<>
			<Jumbotron title="Interview Header" />

			<div className="container">
				<div>
					<label htmlFor="search">Search:</label>
					<Input
						type="text"
						id="search"
						value={searchInput}
						onChange={setSearchInput}
					/>
				</div>

				<div>
					<label htmlFor="product-type">Choose a product type:</label>
					<Select
						id="product-type"
						value={productType}
						options={[
							{ key: 'RETAIL', value: 'Retail' },
							{ key: 'CASH', value: 'Cash' },
						]}
						onChange={setProductType}
					/>
				</div>

				<h1>Results: </h1>
				<div>
					{filteredProducts.map((product, idx) => (
						<ProductCard key={idx} {...product} />
					))}
				</div>
			</div>

			<Footer />
		</>
	);
}

export default App;
