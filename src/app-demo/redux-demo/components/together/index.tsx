import React from 'react';
import './index.less';
import { RYActions, RYConnect } from '@reduxConfig'

import ReduxDemoAction from "../../action";
import { IState } from '../../type'
import HomeAction from '../../../home/action'
import { IState as IHomeState } from '../../../home/type'

import { Flex } from 'antd-mobile'

interface IProps extends RYActions<typeof ReduxDemoAction & typeof HomeAction>, IState, IHomeState { }

class Index extends React.PureComponent<IProps, any> {

  render() {
    console.log(' -------->  together page render')
    return (
      <Flex className="together-content" direction='column'>
        <span>ReduxDemoPage and HomePage Together</span>
        <Flex direction='row' justify='around' style={{width: '100%'}}>
          <Flex direction='column'  >
            <span>home page</span>
            <span onClick={this.homeAdd.bind(this)}>+</span>
            <span>{this.props.homeCount}</span>
            <span onClick={this.homeSum.bind(this)}>-</span>
          </Flex>
          <Flex direction='column'  >
            <span>redux demo</span>
            <span onClick={this.reduxDemoAdd.bind(this)}>+</span>
            <span>{this.props.inputInfoCount}</span>
            <span onClick={this.reduxDemoSum.bind(this)}>-</span>
          </Flex>
        </Flex>
      </Flex>
    )
  }


  homeAdd() {
    this.props.actions.homeAdd(1)
  }

  homeSum() {
    this.props.actions.homeSum(1)
  }

  reduxDemoAdd() {
    this.props.actions.addInputInfo(1)
  }

  reduxDemoSum() {
    this.props.actions.sumInputInfo(1)
  }

}


export default RYConnect<IState & IHomeState>(['ReduxDemoReducer', 'HomeReducer'], ['inputInfoCount', 'homeCount'], [ReduxDemoAction, HomeAction])(Index)
