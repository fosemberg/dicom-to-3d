import * as React from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {IClientBuildResult, ACTION, TYPE, Message} from "../../utils/apiTypes";
import Loader from "../../components/Loader/Loader";
import {crxClient} from "../../utils/CrxClient";

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
    const {props:{getData}} = this;

    getData().then(
      (data) => this.setState({data})
    );

    crxClient.subject$
      .subscribe(
        (message: Message) => {
          console.log('message from Subscribe: ', message);
          if (message.type === TYPE.EVENT) {
            if (message.action === ACTION.START_BUILD) {
              console.log('get', message);
              const startBuild: IClientBuildResult = message.body;
              this.setState({
                data: [
                  startBuild,
                  ...this.state.data
                ]
              })
            } else if (message.action === ACTION.BUILD_RESULT) {
              console.log('get', message);
              const build: IClientBuildResult = message.body;
              this.setState({
                data: this.state.data.map(
                  result => result.buildId === build.buildId
                    ? build
                    : result
                )
              })
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