import React from 'react';
import { JsonToTable } from 'react-json-to-table';
import {Message, Label, Form} from 'semantic-ui-react';

class ServiceResponse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    componentWillMount = () => {
    }

    displayResponse = (response) => {
        let rows = []
        rows.push(<Form.Field><Label color="grey"> Response Code: {response["code"]}  </Label></Form.Field> );
        rows.push(<Form.Field><Label color="grey"> Data: {Object.values(response["results"])}</Label></Form.Field>);
        return rows;
    }
    render(){
        return (
        <div>
            <Message>
                <Label color="green">
                    Response:
                </Label>
            <p>
                {JSON.stringify(this.props.response)}
            </p>
            </Message>
        </div>
        );
    }
}
export default ServiceResponse;