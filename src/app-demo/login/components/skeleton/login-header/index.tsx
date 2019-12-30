import * as React from 'react'
import Styles from './index.module.less'


export default class Index extends React.PureComponent {

    render() {
        return (
            <div className={`${Styles.content}`}>
                <div className={`${Styles.skeleton_content}`} style={{ height: "100%", zIndex: 990, backgroundColor: "#fff" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.399%", top: "2.399%", left: "0%", width: "100%" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.549%", top: "4.648%", left: "48.842%", width: "2.313%" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.399%", top: "7.196%", left: "0%", width: "100%" }}></div>
            </div>
        )
    }


}