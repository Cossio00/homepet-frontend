import React, { useState } from 'react';
import '../CreateAccount/styles.css';
import logo from '../../assets/images/logo-homepet-gray.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () =>{

    const [username, setUserName]= useState('');
    const [useremail, setUserEmail] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [confirmuserpassword, setConfirmUserPassword] = useState('');
    const [invalidDataText, setInvalidDataText] = useState('');
    const [isDataInvalid, setIsDataInvalid] = useState(false);

    const differentPasswordText = 'As senhas não são iguais';
    const emptyFieldText = 'Preencha todos os campos';
    const emailAlreadyExists = 'E-mail já cadastrado. Informe outro e-mail para cadastro';
    const generalError = 'Ocorreu um erro ao precessar as informações. Entre em contato com o suporte';

    const handleChangeUserName = event =>{
        setUserName(event.target.value);
    }
    
    const handleChangeUserEmail = event =>{
        setUserEmail(event.target.value);
    }

    const handleChangeUserPassword = event =>{
        setUserPassword(event.target.value);
    }

    const handleChangeConfirmUserPassword = event =>{
        setConfirmUserPassword(event.target.value);
    }
    
    const verifyData = (username, useremail, userpassword, confirmuserpassword) =>{
        if (username === '' || useremail === '' || userpassword === '' || confirmuserpassword === ''){
            setInvalidDataText(emptyFieldText);
            return false;
        }
        else if(userpassword !== confirmuserpassword){
            setInvalidDataText(differentPasswordText);
            return false;
        }
        return true;
    }

    const handleSubmit = event =>{
        if(!verifyData(username, useremail, userpassword, confirmuserpassword)){
            setIsDataInvalid(true);
        }
        else{
            api.post('/user', {
                username: username,
                useremail: useremail,
                userpassword: userpassword
            }).then(response =>{
                alert("Usuário criado com sucesso!");
            })
            .catch(
                err => {
                    try{
                        if (err.response.data.message === 'USER_EMAIL_ALREADY_EXISTS')
                            setInvalidDataText(emailAlreadyExists);
                    }
                    catch (e){
                        setInvalidDataText(generalError)
                    }
                  },
                setIsDataInvalid(true),  
            )
        }
    }

    return(
        <div className='root'>
            <div className='create-account-modal'>
                <div>
                    <h1>Criar Conta</h1>
                    <form className='form-create-account'>
                        <label id='lbl-name'>Nome*</label>
                        <input id='txt-name' value={username} onChange={handleChangeUserName}></input>
                        <label id='lbl-email'>E-mail*</label>
                        <input id='txt-email' value={useremail} onChange={handleChangeUserEmail}></input>
                        <label id='lbl-password'>Senha*</label>
                        <input id='txt-password' type='password' value={userpassword} onChange={handleChangeUserPassword}></input>
                        <label id='lbl-confirm-password'>Confirmar Senha*</label>
                        <input id='txt-confirm-password' type='password' value={confirmuserpassword} onChange={handleChangeConfirmUserPassword}></input>
                        {isDataInvalid ? <a id='lbl-invalid-data'>{invalidDataText}</a> : <a></a>}
                        <input id='btn-create-account' type="button" value="Criar Conta" onClick={handleSubmit}></input>
                    </form>
                </div>
                <img id='img-logo' src={logo}></img>
                
            </div>
        </div>
    )
}

export default CreateAccount;