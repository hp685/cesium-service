import React from 'react';
import { Dropdown }  from 'semantic-ui-react';
import CesiumRequestForm from './cesium';


const servicePlaceholder = "Select cesium service";
const options = [
  {key: 'areacheck', value: 'areacheck', text: 'areacheck'},
  {key: 'snpull', value: 'snpull', text: 'snpull'},
]
class ServiceListForm extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        services : [],
        chosen : null,
      }
    }

    componentWillMount = () => {

      let services = this.props.services ? this.props.services
                                         : this.state.services;

       let options = services.map((e) => {
         return {
           key: e,
           value: e,
           text: e
         }

      });

      this.setState({
        services: options
      });
    }

    handleChange = (_, { value }) => {
      this.setState({
        chosen : value,
      });
    }

    render(){

      return (
        <div>
          <Dropdown fluid search selection
            placeholder={servicePlaceholder}
            options={this.state.services}
            onChange={this.handleChange}
            
            />

        {this.state.chosen &&
          <div>
            <CesiumRequestForm service={this.state.chosen} />
          </div>
        }
        </div>

    );
    }
}

export default ServiceListForm;
