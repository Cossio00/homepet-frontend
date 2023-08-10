import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../assets/components/navbar';
import '../MyAccount/styles.css';


function MyService(props){

    const {state} = useLocation()
    
    const [servicedescription, setServiceDescription] = useState("")
	const [servicevalue, setServiceValue] = useState(0)
	const [isserviceactive, setIsServiceActive] = useState(0)
	const [servicesummary, setServiceSummary] = useState("")
	const [servicecategory, setServiceCategory] = useState(0)
    
    const token = localStorage.getItem('x-access-token')


    useEffect(() => {
        loadMyService();  
    }, [])


    async function loadMyService(){
        await api.get(`/my-service/${state}`, {headers: {"x-access-token": token}})
        .then(response => {
            let data = response.data
            setServiceDescription(data.servicedescription);
            setServiceValue(data.servicevalue);
            setIsServiceActive(data.isserviceactive);
            setServiceSummary(data.servicesummary);
            setServiceCategory(data.servicecategory);

        }).catch(
            err => {try{
                    if (err.response.data.message === 'Token inválido ou expirado.' || err.response.data.message === 'Token não informado'){
                        localStorage.removeItem('userid');
                        localStorage.removeItem('x-access-token');
                    }
                }catch(e){}
            }
        );
    }

        return(
            <>
            <NavBar/>
            <div className='edit-account-modal'>
                    <h1>{servicesummary}</h1>
                    <form className='form-edit-account'>
                        <label id='lbl-edit-summary'>Resumo*</label>
                        <input id='txt-edit-summary' value={servicesummary} /*onChange={handleChangeUserName}*/></input>
                        <label id='lbl-edit-value'>Valor*</label>
                        <input id='txt-edit-value' value={servicevalue} /*onChange={handleChangeUserCPF}*/></input>
                        <label id='lbl-edit-description'>Descrição*</label>
                        <input id='txt-edit-description' value={servicedescription} ></input>
                        <div className='select-user-type'>
                            <label id='lbl-edit-user-type-client'>Cliente</label>
                            <input id='rad-edit-user-type' type="radio" /*checked={!isCaregiver} onChange ={()=>{setIsCaregiver(false); setUserType(2)}} */></input>
                            <label id='lbl-edit-user-type-caregiver' >Cuidador</label>
                            <input id='rad-edit-user-type' type="radio" /*checked={isCaregiver} onChange={()=>{setIsCaregiver(true); setUserType(3)}} */></input>
                        </div>
                        <input id='btn-edit-account' type="button" value="Salvar" /*onClick={handleSubmit}*/></input>
                    </form>
            </div>
            </>
        
    )
}

export default MyService;