import * as React from 'react';
import {useParams} from "react-router-dom";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import {BuildId, IClientBuildDetailedResult, IClientBuildResult, Status} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import './BuildPage.scss';

import Loader from "../../components/Loader/Loader";
import {withRouter, RouteComponentProps} from "react-router";

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
    const {props: {getData,  match: {params: {id}}}} = this;

      if (id) getData(id).then((data) => this.setState({data}));
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