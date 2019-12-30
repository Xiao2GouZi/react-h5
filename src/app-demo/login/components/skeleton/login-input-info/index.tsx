import * as React from 'react'
import Styles from './index.module.less'


export default class Index extends React.PureComponent {

    render() {
        return (
            <div className={`${Styles.content}`}>
                <div className={`${Styles.skeleton_content}`} style={{ height: "100%", zIndex: 990, backgroundColor: "#fff" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.549%", top: "9.445%", left: "36.721%", width: "26.554%" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.399%", top: "11.994%", left: "0%", width: "100%" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.549%", top: "14.243%", left: "48.842%", width: "2.313%" }}></div>
                <div className={`${Styles.skeleton_item}`} style={{ height: "2.399%", top: "16.792%", left: "0%", width: "100%" }}></div>
            </div>
        )
    }


}