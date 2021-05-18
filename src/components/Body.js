import React from "react";
import "./Body.css";

function Body({ image, title, description }) {
	return (
		<div className="game">
			<img src={image} className="game-image" alt="game"/>
			<div className="game-text">
				<h4>{title}</h4>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default Body;
