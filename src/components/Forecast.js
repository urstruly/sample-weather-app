import React from 'react';

export const Forecast = ({ forecast }) => {
	return (
		<li className="forecast">
			<div className="day">{forecast.day}</div>
			<img className="icon" src={forecast.iconUrl} alt={forecast.iconAltText} title={forecast.iconAltText} />
			<div className="max">{forecast.tempMax}&deg;C</div>
			<div className="min">{forecast.tempMin}&deg;C</div>
		</li>
	);
}
