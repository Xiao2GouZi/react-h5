import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router'

import './index.less';
import HederInfo from './components/batch-action'
import InputInfo from './components/action'
import Together from './components/together'
import UserInfo from './components/user-info'


interface IProps extends RouteComponentProps {

}

export default class Login extends React.PureComponent<IProps, any> {

  render() {
    return (
      <div >
        <HederInfo />
        <InputInfo />
        <Together />
        <UserInfo />
      </div>
    )
  }



}


