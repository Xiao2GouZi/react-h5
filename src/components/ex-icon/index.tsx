import classnames from 'classnames';
import * as React from 'react';
import '@assets/iconfont/iconfont.css'
import './index.less'


export interface IconProps {
    className?: string
    type: string;
    color?: string;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export default class Index extends React.Component<IconProps, any> {
    static defaultProps = {
        size: 'md',
        color: "#666666"
    };


    render() {
        const { type, className, size, color} = this.props;
        const cls = classnames(
            className,
            'ry-icon',
            `icon${type}`,
            `ry-icon-${size}`,
          );
        return (
            <span className={`iconfont ${cls}`} style={{color: color}} onClick={this.props.onClick}/>
        );
    }
}