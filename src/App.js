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

function App() {
	const products = useLoadProducts();
	const [searchInput, setSearchInput] = useState('');
	const [searchProduct, setProductInput] = useState('');

	const filteredProducts = products.filter((product) => {
		// Refactored pushing components to array
		if (!searchProduct && !searchInput) return true;
		const hasTypeMatch = searchProduct && product.type.match(searchProduct);
		// I`would also recommend to use full-text search library to improve usability

		if (!searchInput && hasTypeMatch) return true;

		// Fixed bug when filter by name and type simultaneously
		const searchInputRegExp = RegExp(searchInput, 'gi');
		const isFoundByName = product.name.match(searchInputRegExp);
		return hasTypeMatch && isFoundByName;
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
			<select onChange={(e) => setProductInput(e.target.value)}>
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
