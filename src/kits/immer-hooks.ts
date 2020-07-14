import { useState, useReducer } from 'react'
import produce, { Draft } from 'immer'

export function useImmerState<Base>(initialState: Base): [Base, (trick: (draft: Draft<Base>) => void) => void] {
    const [state, setState] = useState<Base>(initialState)
    const setImmerState = (trick: (draft: Draft<Base>) => void) => {
        setState(pre => {
            return produce(pre, _draft => {
                trick(_draft)
            })
        })
    }
    return [state, setImmerState]
}


export function useImmerReducer<Base, Action>(reducer: (draft: Draft<Base>, action: Action) => void, initialState: Base) {
    const cReducer = (state: Base, action: Action): Base => {
        return produce(state, _draft => {
            reducer(_draft, action)
        })
    }
    return useReducer(cReducer, initialState)
}

// interface IIState {
//     sex?: string
// }

// interface IAction<T> {
//     type: string
//     payload: T
// }

// function name() {
//     // const [state, setState] = useImmerState({ sex: '1' })
//     // state.sex
//     // setState(draf => {
//     //     draf.sex = '2'
//     // })

//     const reducer = (draft: IIState, action: IAction<any>) => {
//         if (action.type === 'INCREMENT') draft.count++
//         if (action.type === 'DECREMENT') draft.count--
//         if (action.type === 'ADD') draft.count += action.payload
//     }

//     const [state, dispatch] = useImmerReducer(reducer, { sex: "1" })

// }


/**
 *
 * useImmerState
 *
 * const initialState = {
 *  clicks: 0,
 *  doubleClicks: 0
 * }
 *
 * const ClickCounters = () => {
 *  const [ state, setState ] = useImmerState(initialState)
 *  const onClick = () => setState(draft => { draft.clicks++ })
 *  const onDoubleClick = () => setState(draft => { draft.doubleClicks++ })
 *  return (
 *      <>
 *          <button onClick={onClick} onDoubleClick={onDoubleClick}>
 *              Clics: {state.clicks}, Double clicks: {state.doubleClicks}
 *          </button>
 *      </>
 *  )
 * }
 *
 */

/**
 *
 *  useImmerReducer
 *  const initialState = {
 *     count: 0
 *  }
 *     const reducer = (draft, action) => {
 *         if (action.type === 'INCREMENT') draft.count++
 *         if (action.type === 'DECREMENT') draft.count--
 *         if (action.type === 'ADD') draft.count += action.payload
 *     }
 *
 *     const Counter = () => {
 *     const [ state, dispatch ] = useImmerReducer(reducer, initialState)
 *     return (
 *          <>
 *             Count: {state.count}
 *             <button onClick={() => dispatch({ type: 'INCREMENT'})}>
 *                 Increment
 *             </button>
 *             <button onClick={() => dispatch({ type: 'DECREMENT'})}>
 *                 Decrement
 *             </button>
 *             <button onClick={() => dispatch({ type: 'ADD', payload: 5})}>
 *                 Add 5
 *             </button>
 *          </>
 *     )
 *    }
 *
 */