import React, { useState, useEffect } from 'react';
import '../Login/styles.css';
import logo from '../../assets/images/logo-homepet-peach.png';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidUser, setInvalidUser] = useState(false)

    let navigate = useNavigate();

    
    const handleChangeEmail = event => {
       setEmail(event.target.value);
    }
    
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        api.post('/login', {
            useremail: email,
            userpassword: password
        }).then( response =>{
            localStorage.setItem("x-acess-token", response.data['token']);
            navigate("/home");
        })
        .catch(
            err => console.log(err),
            setInvalidUser(true)
        )
    }


    return(
            <div className='root'>
                <div className='background'>
                    <div className='login-Modal'>
                        <img id='img-logo' src={logo}></img>
                        
                        <form className='form-login'>
                            <label id='lbl-email'>
                                E-mail
                            </label>
                            <input id='txt-email' type="email" value={email} onChange={handleChangeEmail}/>
                            <label id='lbl-password'>
                                Senha
                            </label>
                            <input id='txt-password' type="password" value={password} onChange={handleChangePassword}/>
                            <input id='btn-login' type="button" value="Entrar" onClick={handleSubmit}></input>
                        </form>
                        {invalidUser ? <a id='lbl-incorrect-data' >Usuário ou senha inválidos! Informe os dados novamente.</a> : <a></a>}
                        <div>
                            <Link
                                id='lbl-create-new-account'
                                to={`/create-new-account`}>
                                    Criar nova conta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default Login;