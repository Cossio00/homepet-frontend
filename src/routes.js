import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import Home from './Pages/Home/Home';
import MyAccount from './Pages/MyAccount/MyAccount';

const RoutePath = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>  
                <Route path="/create-new-account" element={<CreateAccount/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/my-account" element={<MyAccount/>}/>         
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePath;