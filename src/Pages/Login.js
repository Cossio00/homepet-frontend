import React from 'react';
import '../Pages/styles.css';
import logo from '../assets/images/logo-homepet.png';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('Seu email é: '+this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div className='root'>
                <div className='background'>
                    <div className='login-Modal'>
                        <img id='img-logo' src={logo}></img>
                        
                        <form onSubmit={this.handleSubmit}>
                            <label id='lbl-email'>
                                E-mail
                            </label>
                            <input id='txt-email' type="email" value={this.state.value} onChange={this.handleChange}/>
                            <label id='lbl-password'>
                                Senha
                            </label>
                            <input id='txt-password' type="password"/>
                            <input id='btn-login' type="button" value="Entrar"></input>
                        </form>
                        <div>
                            <a 
                                id='lbl-create-new-account'
                                href="https://www.google.com">
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