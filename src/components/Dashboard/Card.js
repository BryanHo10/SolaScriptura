import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, text }) => {
	return (
		<div>
			<h1>{title}</h1>
			<h3>{text}</h3>
		</div>
	);
};
Card.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
export default Card;
