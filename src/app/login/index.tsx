import React, { useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from '@reach/router'

interface IProps extends RouteComponentProps {

}

export default class login extends React.PureComponent<IProps> {

  render() {
    return (
      <div className="login-app">
        <span>app-demo</span>
      </div>
    )
  }
}

