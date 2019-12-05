import { handleActions, ReducerMapValue, ReducerMap } from 'redux-actions';
import { IState, EACTIONTYPE } from './type'
import { RYReducer } from '@reduxConfig'


const initialState: IState = {
    homeCount: 0,
};


const reducers: { [key in EACTIONTYPE]: ReducerMapValue<IState, any> } = {
    'HOME_CHECK_LOGIN_ADD': RYReducer((draft, payload: number) => {
        draft.homeCount = draft.homeCount + payload
    }),
    'HOME_CHECK_LOGIN_SUM': RYReducer((draft, payload: number) => {
        draft.homeCount = draft.homeCount - payload
    })
};



export default handleActions(reducers, initialState)
