import React, { useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from '@reach/router'
import LoginAction from "./action";
import { IState } from './type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RouteComponentProps, RYActions<typeof LoginAction>, IState { }

class Login extends React.PureComponent<IProps, any> {

  render() {
    return (
      <div className="login-app">
        <span onClick={this.up}>Login</span>
        <div onClick={this._add.bind(this)}>+</div>
        <span>{this.props.count}</span>
        <div onClick={this._sum.bind(this)}>-</div>
      </div>
    )
  }

  up = () => {
    this.props.navigate && this.props.navigate('/home', {})
  }

  _add() {
    this.props.actions.add(1)
  }

  _sum() {
    this.props.actions.sum(1)
  }

}


export default RYConnect(['LoginReducer'], [LoginAction])(Login)
