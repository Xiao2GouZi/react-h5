import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Routes from './routes-demo';
import * as serviceWorker from './serviceWorker';
import { LoadScript } from '@kits'

LoadScript()



ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
