import {legacy_createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { typereducer } from './reducer'



export const store = legacy_createStore(typereducer, applyMiddleware(thunk));