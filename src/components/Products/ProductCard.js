import React, { useState } from 'react';

function ProductCard(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpandedStatus = () => setIsExpanded(() => !isExpanded);
	const { name, image, type, brandName, price, storeName } = props;

	return (
		<div
			style={{ border: '1px solid black' }}
			onClick={toggleExpandedStatus}
		>
			{isExpanded && (
				<div>
					<p>Price: {price}</p>
					<p>{storeName}</p>
				</div>
			)}
			<h2>{name}</h2>
			<img
				alt="alt"
				src={image}
				style={{ maxWidth: 100, maxHeight: 'auto' }}
			></img>
			<p>{type}</p>
			<p>{brandName}</p>
		</div>
	);
}

export default ProductCard;
