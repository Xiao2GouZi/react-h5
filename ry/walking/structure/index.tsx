import * as React from 'react'
import Styles from './index.module.less'


export default class Index extends React.PureComponent {

    render() {
        return (
            <div className={`${Styles.content}`}></div>
        )
    }


}