import React from 'react';
import PropTypes from 'prop-types';
function Jumbotron(props = {}) {
	const { title } = props;
	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="text">{title}</h1>
			</div>
		</div>
	);
}

Jumbotron.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Jumbotron;
