import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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