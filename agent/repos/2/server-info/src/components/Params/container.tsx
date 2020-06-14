import {connect} from "react-redux";
import {IStoreState} from "../../store";
import {synchronize} from "../../store/params";
import ui from './Params';

export default connect(
  (state: IStoreState) =>
    ({
      params: [...state.params],
      isWorking: state.settings.isWorking,
      isConnected: state.settings.isConnected,
      ip: state.settings.ip,
      timeDelay: state.settings.timeDelay,
    }),
  {
    synchronize,
  }
)(ui)