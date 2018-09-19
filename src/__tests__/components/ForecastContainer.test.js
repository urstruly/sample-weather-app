/* eslint max-lines-per-function:0, max-statements:0 */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ForecastContainer from '../../components/ForecastContainer';

configure({ adapter: new Adapter() });

function setup(config = {}) {
	const props = Object.assign({
		count: 2,
		forecasts: {
			forecasts: []
		},
		reRenderForecasts: jest.fn()
	}, config);

	const enzymeWrapper = mount(<ForecastContainer {...props} />);

	return {
		props,
		enzymeWrapper
	}
}

describe('<ForecastContainer />', () => {

	it('should render self with default state', () => {
		const { enzymeWrapper } = setup();

		// Self
		expect(enzymeWrapper.find('label.forecastRangeLabel').length).toBe(1);
		expect(enzymeWrapper.find('input[type="range"]').length).toBe(1);

		// Forecast components
		expect(enzymeWrapper.find('li').length).toBe(0);
	});

	it('should render self and Forecast subcomponents', () => {
		const forecasts = [
{
				"day": "WED",
				"iconAltText": "clear sky",
				"iconUrl": "http://openweathermap.org/img/w/01d.png",
				"tempMax": 20.46,
				"tempMin": 10.07
			},
			{
				"day": "THU",
				"iconAltText": "clear sky",
				"iconUrl": "http://openweathermap.org/img/w/01d.png",
				"tempMax": 22.46,
				"tempMin": 21.07
			}
];

		const { enzymeWrapper } = setup({forecasts: {forecasts}});

		// Self
		expect(enzymeWrapper.find('label.forecastRangeLabel').length).toBe(1);
		expect(enzymeWrapper.find('input[type="range"]').length).toBe(1);

		// Forecast components
		expect(enzymeWrapper.find('li.forecast').length).toBe(2);
		expect(enzymeWrapper.find('img.icon').length).toBe(2);

		// Day
		const days = enzymeWrapper.find('div.day');
		expect(days.length).toBe(2);
		expect(days.first().text()).toEqual('WED');
		expect(days.last().text()).toEqual('THU');

		// Temp
		const max = enzymeWrapper.find('div.max').first();
		expect(max.text()).toEqual('20.46°C');
		const min = enzymeWrapper.find('div.min').last();
		expect(min.text()).toEqual('21.07°C');
	});

	it('should call reRenderForecasts with the new count on changing the range input', () => {
		const { enzymeWrapper, props } = setup();

		expect(props.reRenderForecasts.mock.calls.length).toBe(0);

		// Trigger onChange for the input Event
		enzymeWrapper.find('input').simulate('change', {target: {value: 5}});

		expect(props.reRenderForecasts.mock.calls.length).toBe(1);
		expect(props.reRenderForecasts.mock.calls[0][0]).toEqual({count: 5});
	});
});
