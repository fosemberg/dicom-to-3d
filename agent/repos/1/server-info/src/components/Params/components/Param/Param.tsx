import React from 'react';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {IParam} from "../../../../store/params";
import Relation from "./components/Relation/container";
import './Param.css'

interface IState {
  isOpen: boolean;
}

class Param extends React.PureComponent<IParam, IState> {
  constructor(props: IParam) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  public render() {
    const {
      state: {isOpen},
      props: {name, measureUnit, description, relations, value}
    } = this
    return (
      <React.Fragment>
        <tr className='param'>
          <td className='param_main'>
            <div className='param_name'>
              {name}{measureUnit && `, ${measureUnit}`}
            </div>
            <div className='param_description'>
              {description}
            </div>
          </td>
          <td className='param_value'>
            <div>{value}</div>
          </td>
          <td/>
          <td/>
          <td/>
          {
            relations
              ? <td
                className={`button_icon ${isOpen ? ' button_icon_active' : ''}`}
                onClick={this.toggleOpen}
              >
                {isOpen ? <FaAngleUp/> : <FaAngleDown/>}
              </td>
              : <td/>
          }
        </tr>
        {
          relations && isOpen &&
          <React.Fragment>
            <tr className='relation_wrapper'/>
            {relations.map((relation, key) => <Relation {...{key, relation}}/>)}
            <tr className='relation_wrapper'/>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

  private toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}

export default Param;