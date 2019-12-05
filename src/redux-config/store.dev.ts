
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducers from './reducers';
import { createLogger } from 'redux-logger'  // 日志
import thunk from 'redux-thunk';   // 异步
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';   // 可视化日志

const store = () => {
    const middleware = [] as any[];   // 中间件集合
    middleware.push(thunk);   // 异步
    middleware.push(batchDispatchMiddleware)

    // const stateTransformer = (state: any) => {       // 是将Immutable的转成可读
    //     const newState = {};
    //     for (const i of Object.keys(state)) {
    //         newState[i] = Immutable.Iterable.isIterable(state[i]) ? state[i].toJS() : state[i]
    //     }
    //     return newState;
    // };
    /**
     *  日志
     */
    const loggerMiddleware = createLogger({
        collapsed: true,
        diff: true,
        // stateTransformer
    });
    middleware.push(loggerMiddleware);
    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });

    return createStore(
        enableBatching(
            combineReducers({
                ...rootReducers,
                // router: routerReducer
            })),
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    );
};
export default store;