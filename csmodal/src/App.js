import React from 'react';
import ReactModal from 'react-modal';
import ServiceListForm from './serviceList';

let services = [
  'areacheck',
  'snpull',
];

class CesiumServiceWidget extends React.Component{

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

  componentWillMount = (props) => {
      /* Query backend for list of available services */
      /* Return canned response meanwhile */

      this.setState({services: services});
  }

  render(){
    if (this.state.showModal){
      return (
        <div>
          <ReactModal isOpen={this.state.showModal}>
              <div>
                <ServiceListForm services={this.state.services} />
              </div>
            <button onClick={this.handleClose} > Close </button>
          </ReactModal>
        </div>
      );
    }
    else{
      return (
        <div id="cesium-service-widget">
          <button onClick={this.handleOpen}> Cesium Service </button>
          </div>
        );
    }
  }
}
export default CesiumServiceWidget;
