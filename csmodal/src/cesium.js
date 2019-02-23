import React from 'react';
//import InputRow from 'inputElements';
import VisibleServiceResponse from './serviceResponse';
import { ScaleLoader } from 'react-spinners';
import { Button, Form, Label, Segment, Divider }  from 'semantic-ui-react';
import { connect } from 'react-redux';
import { chooseService, setField, clearForm } from './actions';


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

      "pidvid": {
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
  ],
  "error_message": "Invalid UUT Type",
  "operator": false,
  "engineer": true,
  "service": 'pidvid',  
  "debug_info":[
    {
      "apolloprod": "austrpd2",
      "local csa": "fxccsmapp1", 
      "regional_csa": "allncsmapp1",
      "uuid": "aabdas836ajhdb",
      "date": "07-4-2019 3:43 PST",
      "time taken": "10s"
      }
    ]
}


class CesiumRequestForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        requestData: null,
        userInput: [],
        formData: {},
        serviceResponse: null,
        isLoading:  false,
        clearForm : false
    };

  }


componentWillMount(){
  this.setState({
    service: this.props.service,
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
                             onChange={this.props.handleChange}
                             value={(this.props.schema && this.props.schema[row.key]) ? this.props.schema[row.key]: ""}
                              />
        </Form.Field>
        );
    });
  }

  if (data && data.fields.length){
      rows.push(
        <Button type="submit">
          Submit
        </Button>
      );
      rows.push(
        <Button
        onClick={this.props.reset}
        >
          Reset
        </Button>
      )
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
                <VisibleServiceResponse response={this.state.serviceResponse}/>

            </div>
          }
      </div>
          );
  }
}

const mapStateToProps = (state) => {
  return {
    service: state.selectedService,
    schema : state.schema[state.selectedService]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      dispatch(setField(e.target.name, e.target.value));
    },

    reset: (e) => {
      e.preventDefault();
      dispatch(clearForm());
    }
  }
}

const VisibleCesiumRequestForm = connect(
  mapStateToProps, mapDispatchToProps
)(CesiumRequestForm);

export default VisibleCesiumRequestForm;
