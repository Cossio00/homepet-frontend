import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../assets/components/navbar';
import '../MyAccount/styles.css';


const MyAccount = () =>{

    const [username, setUserName]= useState('');
    const [usercpf, setUserCPF] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [useraddress, setUserAddress] = useState('');
    const [usertype, setUserType] = useState(2);
    const [isCaregiver, setIsCaregiver] = useState(false);
    
    const userid = localStorage.getItem('userid')
    const token = localStorage.getItem('x-access-token')
    
    let navigate = useNavigate();

    async function loadMyUser(){
        await api.get(`/user/${userid}`, {headers: {"x-access-token": token}})
        .then(response => {
            let data = response.data[0]
            setUserName(data.username);
            setUserCPF(data.usercpf);
            setUserEmail(data.useremail);
            setUserPhone(data.userphone);
            setUserAddress(data.useraddress);
            setUserType(data.usertype);
                if(data.usertype === 2)
                    setIsCaregiver(false);
                else setIsCaregiver(true); 
        }).catch(
            err => {try{
                    if (err.response.data.message === 'Token inválido ou expirado.' || err.response.data.message === 'Token não informado'){
                        localStorage.removeItem('userid');
                        localStorage.removeItem('x-access-token');
                        navigate("/");
                    }
                }catch(e){}
            }
        );
    }

    const validateFields = (username, usercpf, userphone, useraddress) =>{
        if (username === '' || usercpf === '' || userphone === '' || useraddress === ''){
            return false;
        }
        return true;
    }

    useEffect(() => {
        loadMyUser();  
    }, [])
    const [invalidDataText, setInvalidDataText] = useState('');
    const [isDataInvalid, setIsDataInvalid] = useState(false);

    const emptyFieldText = 'Preencha todos os campos';
    const generalError = 'Ocorreu um erro ao precessar as informações. Entre em contato com o suporte';

    const handleChangeUserName = event =>{
        setUserName(event.target.value);
    }

    const handleChangeUserCPF = event =>{
        setUserCPF(event.target.value);
    }

    const handleChangeUserPhone = event =>{
        setUserPhone(event.target.value);
    }

    const handleChangeUserAddress = event =>{
        setUserAddress(event.target.value);
    }

    const handleSubmit = event => {
        if(!validateFields(username, usercpf, userphone, useraddress)){
            setIsDataInvalid(true);
            setInvalidDataText(emptyFieldText);
        }else{
            api.put(`/user/${userid}`, {
                username: username,
                usercpf: usercpf,
                userphone: userphone,
                useraddress: useraddress,
                usertype: usertype
            },
            {headers: {"x-access-token": token}})
            .then(response =>{
                alert("Dados alterados com sucesso!");
            })
            .catch(
                err => {
                    try{
                        if (err.response.data.message === 'Token inválido ou expirado.'){
                            localStorage.removeItem('userid');
                            localStorage.removeItem('x-access-token');
                            navigate("/");
                        }
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
        <>
            <NavBar/>
            <div className='root-my-account'>
                <div className='edit-account-modal'>
                    <h1>Minha Conta</h1>
                    <form className='form-edit-account'>
                        <label id='lbl-edit-name'>Nome*</label>
                        <input id='txt-edit-name' value={username} onChange={handleChangeUserName}></input>
                        <label id='lbl-edit-email'>E-mail*</label>
                        <input id='txt-edit-email' disabled={true} value={useremail} ></input>
                        <label id='lbl-edit-cpf'>CPF*</label>
                        <input id='txt-edit-cpf' value={usercpf} onChange={handleChangeUserCPF}></input>
                        <label id='lbl-edit-phone'>Telefone*</label>
                        <input id='txt-edit-phone' value={userphone} onChange={handleChangeUserPhone}></input>
                        <label id='lbl-edit-address'>Endereço*</label>
                        <input id='txt-edit-address' value={useraddress} onChange={handleChangeUserAddress}></input>
                        <div className='select-user-type'>
                            <label id='lbl-edit-user-type-client'>Cliente</label>
                            <input id='rad-edit-user-type' type="radio" checked={!isCaregiver} onChange ={()=>{setIsCaregiver(false); setUserType(2)}}></input>
                            <label id='lbl-edit-user-type-caregiver' >Cuidador</label>
                            <input id='rad-edit-user-type' type="radio" checked={isCaregiver} onChange={()=>{setIsCaregiver(true); setUserType(3)}}></input>
                        </div>
                        <input id='btn-edit-account' type="button" value="Salvar" onClick={handleSubmit}></input>
                    </form>
                    {isDataInvalid ? <a id='lbl-invalid-data'>{invalidDataText}</a> : <a></a>}
                </div>
            </div>
        </>
    )
}

export default MyAccount;