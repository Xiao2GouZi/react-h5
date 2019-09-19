import * as React from 'react'
import './index.less'

interface IProps {
  width: string
  left: number
  right: number
  className?: string
}

interface IState {}

export default class Divider extends React.Component<IProps, IState> {
  static defaultProps = {
    width: '100%',
    left: 0,
    right: 0
  }

  render() {
    let _width = this.props.right + this.props.left
    return (
      <div
        className="ry-divider-line className"
        style={{
          width: `calc(100% - ${_width}rem)`,
          marginLeft: `${this.props.left}rem`
        }}
      ></div>
    )
  }
}