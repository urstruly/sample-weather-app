const initialState = {
  currentCity: '',
  currentDate: '',
  currentTemp: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_CURRENT_WEATHER_FULFILLED':
      const { data } = action.payload;
      state = {
        ...state,
        currentCity: data.name,
        currentDate: (new Date()).toDateString(),
        currentTemp: data.main.temp
      };
      break;

    case 'FETCH_CURRENT_WEATHER_REJECTED':

      /*
       * Don't handle errors here. Just reset to defaults.
       * Not going to do this extra work for the test.
       * In production apps, we could combine this error handling
       * together with the fetchForecasts handling.
       */
      state = initialState; 
      break;

    case 'FETCH_CURRENT_WEATHER_PENDING':
    default:
      // Do nothing!
      break;
  }

  return state;
}