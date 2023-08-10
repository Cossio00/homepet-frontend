import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import Home from './Pages/Home/Home';
import MyAccount from './Pages/MyAccount/MyAccount';
import MyService from './Pages/MyService/MyService';
import NewService from './Pages/NewService/NewService';

const RoutePath = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>  
                <Route path="/create-new-account" element={<CreateAccount/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/account" element={<MyAccount/>}/>
                <Route path="/my-service" element={<MyService/>}/>
                <Route path="/create-new-service" element={<NewService/>}/>         
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePath;