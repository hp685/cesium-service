import React from 'react';
import Select from 'react-select';
import CesiumRequestForm from './cesium';


const servicePlaceholder = "Select cesium service";
const options = [
  {label: 'areacheck', value: 'areacheck'},
  {label: 'snpull', value: 'snpull'},
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
           label: e,
           value: e
         }

      });

      this.setState({
        services: options
      });
    }

    handleChange = (option) => {
      this.setState({
        chosen : option,
      });
    }

    render(){

      return (
        <div>
          <Select value={this.state.chosen}
            options={this.state.services}
            onChange={this.handleChange}
            placeholder={servicePlaceholder}
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
