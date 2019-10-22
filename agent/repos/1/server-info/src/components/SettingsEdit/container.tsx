import {connect} from "react-redux";
import {IStoreState} from "../../store";
import {checkConnectionStatus, setIp, setIsWorking, setTimeDelay} from "../../store/settings";
import ui from './SettingsEdit';

export default connect(
  (state: IStoreState) =>
    ({
      ip: state.settings.ip,
      isWorking: state.settings.isWorking,
      timeDelay: state.settings.timeDelay,
    }),
  {
    setIp,
    setIsWorking,
    setTimeDelay,
    checkConnectionStatus,
  }
)(ui)