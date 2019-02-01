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
        service : null,
        requestData : null,
        userInput : [],
    };
  }


componentWillMount(){
  console.log(this.props.chosen);
  this.setState({service: this.props.service});
  this.serviceSchemaRequest();

}

serviceSchemaRequest = () => {
  /*Query backend to obtain schema for this.state.service*/
  /* Hard coded for now*/
  this.setState({
    requestData: data
  })
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


formFromFields = (data) => {

  let rows = [];

   data.schema.map((row) => {
     rows.push(
       <div>
         <label> {row.label} </label>
         <input type="text" name={row.key} key={row.key} />
       </div>

     );
   });

  if (data.schema.length){
      rows.push(<input type="submit" onSubmit={this.handleSubmit} />);
  }

  return rows;

};


render(){
        /*If service isn't selected yet, render blank select box*/
        if (this.state.service) {
            console.log(this.state.requestData);
            return (
            <div>
            {this.formFromFields(this.state.requestData)}
            </div>
          );
        }
        else{
          return <div> </div>
        }


  }
}

export default CesiumRequestForm;
