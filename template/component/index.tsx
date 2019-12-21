import React from 'react';
import './index.less';
import Action from "../../action";
import { IState } from '../../type'
import { RYActions, RYConnect } from '@reduxConfig'

interface IProps extends RYActions<typeof Action>, IState { }

class Index extends React.PureComponent<IProps, any> {


  render() {
    console.log(' --------> input info render')
    return (
      <div className="user-info">
        <span >action</span>
      </div>
    )
  }



}


export default RYConnect<IState>([''], ['userInfo'], [Action])(Index)
