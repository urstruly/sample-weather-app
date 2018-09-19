import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationContainer from './LocationContainer';
import ForecastContainer from '../components/ForecastContainer';
import { reRenderForecasts } from '../actions';
import '../App.css';

class App extends Component {
  render() {
    const { fetching, error, errorMessage } = this.props.forecasts;
    let errorClass = 'error-message no-display',
        loadingClass = 'loading no-display';
    if (error) {
      errorClass = 'error-message';
    }
    if (fetching) {
      loadingClass = 'loading';
    }

    return (
      <div>
        <div className={loadingClass}>Loading&#8230;</div>
        <div className={errorClass}>{errorMessage}. Please fix the error and try again.</div>
        <header className="header">
          <LocationContainer/>
        </header>
        <ForecastContainer forecasts={this.props.forecasts} reRenderForecasts={this.props.reRenderForecasts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forecasts: state.forecasts
  }
};

const mapDispatchToProps = (dispatch) => ({
  reRenderForecasts: (forecastCount) => dispatch(reRenderForecasts(forecastCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
