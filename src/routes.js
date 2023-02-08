import React from 'react';
import { BrowserRouter, Switch, Route, Routes, Redirect } from 'react-router-dom';

import Login from './Pages/Login';

const RoutePath = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>           
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePath;