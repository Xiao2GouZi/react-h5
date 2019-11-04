

import HomeReducer from '../app-demo/home/reducer'
import LoginReducer from '../app-demo/login/reducer'


export interface IReducers {
    LoginReducer: any,
    HomeReducer: any
}

const reducers: IReducers = {
    LoginReducer,
    HomeReducer
}

export default reducers