import HomeReducer from '../app-demo/home/reducer'
import LoginReducer from '../app-demo/login/reducer'
import ReduxDemoReducer from '../app-demo/redux-demo/reducer'


export interface IReducers {
    LoginReducer: any,
    HomeReducer: any,
    ReduxDemoReducer: any
}

const reducers: IReducers = {
    LoginReducer,
    HomeReducer,
    ReduxDemoReducer
}



export default reducers