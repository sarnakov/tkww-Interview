import React from 'react';
import PropTypes from 'prop-types';
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
Image.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	width: PropTypes.number,
	alt: PropTypes.string,
};
export default Image;
