import React from 'react';
import PropTypes from 'prop-types';
function Select(props) {
	const { options, value, onChange, id } = props;
	return (
		<select
			id={id}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{options.map(({ key, value }) => (
				<option key={key} value={key}>
					{value}
				</option>
			))}
		</select>
	);
}

Select.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.any,
	id: PropTypes.any,
	onChange: PropTypes.func.isRequired,
};

export default Select;
