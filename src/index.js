import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './COMPONENTS/App';
import reportWebVitals from './reportWebVitals';
import Chat from './COMPONENTS/Chat'
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/chat' component={Chat} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
