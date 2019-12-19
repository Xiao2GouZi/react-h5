import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router'

import './index.less';
import UserInfo from './components/user-info'


interface IProps extends RouteComponentProps {

}

export default class Login extends React.PureComponent<IProps, any> {

  render() {
    return (
      <div >
        <UserInfo />
      </div>
    )
  }



}


