import {connect} from "react-redux";
import {IStoreState} from "../../store";
import ui from './SettingsView';

export default connect(
  (state: IStoreState) =>
    ({
      isConnected: state.settings.isConnected,
      isWorking: state.settings.isWorking,
      timeDelay: state.settings.timeDelay,
    })
)(ui)