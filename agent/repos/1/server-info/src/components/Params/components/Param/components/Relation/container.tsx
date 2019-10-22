import {connect} from "react-redux";
import {IStoreState} from "../../../../../../store";
import ui from './Relation';

export default connect(
  (state: IStoreState) =>
    ({
      params: [...state.params]
    })
)(ui)