import React from 'react';
import './index.less';
import LoginAction from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RYActions<typeof LoginAction>, IState { }

class Index extends React.PureComponent<IProps, any> {

  componentDidMount(){
    this.props.actions.getUserInfo({mobile: '13899990000', passport: '123123'})
  }

  render() {
    console.log(' --------> heder render')
    return (
      <div className="login-header">
        <span >Login header</span>
        <div onClick={this._add.bind(this)}>+</div>
        <span>{this.props.headerCount}</span>
        <div onClick={this._sum.bind(this)}>-</div>
      </div>
    )
  }

  _add() {
    this.props.actions.addHeader(1)
  }

  _sum() {
    this.props.actions.sumHeader(1)
  }

}


export default RYConnect<IState>(['LoginReducer'], ['headerCount'], [LoginAction])(Index)
