import { EACTIONTYPE } from './type'
import {RYCreateAction} from '@reduxConfig'


const actions = {
    add: RYCreateAction<number>(EACTIONTYPE.LOGIN_CHECK_LOGIN_ADD, (n) => {
        console.log(' =======> login action', n)
        return n
    }),
    sum: RYCreateAction<number>(EACTIONTYPE.LOGIN_CHECK_LOGIN_SUM, (n: any) => n)
}

export default actions
