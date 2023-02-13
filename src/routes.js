import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';

const RoutePath = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>  
                <Route path="/create-new-account" element={<CreateAccount/>}/>         
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePath;