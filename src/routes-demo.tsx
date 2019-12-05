import React, { useEffect } from 'react'
import { Router, globalHistory, Location, Redirect } from "@reach/router"

import Login from './app-demo/login'
import Home from './app-demo/home'
import ReduxDemo from './app-demo/redux-demo'
// import Detail from './app-demo/detial'

/**  */
globalHistory.listen(({ location, action }) => {
    console.log('listen', { location, action });
});

const Locations: React.FC = () => {
    return (
        <Location>
            {
                (context) => {
                    console.log(' -----------> content ', context)
                    return <Route />
                }
            }
        </Location>
    );
}

const Route: React.FC = () => {

    useEffect(() => {
        console.log(' ======> route demo useEffect ')
    })

    return (
        <Router>
            <Login path='login' default={false} />
            <Redirect to='login' from='/' noThrow /> 
            <Home path='home/*' />
            <ReduxDemo path='redux-demo'/>
            {/* <Detail path='detail' /> */}
            {/* <Redirect to='detail' from='home' noThrow /> */}
        </Router>
    )
}

export default Locations;