import React from 'react';
import ReactModal from 'react-modal';
import ServiceListForm from './serviceList';
import { Button, Modal, Image, Segment} from 'semantic-ui-react';

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
        basic size='small'>
        <Modal.Header content='Choose a service' />
          <Modal.Content>
              <Segment>
                <ServiceListForm services={this.state.services} />
              </Segment>
          </Modal.Content>
        </Modal>
        );
  }
}

export default CesiumServiceWidget;