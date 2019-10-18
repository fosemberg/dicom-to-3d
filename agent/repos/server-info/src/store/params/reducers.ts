import {IAction} from "../../utils/redux";
import {SYNCHRONIZE} from "./constants";

export const params = (state = [], action: IAction) => {
  switch (action.type) {
    case SYNCHRONIZE:
      return action.payload.json.params
    default:
      return state
  }
}