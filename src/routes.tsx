import React, { useEffect } from 'react'
import { Router, globalHistory, Location, Redirect } from "@reach/router"

import Login from './app/login'

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
            <Login path='/' default={false} />
            <Redirect to='login' from='/' noThrow /> 
        </Router>
    )
}

export default Locations;