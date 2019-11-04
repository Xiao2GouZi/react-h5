import { handleActions, ReducerMapValue } from 'redux-actions';
import { IState, EACTIONTYPE } from './type'


const initialState: IState = {
    count: 0,
};


const reducers: { [actionType: string]: ReducerMapValue<IState, number> } = {};

reducers[EACTIONTYPE.LOGIN_CHECK_LOGIN_ADD] = (state, action) => {
    // console.log(' ------> action', action)
    return { count: action.payload + state.count }
};

reducers[EACTIONTYPE.LOGIN_CHECK_LOGIN_SUM] = (state, action) => {
    return { count: state.count - action.payload }
};



export default handleActions<IState, number>(reducers, initialState)
