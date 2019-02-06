import React from 'react';
import CesiumServiceWidget from '../App';
import ServiceListForm from '../serviceList';
import CesiumRequestForm from '../cesium';
import { create } from 'react-test-renderer';


describe("CesiumsServiceWidget Component tests", () => {
    
    const getInstance = () => {
        
        let instance;
        if (!instance){
            const component = create(<CesiumServiceWidget />);
            instance = component.getInstance();
        }
        return instance;
    }

    test("shows cesium service button", () => {
        const instance = getInstance();
        expect(instance.state.showModal).toBe(false);
    });
    
    test("Assert state before component mounts", async () => {
        const instance = getInstance();
        await instance.componentWillMount();
        expect(instance.state.services.length).toBeGreaterThan(0);
    });

});

describe("Assertions on ServiceList component", () => {
    let services = ["a", "b"];
    const getInstance = () => {
        let instance;
        if (!instance){
            const component = create(<ServiceListForm services={services} />);
            instance = component.getInstance();
        }
        return instance;
    }
  

    test("Load default list and choose options one at a time ", async () => {
        let expectedResult = services.map(e => {
            return {"label": e, "value": e};
        });
        const instance = getInstance();
        await instance.componentWillMount();
        expect(instance.state.services).toEqual(expectedResult);
        expect(instance.state.services.length).toEqual(expectedResult.length);
        expect(instance.state.chosen).toBe(null);
        services.map((e) => {
            instance.handleChange(e);
            expect(instance.state.chosen).toBe(e);
        });
    });
});


describe("Assertions in Cesium component", () => {

    let data ={
        "A": {
            fields : [
            {key: "serial-number", label: "SN", required: true},
            {key: "uut", label: "UUT Type", required: true},
            {key: "area", label: "Area", required:true},
            {key: "timeframe", label: "Timeframe", required: false},
            ],
        }, 
        "B": {
            fields: [
            {key: "serial-number", label: "SN", required: true},
            {key: "uut", label: "UUT", required: true},
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

    test("assert default state", async () => {
        const instance = getInstance();
        expect(instance.state.userInput).toEqual([]);
        expect(instance.state.formData).toEqual({});

    });

    test("assert fields corresponding to chosen input", () => {
        const instance = getInstance();
        let serviceInput = {label: service, value: service};
        expect(instance.formFromFields(data, serviceInput).length)
                .toEqual(data[service].fields.length + 1);  // 1 for the extra field of submit button
    });

   
});



