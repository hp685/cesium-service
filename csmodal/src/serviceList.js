import React from 'react';
import { Dropdown }  from 'semantic-ui-react';
import VisibleCesiumRequestForm from './cesium';
import {connect} from 'react-redux';
import {chooseService} from './actions';
const servicePlaceholder = "Select cesium service";

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

      this.setState({services: options});
    }

    render(){
      return (
        <div>
          <Dropdown fluid search selection
            placeholder={servicePlaceholder}
            options={this.state.services}
            onChange={this.props.handleChange}
            value={this.props.selectedService}
            clearable={true}
            />

        {this.props.selectedService &&
          <div>
            <VisibleCesiumRequestForm />
          </div>
        }
        </div>
    );
    }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    selectedService: state.selectedService
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (_ , {value}) => {
      dispatch(chooseService(value));
    }
  }
}

const VisibleServiceListForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceListForm);
export default VisibleServiceListForm;
