import { handleActions, ReducerMapValue, ReducerMap } from 'redux-actions';
import { IState, EACTIONTYPE } from './type'


const initialState: IState = {
    count: 0,
};


const reducers: { [actionType: string]: ReducerMapValue<IState, number> } = {};

reducers[EACTIONTYPE.HOME_CHECK_LOGIN_ADD] = (state, action) => {
    // console.log(' ------> action', action)
    return { count: action.payload }
};

reducers[EACTIONTYPE.HOME_CHECK_LOGIN_SUM] = (state: any, action: any) => {
    return { count: 0 }
};



export default handleActions<IState, number>(reducers, initialState)
