import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Routes from './routes-demo';
import * as serviceWorker from './serviceWorker';
import { LoadScript } from '@kits'


import { Provider } from "react-redux";
import { Store } from './redux-config'

LoadScript()

console.log(' -----> __DEV__', __DEV__)
console.log(' -----> VERSION', VERSION)
console.log(process.env)

ReactDOM.render(
    <Provider store={Store()}>
        <Routes />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
