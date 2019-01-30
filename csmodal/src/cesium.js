import React from 'react';
//import InputRow from 'inputElements';


let data =
  {
    service : "areacheck",
    schema : [
        {key: "serial-number", label: "Serial Number", required: true},
        {key: "uut", label: "UUT Type", required: true},
        {key: "area", label: "Area", required:true},
        {key: "timeframe", label: "Timeframe", required: false},
    ],

  };


class CesiumRequestForm extends React.Component{

  constructor(){
    super();
    this.state = {
        services : false,
        selectedService: null,
        requestData : null,
        userInput : [],
    };
  }


componentWillMount(props){
  this.serviceListRequest();
}

handleChange = (e) => {

  let newUserInput = this.state.userInput;
  newUserInput[e.target.key] = e.target.value;

  this.setState({
      userInput: newUserInput
  });

}

handleSubmit = (e) => {


  e.preventDefault();
}

serviceListRequest = () => {
  /* Sends request to populate allowed list of services. Simulating that for now. */
  console.log('serviceListRequest')
  this.setState({
    selectedService : data.service,
    requestData : data,
    services : true,
  })
}


formFromFields = (data) => {
  let i;
   // generates form elements from fields
  console.log(data);
  data = data.schema;

  let rows = [];

   for(i = 0; i < data.length; i++){
     rows.push(
      <div>
        <label> {data[i].label} </label>
        <input type="text" name={data[i].key} key={data[i].key} /> 
      </div>
      );
   }
   return rows;

};

render(){

        if (this.state.selectedService) {
            console.log(this.state.requestData);
            return (
            <div>
            {this.formFromFields(this.state.requestData)}
            </div>
          )
        }
        else{

        }

      return (
        <div> </div>
      );
  }
}

export default CesiumRequestForm;
