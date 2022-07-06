import React, { useState, useEffect } from 'react';
import API from './api';
import ProductCard from './components/Products/ProductCard';
import Jumbotron from './components/UI/Jumbotron';
import Footer from './components/UI/Footer';

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
		// Refactored pushing components to array
		if (!productType && !searchInput) return true;
		const hasTypeMatch = productType && product.type.match(productType);

		if (!searchInput && hasTypeMatch) return true;

		// Fixed bug when filter by name and type simultaneously
		const searchInputRegExp = RegExp(searchInput, 'gi');
		const isFoundByName = product.name.match(searchInputRegExp);
		// I`would also recommend to use full-text search library to improve usability

		return hasTypeMatch && isFoundByName;
	});
};

function App() {
	const products = useLoadProducts();
	const [searchInput, setSearchInput] = useState('');
	const [productType, setProductType] = useState('');
	const filteredProducts = useFilteredProducts({
		products,
		searchInput,
		productType,
	});

	return (
		<>
			<Jumbotron title="Interview Header" />

			<div className="container">
				<form>
					<label>
						Search:
						<input
							type="text"
							name="search"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
					</label>
				</form>
			</div>

			<label for="type">Choose a product type:</label>
			<select onChange={(e) => setProductType(e.target.value)}>
				<option value="RETAIL">Retail</option>
				<option value="CASH">Cash</option>
			</select>

			<div className="container">
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
