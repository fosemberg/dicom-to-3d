import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {IParam, params} from './params'
import {ISettings, settings} from  './settings'
import {defaultSettingsState} from "./settings/reducers";

export const stateUrl = 'https://server-info-ea885.firebaseio.com'
// export const stateUrl = 'params'

export interface IStoreState {
  params: IParam[],
  settings: ISettings,
}

const storeFactory = (initialState: IStoreState) =>
  createStore(
    combineReducers({params, settings}),
    (localStorage['redux-store']) ?
      JSON.parse(localStorage['redux-store']) :
      initialState,
    compose(
      applyMiddleware(thunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() || compose
    )
  )

export const fetchStateJson = (ip: string, urlParams = '') =>
  fetch(`${stateUrl}/${ip.replace(/\./g, "_")}.json${urlParams && '?' + urlParams}`)
    .then(res => res.json())

export const getStore = () =>
  fetchStateJson(defaultSettingsState.ip)
    .then((json) => storeFactory(json))

export default getStore