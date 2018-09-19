/* eslint max-lines-per-function:0, max-statements:0, no-empty-function:0 */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LocationContainer } from '../../containers/LocationContainer';

configure({ adapter: new Adapter() });

function setup(config = {}) {
	const props = Object.assign({
		location: {},
		weather: {},
		fetchForecasts: jest.fn(),
		setLocation: jest.fn(),
	}, config);

	const enzymeWrapper = mount(<LocationContainer {...props} />);

	return {
		props,
		enzymeWrapper
	}
}

describe('<LocationContainer />', () => {

	it('should render self with default state', () => {
		const { enzymeWrapper } = setup();
		const countryDropdown = enzymeWrapper.find('Dropdown');
		const countryDropdownProps = countryDropdown.props();
		const cityInput = enzymeWrapper.find('input.city');

		// Self
		expect(countryDropdown.length).toBe(1);
		expect(cityInput.length).toBe(1);
		expect(cityInput.props().placeholder).toEqual('Search for a city');
		expect(enzymeWrapper.find('div.currentDate').text()).toEqual('');
		expect(enzymeWrapper.find('div.currentCity').text()).toEqual('');
		expect(enzymeWrapper.find('div.currentTemp').hasClass('no-display')).toBe(true);

		// Dropdown
		expect(countryDropdownProps.options.length).toBe(4);
		expect(countryDropdownProps.placeholder).toEqual('Select a country');
		expect(countryDropdownProps.options).toEqual([
			{ value: 'CN', label: 'China' },
			{ value: 'FR', label: 'France' },
			{ value: 'LT', label: 'Lithuania' },
			{ value: 'CH', label: 'Switzerland' }
		]);
	});

	it('should render self with non-empty data', () => {
		const { enzymeWrapper } = setup({
			location: {
				city: 'Zurich',
				country: 'CH'
			},
			weather: {
				currentCity: 'Zurich',
				currentDate: 'Wed Sep 19 2018',
				currentTemp: '21'
			}
		});

		expect(enzymeWrapper.find('div.currentDate').text()).toEqual('Wed Sep 19 2018');
		expect(enzymeWrapper.find('div.currentCity').text()).toEqual('Zurich');
		expect(enzymeWrapper.find('div.currentTemp').hasClass('no-display')).toBe(false);
		expect(enzymeWrapper.find('div.currentTemp').text()).toEqual('21°C');
	});

	it('should call the right actions when the events are fired', () => {
		const { enzymeWrapper, props } = setup();
		const countryDropdown = enzymeWrapper.find('Dropdown');
		const cityInput = enzymeWrapper.find('input.city');

		/*
		 * Define a spy so that we don't actually go get the element,
		 * but we know that the city input will be cleared.
		 */
		const clearCityInputSpy = jest.spyOn(LocationContainer.prototype, 'clearCityInput').mockImplementation(() => {});

		expect(clearCityInputSpy).not.toHaveBeenCalled();
		expect(props.setLocation.mock.calls.length).toBe(0);

		// Trigger onChange for the country dropdown
		countryDropdown.props().onChange({value: 'FR', label: 'France'});

		expect(clearCityInputSpy).toHaveBeenCalled();
		expect(props.setLocation.mock.calls.length).toBe(1);
		expect(props.setLocation.mock.calls[0][0]).toEqual({country: 'FR'});

		// Clear previous calls to setLocation
		props.setLocation.mockClear();

		expect(props.setLocation.mock.calls.length).toBe(0);
		expect(props.fetchForecasts.mock.calls.length).toBe(0);

		// Trigger 'Enter' key press on the city input
		cityInput.simulate('keypress', {key: 'Enter', target: {value: 'Nice'}});

		expect(props.setLocation.mock.calls.length).toBe(1);
		expect(props.setLocation.mock.calls[0][0]).toEqual({city: 'Nice'});
		expect(props.fetchForecasts.mock.calls.length).toBe(1);
	});
});
