import React from 'react';
import '../components/styles.css';

import logo from '../../assets/images/logo-homepet-white.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const NavBar = () => {


    const navigate = useNavigate();

    function logout(){
        api.post("/logout")
        .then(response =>{
            console.log(response)
        })
        localStorage.removeItem("userid");
        localStorage.removeItem("x-access-token");
    }

    return(
        <div className='header'>
            <img id = 'img-logo-header' src={logo} onClick={()=>navigate("/home")}></img>
            <Link 
            to="/account"
            id="lbl-my-account">
                Minha Conta</Link>
            <Link 
            to="/"
            id="lbl-exit"
            onClick={logout}>
                Sair</Link>
        </div>
    )
}

export default NavBar;