import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router'
import _ from 'lodash'
import { WindowScrollPosition, NetworkStatus } from '@kits'

import style from './index.module.less';
import HederInfo from './components/header'
import InputInfo from './components/input-info'
import AllAction from './components/all-action'


interface IProps extends RouteComponentProps {

}

export default class Login extends React.PureComponent<IProps, any> {

  componentDidMount() {

    // const position = WindowScrollPosition.useWindowScrollPosition()
    // console.log(' ====> position', position)

    const networkStatus =  NetworkStatus.useNetworkStatus()

    console.log(' ====> networkStatus', networkStatus)
    

    const a = { "a": 1 }

    console.log(' =====> login componentDidMount', _.cloneWith(a))

  }


  render() {
    return (
      <div className={style["login-happy"]}>
        <HederInfo />
        <InputInfo />
        <AllAction />
      </div>
    )
  }



}


