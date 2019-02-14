import React from 'react';
//import InputRow from 'inputElements';
import ServiceResponse from './serviceResponse';
import { ScaleLoader } from 'react-spinners';
import {Button, Form, Label, Segment, Divider}  from 'semantic-ui-react';
import connect from 'react-redux';


// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


let data =
  {
    
      "areacheck": {
        fields : [
          {key: "serial-number", label: "SN", required: true},
          {key: "uut", label: "UUT Type", required: true},
          {key: "area", label: "Area", required:true},
          {key: "timeframe", label: "Timeframe", required: false},
        ],
      },
    
      "snpull": {
        fields: [
          {key: "serial-number", label: "SN", required: true},
          {key: "uut", label: "UUT", required: true},
        ],
      },

  };

let serviceResponse = {
  "code" : "OK",
  "results": [
    {
      "serial_number" : "xxx",
      "uut_type": "yyy",
      "test_area" : "PCBP2",
      "timestamp" : "02/11/2019",
    }
  ]
}


class CesiumRequestForm extends React.Component{

  constructor(){
    super();
    this.state = {
        requestData: null,
        userInput: [],
        formData: {},
        serviceResponse: null,
        isLoading:  false,
    };
  }


componentWillMount(){
  this.setState({
    service: this.props.service && this.props.service.value,
  });
  this.serviceSchemaRequest();
  
}

componentWillUpdate(){
  if(this.state.serviceResponse){
    this.setState({
      serviceResponse: null,
    });
  }
};
serviceSchemaRequest = () => {
  /*Query backend to obtain schema for this.state.service*/
  /* Hard coded for now*/
  this.setState({
      requestData: data,
  });

 
}

handleSubmit = (e) => {
  e.preventDefault();
  //send form data to backend and render response
  // set serviceResponse

  this.setState({
    isLoading: true
  });
  sleep(1000).then(() => {
    this.setState({
      serviceResponse: serviceResponse,
      isLoading: false
    });
  });
}
 

handleChange = (e) => {
  let formData = this.state.formData;
  formData[e.target.name] = e.target.value
  this.setState({
    formData: formData
  })
}

formFromFields = (data, service) => {
  let rows = [];
  data = service && data[service];
 
  if(data){
        data.fields.map((row) => {
        rows.push(
        <Form.Field>
          <Label color="grey"> {row.label} </Label>
          <input placeholder={row.key} name={row.key} 
                             key={row.key} 
                             id={row.key} 
                             onChange={this.handleChange}
                              />
        </Form.Field>
        );
    });
  }

  if (data && data.fields.length){
      rows.push(<Button type="submit">
                  Submit
               </Button>
               );
  }

  return rows;

};


render(){

  return (
    <div>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            {this.formFromFields(this.state.requestData, this.props.service)}
          </Form>

          {
            this.state.isLoading && 
              <div>
                <ScaleLoader color="green"/>
              </div>
          }
      </Segment>
          {
            !this.state.isLoading && this.state.serviceResponse &&            
            <div>
                <ServiceResponse response={this.state.serviceResponse}/>

            </div>
          } 
      </div>
          );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services
  }
}



const VisibleCesiumRequestForm = connect(
  mapStateToProps,
)(CesiumRequestForm);

export default VisibleCesiumRequestForm;
