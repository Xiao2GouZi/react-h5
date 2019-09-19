import * as React from 'react'
import './index.less'
import ExIcon from '../ex-icon'


interface IProps {
  title?: string
  value?: string,
  palceholder?: string,
  onClick?: () => void
}

interface IState { }

export default class Divider extends React.Component<IProps, IState> {
  static defaultProps = {

  }

  render() {
    const { title, value, palceholder } = this.props
    return (
      <div className='ry-input-selected'>
        {title && <span className='ry-input-selected-title'>{this.props.title}</span>}
        {
          value ?
            <div className='ry-input-selected-value'>{value}</div> :
            <div className=' ry-input-selected-value ry-input-selected-palceholder'>{palceholder}</div>
        }
        <ExIcon type='jiantouxia' size='xs' onClick={this.props.onClick} className='ry-input-selected-icon'/>
      </div>
    )
  }
}