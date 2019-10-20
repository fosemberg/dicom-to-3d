import * as React from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {IClientBuildResult} from "../../utils/apiTypes";
import Loader from "../../components/Loader/Loader";
import {ACTION, crxClient, CrxClient, TYPE} from "../../utils/CrxClient";

interface IMainPageProps {
  getData: () => Promise<IClientBuildResult[]>;
}

interface IMainPageState {
  data: IClientBuildResult[];
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentWillMount(): void {
    this.props.getData && this.props.getData().then(
      (json) => {
        this.setState({
          data: json
        })
      }
    );
    crxClient.subject$
      .subscribe(
        (message: any) => {
          console.log('message from Subscribe: ', message);
          if (message.type === TYPE.EVENT) {
            if (message.action === ACTION.START_BUILD) {
              console.log('get', message);
              const startBuild: IClientBuildResult = message;
              this.setState({
                data: [
                  startBuild,
                  ...this.state.data
                ]
              })
            } else if (message.action === ACTION.BUILD_RESULT) {
              console.log('get', message);
            }
          }
        }
      )
  }

  render() {
    const {state: {data}} = this;
    return (
      <div className="MainPage">
        <BuildForm/>
        {
          data.length !== 0
            ? <BuildTable data={data}/>
            : <Loader/>
        }
      </div>
    )
  }
}

export default MainPage;