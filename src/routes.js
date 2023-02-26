import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import Home from './Pages/Home/Home';

const RoutePath = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>  
                <Route path="/create-new-account" element={<CreateAccount/>}/>
                <Route path="/home" element={<Home/>}/>         
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePath;