import { handleActions, ReducerMapValue } from 'redux-actions';
import { IState, EACTIONTYPE } from './type'
import { RYReducer } from '@reduxConfig'


const initialState: IState = {
    userInfo: {
        name: '',
        age: '',
        sex: ''
    }
};

export const reducers: { [key in EACTIONTYPE]: ReducerMapValue<IState, any> } = {
    
    'REDUX_DEMO_UPDATE_USER_INFO': RYReducer((draft, payload) => {
        draft.userInfo = payload
    }),
    

}

export default handleActions(reducers, initialState)
