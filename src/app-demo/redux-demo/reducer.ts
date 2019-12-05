import { handleActions, ReducerMapValue } from 'redux-actions';
import { IState, EACTIONTYPE } from './type'
import { RYReducer } from '@reduxConfig'


const initialState: IState = {
    headerCount: 0,
    inputInfoCount: 0,
    userInfo: {
        name: '',
        age: '',
        sex: ''
    }
};

export const reducers: { [key in EACTIONTYPE]: ReducerMapValue<IState, any> } = {

    'REDUX_DEMO_HEADER_ADD': RYReducer<IState, number>((draft, payload) => {
        draft.headerCount = draft.headerCount + payload
    }),
    'REDUX_DEMO_HEADER_SUM': RYReducer((draft, payload) => {
        draft.headerCount = draft.headerCount - payload
    }),
    'REDUX_DEMO_INPUT_INFO_ADD': RYReducer<IState, number>((draft, payload) => {
        draft.inputInfoCount = draft.inputInfoCount + payload
    }),
    'REDUX_DEMO_INPUT_INFO_SUM': RYReducer((draft, payload) => {
        draft.inputInfoCount = draft.inputInfoCount - payload
    }),
    'REDUX_DEMO_UPDATE_USER_INFO': RYReducer((draft, payload) => {
        draft.userInfo = payload
    }),
    'REDUX_DEMO_SET_SEX': RYReducer((draft, payload) => {
        console.log(' =========> REDUX_DEMO_SET_SEX', payload)
        draft.userInfo.sex = payload
    })

}

export default handleActions(reducers, initialState)
