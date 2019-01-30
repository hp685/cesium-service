import React from 'react';
import ReactModal from 'react-modal';
import CesiumRequestForm from './cesium';

class CesiumServiceWidget extends React.Component{

  constructor(){
      super();
      this.state = {
        showModal : false
      }

      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

  handleOpen(){
    this.setState({
      showModal: true
    });
  }

  handleClose(){
    this.setState({
      showModal: false
    })
  }

  render(){
    if (this.state.showModal){
      return (
        <div>
          <ReactModal isOpen={this.state.showModal}>
              //<CesiumRequestForm/>
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
