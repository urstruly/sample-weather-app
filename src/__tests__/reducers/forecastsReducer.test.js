/* eslint max-lines-per-function:0, no-undefined:0, no-use-before-define:0 */
import forecastsReducer from '../../reducers/forecastsReducer';

describe('Forecasts Reducer', () => {

	const defaultState = {
		forecasts: [],
		count: 3,
		fetching: false,
		error: false,
		errorMessage: ''
	};

	it('has a default state', () => {
		expect(forecastsReducer(undefined, {type: 'unexpected'})).toEqual(defaultState);
	});

	it('can handle FETCH_FORECASTS_PENDING action', () => {
		expect(forecastsReducer(undefined, {type: 'FETCH_FORECASTS_PENDING'})).toEqual({
			...defaultState,
			fetching: true
		});
	});

	it('can handle FETCH_FORECASTS_FULFILLED action', () => {
		const payload = {
			data: {
				list: apiData
			}
		};
		expect(forecastsReducer(undefined, {type: 'FETCH_FORECASTS_FULFILLED', payload})).toEqual({
			...defaultState,
			forecasts: [
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
			]
		});
	});

	it('can handle FETCH_FORECASTS_REJECTED action', () => {
		const payload = {
			response: {
				data: {
					message: 'This is an error message'
				}
			}
		};
		expect(forecastsReducer(undefined, {type: 'FETCH_FORECASTS_REJECTED', payload})).toEqual({
			...defaultState,
			error: true,
			errorMessage: 'This is an error message'
		});
	});

	it('can handle SET_FORECAST_COUNT action', () => {
		const payload = {count: 5};
		expect(forecastsReducer(undefined, {type: 'SET_FORECAST_COUNT', payload})).toEqual({
			...defaultState,
			count: 5
		});
	});

});

const apiData = [
{
  "main": {
	"temp": 23.46,
	"temp_min": 20.07,
	"temp_max": 23.46
  },
  "weather": [
{
	"id": 800,
	"main": "Clear",
	"description": "clear sky",
	"icon": "01d"
  }
],
  "dt_txt": "2018-09-19 09:00:00"
}, {
  "main": {
	"temp": 20.46,
	"temp_min": 10.07,
	"temp_max": 20.46
  },
  "weather": [
{
	"id": 800,
	"main": "Clear",
	"description": "clear sky",
	"icon": "01d"
  }
],
  "dt_txt": "2018-09-19 12:00:00"
}, {
  "main": {
	"temp": 22.46,
	"temp_min": 21.07,
	"temp_max": 22.46
  },
  "weather": [
{
	"id": 800,
	"main": "Clear",
	"description": "clear sky",
	"icon": "01d"
  }
],
  "dt_txt": "2018-09-20 12:00:00"
}
];