import React from 'react';
import {IParam} from "../../store/params";
import Param from "./components/Param/Param";
import './Params.css';

interface IParams {
  params: IParam[];
  synchronize: () => void;
  isWorking?: boolean;
  isConnected?: boolean;
  ip?: string;
  timeDelay?: number;
}

class Params extends React.PureComponent<IParams, {}> {
  public static defaultProps: Partial<IParams> = {
    isWorking: true,
    timeDelay: 2,
  }

  private synchronizeInterval: any

  constructor(props: IParams) {
    super(props);
  }

  public componentWillReceiveProps(nextProps: Readonly<IParams>, nextContext: any): void {
    if (this.props.timeDelay !== nextProps.timeDelay) {
      clearInterval(this.synchronizeInterval)
      this.synchronizeInterval = setInterval(this.props.synchronize, this.secondToMilliSecond(nextProps.timeDelay))
    }
  }

  public componentDidMount(): void {
    this.props.synchronize()
    this.synchronizeInterval = setInterval(this.props.synchronize, this.secondToMilliSecond(this.props.timeDelay))
  }

  public componentWillUnmount(): void {
    clearInterval(this.synchronizeInterval)
  }


  public render() {
    const {
      props: {
        params,
        isWorking,
        isConnected,
        ip,
      }
    } = this

    return isWorking
      ? isConnected
        ? <table className='params'>
          <thead className='params__header'>
          <tr>
            <td className='params__header_main'>ПАРАМЕТР</td>
            <td className='params__header_value'>ЗНАЧЕНИЕ</td>
            <td/>
            <td className='params__header_value'>ЗНАЧЕНИЕ ВЛОЖ.</td>
            <td/>
            <td/>
          </tr>
          </thead>
          <tbody>
          {
            params
              .filter(({groupId}) => groupId && groupId.includes(1))
              .map((param, key) => <Param {...{key}} {...param}/>)
          }
          </tbody>
        </table>
        : <div className='params params_not-working'>Невозможно получить данные с ip: {ip}</div>
      : <div className='params params_not-working'>Получение данных с сервера выключено</div>
  }

  private secondToMilliSecond(sec?: number) {
    return sec ? sec * 1000 : 0;
  }
}

export default Params;