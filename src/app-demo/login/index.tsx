import React, { useEffect, useMemo, useState, useReducer, useContext } from 'react';
import { RouteComponentProps } from '@reach/router'
import _ from 'lodash'
import { ComponentLifeCycle } from '@kits'

import style from './index.module.less';
import HederInfo from './components/header'
import InputInfo from './components/input-info'
import AllAction from './components/all-action'
import TestHooks from './components/test-hooks'

interface IProps extends RouteComponentProps {

}

export default class Login extends React.PureComponent<IProps, any> {

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={style["login-happy"]}>
        <HederInfo />
        <InputInfo />
        <AllAction />
        <TestHooks />
        <div className='container'>
          <div className='middle'></div>
          <div className='left'></div>
          <div className='right'></div>
        </div>
      </div>
    )
  }

  action(e: any) {
    console.log(e)
    console.log(e.target)

    console.log(e.currentTarget)
  }

}
