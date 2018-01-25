import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { warehouseReducer as warehouses } from './warehouses'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { rootReducers } from './root'

const configStore = (history) => {
  const middlewares = [ thunk, routerMiddleware(history)]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const combined =  combineReducers({
    ...rootReducers,
    warehouses,
    router: routerReducer
  })

  const store = createStore(
    combined,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default configStore;
