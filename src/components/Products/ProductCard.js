import React, { useState } from 'react';
import './ProductCard.css';
import Image from '../UI/Image';

function ExpandedInformation({ price, storeName }) {
	return (
		<div>
			<p>Price: {price}</p>
			<p>{storeName}</p>
		</div>
	);
}

function ProductCard(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpandedStatus = () => setIsExpanded(() => !isExpanded);
	const { name, image, type, brandName, price, storeName } = props;

	return (
		<div className="product-card" onClick={toggleExpandedStatus}>
			{isExpanded && (
				<ExpandedInformation price={price} storeName={storeName} />
			)}
			<h2>{name}</h2>
			{image && (
				<Image alt={name} src={image} className="product-card__image" />
			)}
			<p>{type}</p>
			<p>{brandName}</p>
		</div>
	);
}

export default ProductCard;
