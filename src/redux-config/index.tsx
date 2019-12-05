import React from 'react'

import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createSelector, Selector } from 'reselect'
import { Util } from '@kits'
import { createAction, ActionFunction1, Action } from 'redux-actions'
import produce, { Draft } from 'immer'
import Store from './store'
import { IReducers } from './reducers'

export interface RYActions<T> {
    actions: T
}


/**
  *  propsKey
  *  1. undefined         返回的是所有的state
  *  2. ''， []           返回的是空
  *  3. 'XXXX', []        返回的是单个reducer的state
  *  4. ['XXXX', 'XXXX']  返回的是多个reducer的state
  * 
  *  subPropsKey   绑定指定的变量
  *  1. undefined    所有的
  *  2. ["a", "b"]  绑定a, b
  *  3. []  不绑定
  *  
  *  action
  *  1. undefined, []        不绑定action
  *  2. action1, [action1]   绑定单个action
  *  4. [action1, action2]   绑定多个action
  *
  *  TODO:   两个reducer action 同名的问题需要解决
  * 
  *  TODO:   props, status 属性定义
  */
function RYConnect<IState = {}>(propsKey: (keyof IReducers) | (keyof IReducers)[] | undefined, subPropsKey: (keyof IState)[] | undefined, actions: ActionCreatorsMapObject | ActionCreatorsMapObject[] | undefined) {
    return (WarpComponent: any): any => {
        const getVisilbleProps = () => {
            const getState: Selector<IReducers, IReducers> = (reducers) => reducers
            return createSelector(getState, (reducers: IReducers) => {
                let allState = {} as IState
                if (Util.dataType(propsKey) === 'String') {
                    const _key = propsKey as (keyof IReducers)
                    allState = reducers[_key]
                }
                if (Util.dataType(propsKey) === 'Array') {
                    const _key = propsKey as (keyof IReducers)[]
                    _key.forEach(item => {
                        allState = { ...allState, ...reducers[item] }
                    });
                }
                if (!subPropsKey) return allState
                let obj: any = {}
                subPropsKey.forEach(key => {
                    obj[key] = allState[key]
                })
                return obj
            })
        }
        const mapStateToProps = (state: IReducers) => {
            if (!propsKey) {
                return state
            }
            return getVisilbleProps()
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
* ß
* @param actionType 
* @param action 
*/
function RYCreateAction<T = any, M = any>(actionType: string, action?: ActionFunction1<T, M>) {
    if (action) {
        return createAction<M, T>(actionType, action)
    }
    return createAction(actionType)
}

/**
 * 
 * @param trick 
 */
function RYActionDispatch<T = {}>(trick: (param: T, dispatch: Dispatch) => void) {
    return (param: T) => {
        return (dispatch: Dispatch) => {
            trick(param, dispatch)
        }
    }

}


/**
 *  IState   数据源
 *  Payload  action.payload 数据类型
 * 
 * @param trick  state  immer 返回的draft
 *               payload action.payload的数据
 *  
 */
function RYReducer<IState = {}, Payload = {}>(trick: (draft: Draft<IState>, payload: Payload) => void) {
    return function (state: IState, action: Action<Payload>) {
        return produce(state, _draft => {
            trick(_draft, action.payload)
        })
    }
}


export {
    Store,
    RYConnect,
    RYCreateAction,
    RYActionDispatch,
    RYReducer
}