import { EACTIONTYPE } from './type'
import { createAction, ActionFunction1, Action, ActionFunction0, ActionFunctionAny } from 'redux-actions'
import { ActionCreatorsMapObject } from 'redux';



export interface IAction extends ActionCreatorsMapObject {
    add: ActionFunction1<number, Action<number>>,
    sum: ActionFunction1<number, Action<number>>
}

const actions: IAction = {
    add: createAction(EACTIONTYPE.HOME_CHECK_LOGIN_ADD, (n: number) => {
        console.log(' =======> home action', n)
        return n
    }),
    sum: createAction(EACTIONTYPE.HOME_CHECK_LOGIN_SUM, (n: any) => n)
}

export default actions
