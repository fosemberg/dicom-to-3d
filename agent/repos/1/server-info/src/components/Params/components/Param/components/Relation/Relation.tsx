import React from 'react'
import {IParam} from "../../../../../../store/params"
import './Relation.css'

interface IProps {
  relation: string;
  params: IParam[];
}

class Relation extends React.PureComponent<IProps> {
  private readonly param: IParam | null;

  constructor(props: IProps) {
    super(props);
    this.param = this.getParamByName(props.relation, props.params)
  }

  public render() {
    const {
      param,
    } = this
    return param
      ? <tr className='relation'>
        <td/>
        <td className='relation_name'>{param.name}, {param.measureUnit}</td>
        <td/>
        <td className='relation_value'>
          <div>{param.value}</div>
        </td>
        <td/>
        <td className='button_icon'/>
      </tr>
      : null
  }

  private getParamByName = (name: string, params: IParam[]): IParam | null => {
    for (const param of params) {
      if (param.name === name) {
        return param
      }
    }
    return null
  }
}

export default Relation;