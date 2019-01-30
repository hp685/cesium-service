import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.css';
import CesiumServiceWidget from './App';
import * as serviceWorker from './serviceWorker';

ReactModal.setAppElement('#root');
ReactDOM.render(<CesiumServiceWidget />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
