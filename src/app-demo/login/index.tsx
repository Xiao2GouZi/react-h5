import React, { useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from '@reach/router'

interface IProps extends RouteComponentProps {

}

export default class login extends React.PureComponent<IProps> {

  componentDidMount() {
    console.log(' -----> __DEV__', __DEV__)

    console.log(' -----> VERSION', VERSION)

    console.log(process.env)
  }

  render() {
    return (
      <div className="login-app">
        <span>app-demo</span>
      </div>
    )
  }
}

