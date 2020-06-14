import React from 'react';
import {Button} from "react-bootstrap";
import {stateUrl} from "../../store";
import './ExportButton.css';

interface IProps {
  ip: string;
  isWorking: boolean;
  isConnected: boolean;
}

interface IState {
  isActive: boolean;
}

class ExportButton extends React.PureComponent<IProps, IState> {
  private jsonpCallbackName = 'getExportJson'

  constructor(props: IProps) {
    super(props)
    this.state = {
      isActive: props.isWorking && props.isConnected,
    }
  }

  public componentDidMount() {
    (window as any)[this.jsonpCallbackName] = (exportObj: any) => {
      const exportName = 'export';
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    const {props} = this
    if ((props.isWorking !== nextProps.isWorking) || (props.isConnected !== nextProps.isConnected)) {
      this.setState({
        isActive: props.isWorking && props.isConnected,
      })
    }
  }

  public render() {
    const {
      download,
      state: {
        isActive,
      }
    } = this
    return (
      <div className='export-button'>
        <a
          onClick={isActive ? download : x=>x}
        >
          <Button
            variant="outline-secondary"
            type='button'
            disabled={!isActive}
          >
            Экспортировать данные
          </Button>
        </a>
      </div>
    );
  }

  private download = () => {
    const {
      props: {
        ip
      }
    } = this

    // jsonp download
    const script = document.createElement("script");
    script.src = `${stateUrl}/${ip}.json?callback=${this.jsonpCallbackName}`;
    script.async = true;
    document.body.appendChild(script);
  }
}

export default ExportButton;