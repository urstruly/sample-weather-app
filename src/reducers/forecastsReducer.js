const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const noError = {
  error: false,
  errorMessage: ''
};
const defaultForecastCount = 3;

export default function reducer(state = {
  forecasts: [],
  count: defaultForecastCount,
  fetching: false,
  ...noError
}, action) {
  switch (action.type) {

    case 'FETCH_FORECASTS_PENDING':
      state = {...state, fetching: true, ...noError};
      break;

    case 'FETCH_FORECASTS_FULFILLED':
      // Just pick the forecast at noon everyday, since the other API isn't working.
      const forecasts = action.payload.data.list.filter(forecast => forecast.dt_txt.endsWith('12:00:00'));
      const mappedforecasts = forecasts.map(forecast => {
        const icon = forecast.weather[0].icon;
        const day = new Date(forecast.dt_txt).getDay();

        return {
          day: WEEK_DAYS[day],
          iconAltText: forecast.weather[0].description,
          iconUrl: `http://openweathermap.org/img/w/${icon}.png`,
          tempMax: forecast.main.temp_max,
          tempMin: forecast.main.temp_min
        }
      });

      state = {
        ...state,
        forecasts: mappedforecasts,
        fetching: false,
        ...noError
      };
      break;

    case 'FETCH_FORECASTS_REJECTED':
      state = {...state, fetching: false, error: true, errorMessage: action.payload.response.data.message};
      break;

    case 'SET_FORECAST_COUNT':
        state = Object.assign({}, state, action.payload, noError);
      break;

    default:
      break;
  }

  return state;
}