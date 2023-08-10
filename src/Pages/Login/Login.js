import React, { useState} from 'react';
import '../Login/styles.css';
import logo from '../../assets/images/logo-homepet-peach.png';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidUser, setInvalidUser] = useState(false)
    const [invalidLoginText, setInvalidLoginText] = useState('');
    
    const invalidUserText = 'Usuário ou senha inválidos! Informe os dados novamente.';
    const emptyEmailText = 'Informe o e-mail.';
    const emptyPasswordText = 'Informe a senha.';
    const emptyEmailAndPasswordText = 'Informe o e-mail e a senha.';
    const generalError = 'Ocorreu um erro ao precessar as informações. Entre em contato com o suporte';

    let navigate = useNavigate();

    const setInvalidText = (email, password) => {
        let valid = true 
        if(email === '' && password === ''){
            setInvalidLoginText(emptyEmailAndPasswordText);
            valid = false
        }
        else if(email === ''){
            setInvalidLoginText(emptyEmailText);
            valid = false
        }
        else if(password === ''){
            setInvalidLoginText(emptyPasswordText);
            valid = false
        }
        return valid
    }

    const handleChangeEmail = event => {
       setEmail(event.target.value);
    }
    
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        
        if(!setInvalidText(email, password)){
            setInvalidUser(true)
        }
        else{
            api.post('/login', {
                useremail: email,
                userpassword: password
            }).then( response =>{
                localStorage.setItem("x-access-token", response.data['token']);
                localStorage.setItem("userid", response.data['userid']);
                navigate("/home");
            })
            .catch(
                err => {
                    try{
                        if (err.response.data.message === 'ACCOUNT_USER_NOT_FOUND_OR_INACTIVE')
                            setInvalidLoginText(invalidUserText);
                    }
                    catch (e){
                        setInvalidLoginText(generalError)
                    }
                  },
                setInvalidUser(true), 
            )
        }
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
                        {invalidUser ? <a id='lbl-incorrect-data' >{invalidLoginText}</a> : <a></a>}
                        <div>
                            <Link
                                id='lbl-create-new-account'
                                to={`/create-new-account`} >
                                    Criar nova conta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default Login;