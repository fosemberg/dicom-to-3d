import * as React from 'react';
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import {BuildId, IClientBuildDetailedResult, IClientBuildResult, Status, ACTION, TYPE} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import './BuildPage.scss';

import Loader from "../../components/Loader/Loader";
import {withRouter, RouteComponentProps} from "react-router";
import {crxClient} from "../../utils/CrxClient";

interface IBuildPageProps {
  getData: (buildId: BuildId) => Promise<IClientBuildDetailedResult>;
}

interface IBuildPageState {
  data: IClientBuildDetailedResult | {};
}

interface IMatchParams {
  id: string
}

const cnBuildPage = cn('BuildPage');

const isEmptyObject = (object: Object) => JSON.stringify(object) === '{}';

class BuildPage extends React.Component<IBuildPageProps & RouteComponentProps<IMatchParams>, IBuildPageState> {
  constructor(props: IBuildPageProps & RouteComponentProps<IMatchParams>) {
    super(props);
    this.state = {
      data: {},
    }
  }

  componentWillMount(): void {
    const {
      props: {
        getData,
        match: {
          params: {id}
        }
      }
    } = this;

    getData(id).then((data) => this.setState({data}));

    crxClient.subject$
      .subscribe(
        (message: any) => {
          console.log('message from Subscribe: ', message);
          if (message.type === TYPE.EVENT) {
            if (message.action === ACTION.BUILD_RESULT) {
              console.log('get', message);
              const data: IClientBuildDetailedResult = message;
              this.setState({data})
            }
          }
        }
      )
  }

  render() {
    const {state: {data}} = this;
    return (
      <div className={cnBuildPage()}>
        {
          isEmptyObject(data)
            ? <Loader/>
            : <BuildDetails
              {...(data as IClientBuildDetailedResult)}
            />
        }
      </div>
    )
  }
};

export default withRouter(BuildPage);