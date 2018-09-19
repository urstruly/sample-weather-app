import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import store from './store';

const app = document.getElementById('root');

ReactDOM.render(<Provider store={store}>
	<App />
</Provider>, app);
