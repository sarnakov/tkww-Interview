import React from 'react';
import ProductFilter from './components/Products/ProductFilter';
import ProductList from './components/Products/ProductList';
import ProductsState from './context/Products/ProductsState';
import Jumbotron from './components/UI/Jumbotron';
import Footer from './components/UI/Footer';

function App() {
	return (
		<>
			<Jumbotron title="Interview Header" />
			<ProductsState>
				<div className="container">
					<ProductFilter />
					<ProductList />
				</div>
			</ProductsState>
			<Footer />
		</>
	);
}

export default App;
