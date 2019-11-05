
import Store from './store'
import { IReducers } from './reducers'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Util } from '@kits'
import { createAction, ActionFunction1, Action, ActionFunction0, ActionFunctionAny } from 'redux-actions'


export interface RYActions<T> {
    actions: T
}

/**
  *  propsKey
  *  1. undefined   返回的是所有的state
  *  2. ''          返回的是空
  *  3. 'XXXX'      返回的是单个reducer的state
  *  4. []          返回的是空
  *  5. ['XXXX']    返回的是多个reducer的state
  * 
  *  
  *  action
  *  1. undefined            不绑定action
  *  2. action1              绑定单个action
  *  3. []                   不绑定action
  *  4. [action1, action2]   绑定多个action
  * 
  * 
  *  TODO:   导进来属性定义
  * 
  *  TODO:   两个reducer action 同名的问题需要解决
  *  
  */
function RYConnect<IState = {}, IAction = {}>(propsKey: (keyof IReducers) | (keyof IReducers)[] | undefined, actions: ActionCreatorsMapObject | ActionCreatorsMapObject[] | undefined) {
    return (WarpComponent: any): any => {
        const mapStateToProps = (state: IReducers) => {
            if (!propsKey) {
                return state
            }
            if (Util.dataType(propsKey) === 'String') {
                const _key = propsKey as (keyof IReducers)
                return state[_key]
            }
            if (Util.dataType(propsKey) === 'Array') {
                let _state = {}
                const _key = propsKey as (keyof IReducers)[]
                _key.forEach(item => {
                    _state = { ..._state, ...state[item] }
                });
                return _state
            }
            return {}
        }
        const mapDispatchToProps = (dispatch: Dispatch) => {
            if (!actions) return { actions: {} }
            if (Util.dataType(actions) === 'Object') {
                const _action = actions as ActionCreatorsMapObject
                return { actions: bindActionCreators(_action, dispatch) }
            }
            if (Util.dataType(actions) === 'Array') {
                const _actions = actions as ActionCreatorsMapObject[]
                let _action: ActionCreatorsMapObject = {}
                _actions.forEach(item => {
                    _action = { ..._action, ...item }
                })
                return { actions: bindActionCreators(_action, dispatch) }
            }
            return
        }

        // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}
        return connect(mapStateToProps, mapDispatchToProps)(WarpComponent)
    }
}

/**
*  包装 action
*   T -----> 入参
*   M -----> 返回
* 
* @param actionType 
* @param action 
*/
function RYCreateAction<T = any, M = any>(actionType: string, action?: ActionFunction1<T, M>) {
    if (action) {
        return createAction<M, T>(actionType, action)
    }
    return createAction(actionType)
}

export {
    Store,
    RYConnect,
    RYCreateAction
}