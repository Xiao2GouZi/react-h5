import React from 'react';
import './index.less';
import LoginAction from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RYActions<typeof LoginAction>, IState { }

class Index extends React.PureComponent<IProps, any> {
  componentDidMount() {
    this.props.actions.getUserInfo({ mobile: '13899990000', passport: '123123' })
  }

  render() {
    console.log(' --------> input info render')
    return (
      <div className="login-header">
        <span >user info - immr,thunk </span>
        <div>{this.props.userInfo.age}</div>
        <div>{this.props.userInfo.name}</div>
        <div>{this.props.userInfo.sex}</div>
        <span onClick={this.setSex.bind(this)}>修改性别</span>
      </div>
    )
  }

  setSex() {
    this.props.actions.setSex('女')
  }



}


export default RYConnect<IState>(['ReduxDemoReducer'], ['userInfo'], [LoginAction])(Index)
