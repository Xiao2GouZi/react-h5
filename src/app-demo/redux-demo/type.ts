
export interface IState {
    headerCount: number,
    inputInfoCount: number,
    userInfo: {
        name: string,
        age: string,
        sex: string
    }
}



export enum EACTIONTYPE {
    REDUX_DEMO_UPDATE_USER_INFO = 'REDUX_DEMO_UPDATE_USER_INFO',

    REDUX_DEMO_HEADER_ADD = 'REDUX_DEMO_HEADER_ADD',
    REDUX_DEMO_HEADER_SUM = 'REDUX_DEMO_HEADER_SUM',

    REDUX_DEMO_INPUT_INFO_ADD = 'REDUX_DEMO_INPUT_INFO_ADD',
    REDUX_DEMO_INPUT_INFO_SUM = 'REDUX_DEMO_INPUT_INFO_SUM',

    REDUX_DEMO_SET_SEX = 'REDUX_DEMO_SET_SEX',


} 
