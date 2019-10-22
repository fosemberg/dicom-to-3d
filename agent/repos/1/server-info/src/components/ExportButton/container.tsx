import {connect} from "react-redux";
import {IStoreState} from "../../store";
import ui from './ExportButton';

export default connect(
  (state: IStoreState) =>
    ({
      ip: state.settings.ip,
      isWorking: state.settings.isWorking,
      isConnected: state.settings.isConnected,
    })
)(ui)