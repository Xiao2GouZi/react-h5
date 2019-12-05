import React, { useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from '@reach/router'
import HomeAction from "./action";
import { IState } from './type'
import { RYActions, RYConnect } from '@reduxConfig'


interface IProps extends RouteComponentProps, RYActions<typeof HomeAction>, IState {

}

class Home extends React.PureComponent<IProps, any> {

  render() {
    console.log(' --------> home page redner')
    return (
      <div className="login-app">
        <span>Home</span>
        <div onClick={this._add.bind(this)}>+</div>
        <span>{this.props.homeCount}</span>
        <div onClick={this._sum.bind(this)}>-</div>

        <span onClick={this.navigateToReduxDemo.bind(this)}>push redux-demo</span>
      </div>
    )
  }

  _add() {
    this.props.actions.homeAdd(1)
  }

  _sum() {
    this.props.actions.homeSum(1)
  }

  navigateToReduxDemo() {
    this.props.navigate && this.props.navigate('/redux-demo')
  }

}


export default RYConnect<IState>(['HomeReducer'], ['homeCount'], [HomeAction])(Home)
