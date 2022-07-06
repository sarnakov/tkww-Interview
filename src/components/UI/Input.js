import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	const { value, onChange, ...otherProps } = props;
	return (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			{...otherProps}
		/>
	);
}

Input.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
	id: PropTypes.string,
};

export default Input;
