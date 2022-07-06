import React, { useState, useEffect } from 'react';
import API from './api';
import ProductCard from './components/Products/ProductCard';

function App() {
	const [products, setProducts] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [searchProduct, setProductInput] = useState('');

	useEffect(() => {
		API.getProduct().then((res) => {
			setProducts(res.data);
		});
	}, []);

	const cardResults = [];

	for (let i = 0; i < products.length; i++) {
		if (searchProduct || searchInput) {
			if (searchProduct && products[i].type.match(searchProduct)) {
				cardResults.push(<ProductCard key={i} {...products[i]} />);
			}
			if (searchInput && products[i].name.match(searchInput)) {
				cardResults.push(<ProductCard key={i} {...products[i]} />);
			}
		} else {
			cardResults.push(<ProductCard key={i} {...products[i]} />);
		}
	}

	return (
		<>
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="text">Interview Header</h1>
				</div>
			</div>
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
				<div>{cardResults}</div>
			</div>
			<div style={{ marginTop: 30 }} className="footer">
				{' '}
				<div className="container">
					<h1>Interview Footer </h1>
				</div>
				<p>Built with love</p>
			</div>
		</>
	);
}

export default App;
