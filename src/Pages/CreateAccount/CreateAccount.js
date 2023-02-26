import React from 'react';
import '../CreateAccount/styles.css';
import logo from '../../assets/images/logo-homepet-gray.png';
import api from '../../services/api';

class CreateAccount extends React.Component{

    constructor(props){
        super(props);
        this.state = {  username: '',
                        useremail: '',
                        userpassword: '',
                        confirmuserpassword: ''};

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
        this.handleChangeUserPassword = this.handleChangeUserPassword.bind(this);
        this.handleChangeConfirmUserPassword = this.handleChangeConfirmUserPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event){
        this.setState({username: event.target.value});
    }
    
    handleChangeUserEmail(event){
        this.setState({useremail: event.target.value});
    }

    handleChangeUserPassword(event){
        this.setState({userpassword: event.target.value});
    }

    handleChangeConfirmUserPassword(event){
        this.setState({confirmuserpassword: event.target.value});
    }
    handleSubmit(event){
        api.post('/user', {
            username: this.state.username,
            useremail: this.state.useremail,
            userpassword: this.state.userpassword
        }).then(response =>{
            console.log(response.statusText)
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div className='root'>
                <div className='create-account-modal'>
                    <div>
                        <h1>Criar Conta</h1>
                        <form className='form-create-account'>
                            <label id='lbl-name'>Nome*</label>
                            <input id='txt-name' value={this.state.username} onChange={this.handleChangeUserName}></input>
                            <label id='lbl-email'>E-mail*</label>
                            <input id='txt-email' value={this.state.useremail} onChange={this.handleChangeUserEmail}></input>
                            <label id='lbl-password'>Senha*</label>
                            <input id='txt-password' type='password' value={this.state.userpassword} onChange={this.handleChangeUserPassword}></input>
                            <label id='lbl-confirm-password'>Confirmar Senha*</label>
                            <input id='txt-confirm-password' type='password' value={this.state.confirmuserpassword} onChange={this.handleChangeConfirmUserPassword}></input>
                            <input id='btn-create-account' type="button" value="Criar Conta" onClick={this.handleSubmit}></input>
                        </form>
                    </div>
                    <img id='img-logo' src={logo}></img>
                    
                </div>
            </div>
        )
    }
}

export default CreateAccount;