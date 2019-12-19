import React from 'react';
import './index.less';
import Action from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RYActions<typeof Action>, IState { }

class Index extends React.PureComponent<IProps, any> {

  componentDidMount(){
    this.props.actions.getUserInfo({mobile: '13800009999', passport: '*****'})
  }

  render() {
    console.log(' --------> input info render')
    return (
      <div className="user-info">
        <span >action</span>
        <p>{this.props.userInfo.age}</p>
        <p>{this.props.userInfo.name}</p>
        <p>{this.props.userInfo.sex}</p>
      </div>
    )
  }



}


export default RYConnect<IState>(['ReduxDemoReducer'], ['userInfo'], [Action])(Index)
