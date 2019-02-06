import React from 'react';
import ReactModal from 'react-modal';
import ServiceListForm from './serviceList';



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
        <div className="modal">
          <ReactModal isOpen={this.state.showModal}>
              <div id="service-list">
                <ServiceListForm services={this.state.services} />
              </div>
            <button onClick={this.handleClose} > Close </button>
          </ReactModal> 
          <button onClick={this.handleOpen}> Cesium Service </button>
          </div>
        );
  }
}


export default CesiumServiceWidget;
