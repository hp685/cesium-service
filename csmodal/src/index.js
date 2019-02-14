import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import CesiumServiceWidget from './App';
import * as serviceWorker from './serviceWorker';
import cesiumApp from './reducers';
import {chooseService, setField} from './actions';

const store = createStore(cesiumApp);
ReactDOM.render(
    <Provider store={store}>
        <CesiumServiceWidget />
    </Provider>,
    document.getElementById('root')
);

console.log(store.getState());

const unsubscribe = store.subscribe( () => console.log(store.getState()));

store.dispatch(chooseService('Areacheck'));
store.dispatch(setField('serial number', 'sn123'));

unsubscribe();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
