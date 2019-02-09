import React from 'react';
import CesiumServiceWidget from '../App';
import ServiceListForm from '../serviceList';
import CesiumRequestForm from '../cesium';
import { create } from 'react-test-renderer';


describe("Assertions on CesiumServiceWidget Component", () => {
    
    const getInstance = () => {
        
        let instance;
        if (!instance){
            const component = create(<CesiumServiceWidget />);
            instance = component.getInstance();
        }
        return instance;
    }

    test("Shows cesium service button", () => {
        const instance = getInstance();
        expect(instance.state.showModal)
            .toBe(false);
    });
    
    test("Assert state before component mounts", async () => {
        const instance = getInstance();
        await instance.componentWillMount();
        expect(instance.state.services.length)
            .toBeGreaterThan(0);
    });

});

describe("Assertions on ServiceList component", () => {
    let services = ["a", "b"];
    const getInstance = () => {
        let instance;
        if (!instance){
            const component = create(
            <ServiceListForm services={services} />
            );
            instance = component.getInstance();
        }
        return instance;
    }
  

    test("Load default list and choose options one at a time ", async () => {
        let expectedResult = services.map(e => {
            return {key: e, value: e, text: e};
        });
        const instance = getInstance();
        await instance.componentWillMount();
        expect(instance.state.services)
            .toEqual(expectedResult);
        expect(instance.state.services.length)
            .toEqual(expectedResult.length);
        expect(instance.state.chosen).toBe(null);
        
    });
});


describe("Assertions on Cesium component", () => {

    let data ={
        "A": {
            fields : [
            {key: "serial-number", value: "SN", required: true, },
            {key: "uut", value: "UUT Type", required: true},
            {key: "area", value: "Area", required:true},
            {key: "timeframe", value: "Timeframe", required: false},
            ],
        }, 
        "B": {
            fields: [
            {key: "serial-number", value: "SN", required: true},
            {key: "uut", value: "UUT", required: true},
            ],
        },
    };
    let service = "A";
    const getInstance = () => {
        let instance;
        
        if(!instance){
            const component = create(<CesiumRequestForm service={service}/>);
            instance = component.getInstance();
        }
        return instance;
    }

    test("Assert default state", async () => {
        const instance = getInstance();
        expect(instance.state.userInput)
            .toEqual([]);
        expect(instance.state.formData)
            .toEqual({});

    });

    test("Assert fields corresponding to chosen input", () => {
        const instance = getInstance();
        let serviceInput = {service: service};

        expect(instance.formFromFields(data, service).length)
                .toEqual(data[service].fields.length + 1);  // 1 for the extra field of submit button
    });   
});



