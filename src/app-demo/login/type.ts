
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
    LOGIN_UPDATE_USER_INFO = 'LOGIN_UPDATE_USER_INFO',

    LOGIN_HEADER_ADD = 'LOGIN_HEADER_ADD',
    LOGIN_HEADER_SUM = 'LOGIN_HEADER_SUM',

    LOGIN_INPUT_INFO_ADD = 'LOGIN_INPUT_INFO_ADD',
    LOGIN_INPUT_INFO_SUM = 'LOGIN_INPUT_INFO_SUM',

} 
