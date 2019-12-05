import React from 'react';
import './index.less';
import LoginAction from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'
import { batchActions } from 'redux-batched-actions'

interface IProps extends RYActions<typeof LoginAction>, IState { }

class Index extends React.PureComponent<IProps, any> {

  render() {
    console.log(' --------> all action render')
    return (
      <div className="login-header">
        <span >all action</span>
        <div onClick={this._add.bind(this)}>+</div>
        <div onClick={this._sum.bind(this)}>-</div>
      </div>
    )
  }

  _add() {
    batchActions([
      this.props.actions.addHeader(1),
      this.props.actions.addInputInfo(1)
    ])
  }

  _sum() {
    batchActions([
      this.props.actions.sumHeader(1),
      this.props.actions.sumInputInfo(1)
    ])
  }

}


export default RYConnect<IState>(['LoginReducer'], [], [LoginAction])(Index)
