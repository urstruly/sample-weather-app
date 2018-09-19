import React, { Component } from 'react';
import { Forecast } from './Forecast';

export default class ForecastContainer extends Component {
	reRenderForecasts(evt) {
		this.props.reRenderForecasts({count: evt.target.value});
	}
	render() {
		const { forecasts } = this.props.forecasts;
		const mappedForecasts = forecasts.map((forecast, idx) => <Forecast key={idx} forecast={forecast} />);

		return (
			<div>
				<label className="forecastRangeLabel">Select the amount of days you want to show</label>
				<input type="range" min="1" max="5" className="forecastRange" name="forecastRange" value={this.props.count} onChange={this.reRenderForecasts.bind(this)}/>
				<ul>
					{mappedForecasts}
				</ul>
			</div>

		);
	}
}