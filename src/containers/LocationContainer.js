import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import { fetchForecasts, setLocation } from '../actions';
import 'react-dropdown/style.css';

export class LocationContainer extends Component {

  clearCityInput() {
    document.getElementById('cityInput').value = '';
  }

  onLocationChange(option) {
    const location = {country: option.value};
    this.clearCityInput();
    this.props.setLocation(location);
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.setLocation({city: evt.target.value});
      this.props.fetchForecasts();
      evt.preventDefault();
    }
  }

  render() {
    const weather = this.props.weather;
    const options = [
      {value: 'CN', label: 'China'},
      {value: 'FR', label: 'France'},
      {value: 'LT', label: 'Lithuania'},
      {value: 'CH', label: 'Switzerland'},
    ];
    let currentTempClass = 'currentTemp no-display';
    if (weather.currentTemp) {
      currentTempClass = 'currentTemp';
    }

    return (
      <div>
        <Dropdown className="country" options={options} placeholder="Select a country" value={this.props.location.country} onChange={this.onLocationChange.bind(this)} />
        <input id="cityInput" className="city" name="city" type="text" placeholder="Search for a city" 
          onKeyPress={this.onKeyPress.bind(this)} />
        <div className="currentDate">{weather.currentDate}</div>
        <div className="currentCity">{weather.currentCity}</div>
        <div className={currentTempClass}>{this.props.weather.currentTemp}&deg;C</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    weather: state.weather
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchForecasts: () => dispatch(fetchForecasts()),
  setLocation: (location) => dispatch(setLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
