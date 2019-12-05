import { EACTIONTYPE } from './type'
import { RYCreateAction, RYActionDispatch } from '@reduxConfig'

import * as WebApi from './web-api'




const actions = {
    addHeader: RYCreateAction<number>(EACTIONTYPE.REDUX_DEMO_HEADER_ADD, (n) => n),
    sumHeader: RYCreateAction<number>(EACTIONTYPE.REDUX_DEMO_HEADER_SUM, (n) => n),
    addInputInfo: RYCreateAction<number>(EACTIONTYPE.REDUX_DEMO_INPUT_INFO_ADD, (n) => n),
    sumInputInfo: RYCreateAction<number>(EACTIONTYPE.REDUX_DEMO_INPUT_INFO_SUM, (n) => n),

    setSex: RYCreateAction(EACTIONTYPE.REDUX_DEMO_SET_SEX, (n) => n),

    updataInfo: RYCreateAction<number>(EACTIONTYPE.REDUX_DEMO_UPDATE_USER_INFO, (n) => n),

    getUserInfo: RYActionDispatch<{mobile: string, passport: string}>(async (param, dispatch) => {
        console.log(' -------> RYActionDispatch ', param)
        const { code, res, err } = await WebApi.getSomethingInfo()
        if (!err) {
            setTimeout(() => {
                dispatch(actions.updataInfo(res))
            }, 5000)

        }
    })

}

export default actions
