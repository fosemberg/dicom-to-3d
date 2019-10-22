import {IAction} from "../../utils/redux";
import {fetchStateJson, IStoreState} from "../index";
import {setIsConnectedAction} from "../settings/actions";
import {SYNCHRONIZE} from "./constants";

export const synchronize = () => (dispatch: any, getState: () => IStoreState) => {
  fetchStateJson(getState().settings.ip)
    .then(
      json => {
        if (json) {
          dispatch(setIsConnectedAction(true))
          dispatch(synchronizeAction(json))
        } else {
          dispatch(setIsConnectedAction(false))
        }
      }
    )
}

export const synchronizeAction = (json: any): IAction =>
  ({
    type: SYNCHRONIZE,
    payload: {
      json
    }
  })