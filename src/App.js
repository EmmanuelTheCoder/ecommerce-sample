import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cart from './components/Cart';
import Details from './components/Details';
import Navbar from './components/Navbar';
import ProductMenu from './components/ProductMenu';
import Modal from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(){
    return(
        <div>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ProductMenu}></Route>
                <Route path="/cart" component={Cart}></Route>
                <Route path="/details" component={Details}></Route>
               

            </Switch>
            <Modal />
        </div>
        
    );
}

// npx browserslist --update-db