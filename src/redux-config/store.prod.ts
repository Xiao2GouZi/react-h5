
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';   // 异步
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions';



const store = () => {
    const middleware = [] as any[];   // 中间件集合
    middleware.push(thunk);   // 异步
    middleware.push(batchDispatchMiddleware);

    return createStore(
        enableBatching(
            combineReducers({
                ...rootReducers,
            })
        ),
        compose(
            applyMiddleware(...middleware)
        )
    );
};


export default store;