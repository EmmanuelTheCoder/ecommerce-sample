import React from 'react';
import ReactDOM from 'react-dom';
import {FpjsProvider} from '@fingerprintjs/fingerprintjs-pro-react'
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductProvider} from './context';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import env from 'dotenv'
// import * as serviceWorker from './serviceWorker';

env.config()

ReactDOM.render(
    <FpjsProvider loadOptions={{
        apiKey: process.env.REACT_APP_FPJS_KEY
    }}>
        <ProductProvider>
            <Router>

                <App />
            </Router>

        </ProductProvider>
    </FpjsProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

reportWebVitals();

if(module.hot){
    module.hot.accept();
}
