import React from 'react';
import './index.less';
import LoginAction from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RYActions<typeof LoginAction>, IState { }

class Index extends React.PureComponent<IProps, any> {

  render() {
    console.log(' --------> input info render')
    return (
      <div className="login-header">
        <span >Login input info</span>
        <div onClick={this._add.bind(this)}>+</div>
        <span>{this.props.inputInfoCount}</span>
        <div onClick={this._sum.bind(this)}>-</div>


        <div>{this.props.userInfo.age}</div>
        <div>{this.props.userInfo.name}</div>
        <div>{this.props.userInfo.sex}</div>



      </div>
    )
  }

  _add() {
    this.props.actions.addInputInfo(1)
  }

  _sum() {
    this.props.actions.sumInputInfo(1)
  }

}


export default RYConnect<IState>(['LoginReducer'], ['inputInfoCount', 'userInfo'], [LoginAction])(Index)
