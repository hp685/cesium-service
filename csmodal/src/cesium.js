import React from 'react';
//import InputRow from 'inputElements';


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
      "serial_number" : "",
      "uut_type": "",
    
    }
  ]
}


class CesiumRequestForm extends React.Component{

  constructor(){
    super();
    this.state = {
        requestData : null,
        userInput : [],
        formData : {},
        serviceResponse: null,
    };
  }


componentWillMount(){
  console.log(this.props.chosen);
  this.setState({service: this.props.service && this.props.service.value});
  this.serviceSchemaRequest();

}

componentWillReceiveProps(props){
  console.log(props, this.state);
  this.setState({
    service: props.service && props.service.value
  });
}

serviceSchemaRequest = () => {
  /*Query backend to obtain schema for this.state.service*/
  /* Hard coded for now*/
  this.setState({
    requestData: data
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  //send form data to backend and render response
  // set serviceResponse
}

handleChange = (e) => {
  console.log(e.target.name, e.target.value);
  let formData = this.state.formData;
  formData[e.target.name] = e.target.value
  this.setState({
    formData: formData
  })
}

formFromFields = (data, service) => {

  service = service && service.value;
  let rows = [];
  console.log(data, service);
  data = service && data[service];
  console.log(data);
  if(data){
    
    console.log(data.fields);
    data.fields.map((row) => {
        rows.push(
        <div>
          <label> {row.label} </label>
          <input type="text" name={row.key} key={row.key} id={row.key} onChange={this.handleChange}/>
        </div>

      );
    });
  }

  if (data && data.fields.length){
      rows.push(<input type="submit"/>);
  }

  return rows;

};


render(){
        /*If service isn't selected yet, render blank select box*/
       
  console.log(this.state.requestData);
  return (
    <div>
        <form onSubmit = {this.handleSubmit}>
          {this.formFromFields(this.state.requestData, this.props.service)}
        </form>
    </div>
          );
  }
}

export default CesiumRequestForm;
