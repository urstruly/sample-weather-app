import axios from 'axios';

const API_KEY = '14ac029a9bef8962e2653444410fbc5c';

/**
 * Action to trigger an API request to get the current weather for the city provided
 * along with the forecast details for the specified number of days.
 */
export function fetchForecasts() {
    return (dispatch, getState) => {
        const { forecasts: { count }, location: { city, country } } = getState();
        // API gets 8 forecasts per day. We just show 1 per day.
        const apiCount = count * 8;

        return Promise.all([
            dispatch({
                type: 'FETCH_FORECASTS',
                payload: axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&cnt=${apiCount}&units=metric&appid=${API_KEY}`)
            }),
            dispatch({
                type: 'FETCH_CURRENT_WEATHER',
                payload: axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`)
            })
        ]);
    }
}

export function setLocation(payload) {
    return {
        type: 'SET_LOCATION',
        payload: payload
    }
}

export function setForecastCount(payload) {
    return {
        type: 'SET_FORECAST_COUNT',
        payload: payload
    }
}

/**
 * Multi-action to set the forecast range/count and fetch the forecasts based on that range.
 */
export function reRenderForecasts(payload) {
    return function (dispatch) {
        dispatch(setForecastCount(payload));
        dispatch(fetchForecasts());
    }
}
