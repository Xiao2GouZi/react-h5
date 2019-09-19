import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './app-demo/App';
import * as serviceWorker from './serviceWorker';


if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_V_CONSLO === 'true' ) {
    const VConsole  = require('vconsole')  
    new VConsole()
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
