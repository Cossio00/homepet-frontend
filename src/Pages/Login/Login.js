import React from 'react';
import '../Login/styles.css';
import logo from '../../assets/images/logo-homepet-peach.png';
import api from '../../services/api';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {email: '', password: ''};

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }
    
    handleChangeEmail(event){
        this.setState({email: event.target.value});
    }
    
    handleSubmit(event){
        alert('Seu email é: '+this.state.email);
        event.preventDefault();
    }

    render(){
        return(
            <div className='root'>
                <div className='background'>
                    <div className='login-Modal'>
                        <img id='img-logo' src={logo}></img>
                        
                        <form className='form-login'>
                            <label id='lbl-email'>
                                E-mail
                            </label>
                            <input id='txt-email' type="email" value={this.state.email} onChange={this.handleChangeEmail}/>
                            <label id='lbl-password'>
                                Senha
                            </label>
                            <input id='txt-password' type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                            <input id='btn-login' type="button" value="Entrar" onClick={this.handleSubmit}></input>
                        </form>
                        <div>
                            <a 
                                id='lbl-create-new-account'
                                href="/create-new-account">
                                    Criar nova conta
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;