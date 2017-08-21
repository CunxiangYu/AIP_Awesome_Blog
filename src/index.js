import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//React entry point file
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
