import React, { useState, useEffect, useContext } from 'react';
import ProductsContext from '../../context/Products/ProductsContext';
import Select from '../UI/Select';
import Input from '../UI/Input';

const PRODUCT_TYPES = [
	{ key: 'RETAIL', value: 'Retail' },
	{ key: 'CASH', value: 'Cash' },
];

const DEFAULT_TYPE = 'RETAIL';

function ProductFilter() {
	const { filterProducts } = useContext(ProductsContext);
	const [searchValue, setSearchValue] = useState('');
	const [productType, setProductType] = useState(DEFAULT_TYPE);

	useEffect(() => {
		filterProducts({
			searchValue,
			productType,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, productType]);
	return (
		<>
			<div>
				<label htmlFor="search">Search:</label>
				<Input
					type="text"
					id="search"
					value={searchValue}
					onChange={setSearchValue}
				/>
			</div>

			<div>
				<label htmlFor="product-type">Choose a product type:</label>
				<Select
					id="product-type"
					value={productType}
					options={PRODUCT_TYPES}
					onChange={setProductType}
				/>
			</div>
		</>
	);
}
export default ProductFilter;
