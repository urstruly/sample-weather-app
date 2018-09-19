import { combineReducers } from 'redux';

import location from './locationReducer';
import forecasts from './forecastsReducer';
import weather from './weatherReducer';

export default combineReducers({
  location,
  forecasts,
  weather
})