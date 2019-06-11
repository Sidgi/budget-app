import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { Router} from 'react-router-dom';
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, 
document.getElementById('root'));

