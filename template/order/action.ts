import { EACTIONTYPE } from './type'
import { RYCreateAction, RYActionDispatch } from '@reduxConfig'
import * as WebApi from './web-api'



const actions = {

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
