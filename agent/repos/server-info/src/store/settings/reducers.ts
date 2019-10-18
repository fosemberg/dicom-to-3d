import {IAction} from "../../utils/redux";
import {SET_IP, SET_IS_CONNECTED, SET_IS_WORKING, SET_TIME_DELAY} from "./constants";
import {ISettings} from "./stateDeclaration";

export const defaultTimeDelay = 1;

export const defaultSettingsState: ISettings = {
  ip: 'example',
  isConnected: true,
  isWorking: true,
  timeDelay: defaultTimeDelay,
}

export const settings = (state = defaultSettingsState, action: IAction) => {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected
      }
    case SET_IP:
      return {
        ...state,
        ip: action.payload.ip
      }
    case SET_IS_WORKING:
      return {
        ...state,
        isWorking: action.payload.isWorking
      }
    case SET_TIME_DELAY:
      return {
        ...state,
        timeDelay: action.payload.timeDelay
      }
    default:
      return state
  }
}