import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router'

import './index.less';
import HederInfo from './components/header'
import InputInfo from './components/input-info'
import AllAction from './components/all-action'


interface IProps extends RouteComponentProps {

}

export default class Login extends React.PureComponent<IProps, any> {

  render() {
    return (
      <div >
        <HederInfo />
        <InputInfo />
        <AllAction />
      </div>
    )
  }



}


