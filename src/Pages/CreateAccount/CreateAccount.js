import React from 'react';
import '../CreateAccount/styles.css';
import logo from '../../assets/images/logo-homepet-gray.png';


class CreateAccount extends React.Component{

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

    }

    render(){
        return(
            <div className='root'>
                <div className='create-account-modal'>
                    <div>
                        <h1>Criar Conta</h1>
                        <form className='form-create-account'>
                            <label id='lbl-name'>Nome*</label>
                            <input id='txt-name'></input>
                            <label id='lbl-email'>E-mail*</label>
                            <input id='txt-email'></input>
                            <label id='lbl-password'>Senha*</label>
                            <input id='txt-password' type='password'></input>
                            <label id='lbl-confirm-password'>Confirmar Senha*</label>
                            <input id='txt-confirm-password' type='password'></input>
                            <input id='btn-create-account' type="button" value="Criar Conta"></input>
                        </form>
                    </div>
                    <img id='img-logo' src={logo}></img>
                    
                </div>
            </div>
        )
    }
}

export default CreateAccount;