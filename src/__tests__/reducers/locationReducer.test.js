/* eslint no-undefined:0 */
import locationReducer from '../../reducers/locationReducer';
import { setLocation } from '../../actions';

describe('Location Reducer', () => {

	it('has a default state', () => {
		expect(locationReducer(undefined, {type: 'unexpected'})).toEqual({
			city: '',
			country: ''
		});
	});

	it('can handle setLocation action', () => {
		expect(locationReducer(undefined, setLocation({city: 'London'}))).toEqual({
			city: 'London',
			country: ''
		});

		expect(locationReducer(undefined, setLocation({country: 'GB'}))).toEqual({
			city: '',
			country: 'GB'
		});

		expect(locationReducer({city: 'Beijing', country: 'CN'}, setLocation({country: 'CH', city: 'Zurich'}))).toEqual({
			city: 'Zurich',
			country: 'CH'
		});

	});
});
