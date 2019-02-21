import React from 'react';
import { JsonToTable } from 'react-json-to-table';
import {Message, Label, Form, Tab, List} from 'semantic-ui-react';

require("./index.css");

class ServiceResponse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount = () => {
    }

    displayServiceResponse = (response) => {
        return(<div>
            {
              Object.keys(response).map((key, index) => ( 
                <p key={index}><b>{key}</b>:{response[key]}</p> 
              ))
            }
          </div>)
    }

    displayResponse = (response) => { 

        console.log('props', response["code"]);
        
            const response_pane = [{ menuItem: 'Response', pane: (
                <Tab.Pane key='tab4'>          
                  <List>
                    <List.Item>Status: Fail</List.Item>
                    <List.Item>error_code: {response.code}</List.Item>
                    <List.Item>error_message: {response.error_message}</List.Item>
                  </List>
                </Tab.Pane>
              )},
            {menuItem: 'Details', pane: (                
            <Tab.Pane key='tab4'>          
            {this.displayServiceResponse(response.debug_info[0])}
          </Tab.Pane>)}]
            return (<div><Tab panes={response_pane} renderActiveOnly={false} /></div>); 
        
    }

    render(){
        let result, color;
        if (this.props.response["code"] === 'OK'){
            result = 'PASS'; color = "green";
            } 
        else {
            result = 'FAIL'; color = "red";
        }
        return (
        <div>
            <Message>
                <Label color={color}>
                    Result: {result}
                </Label>
            <p>
                {this.displayResponse(this.props.response)}
            </p>
            </Message>
        </div>
        );
    }
}



export default ServiceResponse;
