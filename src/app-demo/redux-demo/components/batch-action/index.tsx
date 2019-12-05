import React from 'react';
import './index.less';
import Action from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'
import { batchActions } from 'redux-batched-actions'


interface IProps extends RYActions<typeof Action>, IState { }

class Index extends React.PureComponent<IProps, any> {

  render() {
    console.log(' --------> heder render')
    return (
      <div className="redux-demo-header">
        <span >batch action</span>
        <div onClick={this._add.bind(this)}>+</div>
        <span>{this.props.headerCount}</span>
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


export default RYConnect<IState>(['ReduxDemoReducer'], ['headerCount'], [Action])(Index)
