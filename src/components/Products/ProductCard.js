import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpandedStatus = () => setIsExpanded(() => !isExpanded);
	const { name, image, type, brandName, price, storeName } = props;

	return (
		<div className="product-card" onClick={toggleExpandedStatus}>
			{isExpanded && (
				<div>
					<p>Price: {price}</p>
					<p>{storeName}</p>
				</div>
			)}
			<h2>{name}</h2>
			<img alt="alt" src={image} className="product-card__image" />
			<p>{type}</p>
			<p>{brandName}</p>
		</div>
	);
}

export default ProductCard;
