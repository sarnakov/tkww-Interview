import React from 'react';

function Image(props) {
	// Would be good to add suspence and fallback
	return (
		<img
			className={props.className}
			src={`${props.src}`}
			width={props.width}
			alt={`${props.alt}`}
		/>
	);
}

export default Image;
