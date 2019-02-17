import React from 'react';
import VisibleServiceListForm from './serviceList';
import { Button, Modal, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { services } from './data';
import { setServiceList } from './actions';

class CesiumServiceWidget extends React.Component{

  services = [
    'areacheck',
    'snpull',
  ];

  constructor(){
      super();
      this.state = {
        showModal : false,
      }
    }



  handleOpen = () => {
    this.setState({
      showModal: true
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false
    });
  }

  serviceListRequest = () => {
    //dispatch(setServiceList(services));
  }

  componentWillMount = () => {
      /* Query backend for list of available services */
      /* Return canned response meanwhile */

      this.setState({services: this.services});
  }


  render(){

      return (
        <Modal centered={false} trigger={
          <Button> Cesium </Button>
        }
        basic size='small'
        >
        <Modal.Header content='Choose a service' />
          <Modal.Content>
              <Segment>
                <VisibleServiceListForm services={this.props.services} />
              </Segment>
          </Modal.Content>
        </Modal>
        );
      }
}

const VisibleCesiumServiceWidget = connect()(CesiumServiceWidget);
export default VisibleCesiumServiceWidget;
