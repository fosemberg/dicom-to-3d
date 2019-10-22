import React from 'react';
import {Form} from "react-bootstrap";
import {defaultTimeDelay} from "../../store/settings/reducers";
import './SettingsEdit.css';

interface IProps {
  ip?: string;
  isWorking?: boolean;
  timeDelay?: number;

  setIp: (ip: string) => void;
  setIsWorking: (isWorking: boolean) => void;
  setTimeDelay: (timeDelay: number) => void;

  checkConnectionStatus: (ip?: string) => void;
}

interface IState {
  ip: string;
  isWorking: boolean;
  timeDelay: number;
}

class SettingsEdit extends React.PureComponent<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    ip: '-',
    isWorking: false,
    timeDelay: defaultTimeDelay,
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      ip: props.ip!,
      isWorking: props.isWorking!,
      timeDelay: props.timeDelay!,
    }
  }

  public componentDidMount(): void {
    this.props.checkConnectionStatus();
  }

  public render() {
    const {
      state: {
        ip,
        isWorking,
        timeDelay,
      }
    } = this
    return (
      <div className='settings-edit'>
        <div className='container'>
          <Form>
            <Form.Group>
              <Form.Label>
                Подключиться
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="192.168.1.1"
                defaultValue={ip}
                onChange={this.handleIpChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='checkbox'
                label='Работает'
                defaultChecked={isWorking}
                onChange={this.handleIsWorkingChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Задержка
              </Form.Label>
              <Form.Control
                placeholder={defaultTimeDelay.toString()}
                defaultValue={timeDelay!.toString()}
                onChange={this.handleTimeDelayChange}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  };

  private handleIpChange = (event: any) => {
    const {value: ip} = event.target
    this.setState({
      ip
    });
    this.props.setIp(ip)
  }

  private handleIsWorkingChange = (event: any) => {
    const {checked: isWorking} = event.target
    this.setState({
      isWorking
    });
    this.props.setIsWorking(isWorking)
  }

  private handleTimeDelayChange = (event: any) => {
    const {value: timeDelay = 1} = event.target
    this.setState({
      timeDelay
    });
    this.props.setTimeDelay(timeDelay)
  }
}

export default SettingsEdit;