import { EACTIONTYPE } from './type'
import { RYCreateAction } from '@reduxConfig'



const actions = {
    homeAdd: RYCreateAction(EACTIONTYPE.HOME_CHECK_LOGIN_ADD, (n: number) => n),
    homeSum: RYCreateAction(EACTIONTYPE.HOME_CHECK_LOGIN_SUM, (n: any) => n)
}

export default actions
