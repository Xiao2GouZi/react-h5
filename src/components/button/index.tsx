import * as React from 'react'
import { WingBlank, Button } from 'antd-mobile'
import { ButtonProps } from 'antd-mobile/lib/button'

interface IProps extends ButtonProps {

}


export default class Index extends React.PureComponent<IProps> {


    render() {
        return (
            <WingBlank size='lg'>
                <Button type='primary' {...this.props} />
            </WingBlank>
        )
    }


}