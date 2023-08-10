import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../assets/components/navbar';
import '../NewService/styles.css';
import Select from 'react-select';
const jwt = require('jsonwebtoken');


function NewService(){
    
    const [servicedescription, setServiceDescription] = useState("")
	const [servicevalue, setServiceValue] = useState()
	const [servicesummary, setServiceSummary] = useState("")
	const [servicecategory, setServiceCategory] = useState(0)

    const [categories, setCategories] = useState([])

    const token = localStorage.getItem('x-access-token')
    const navigate = useNavigate();


    useEffect(() => {
        loadCategories();
    }, [])

    async function loadCategories(){
        await api.get(`/category`, {headers: {"x-access-token": token}})
        .then(response =>{
            let data = response.data
            let c_id = []

            let categoriesData = data.map(function(category){
                let categoryData = {id: category['categoryid'], value: category['categoryname'], label: category['categoryname']}
                return categoryData
            })
            setCategories(categoriesData)

            
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


    async function handleSubmit(){
        api.post('/service', {
            servicesummary : servicesummary,
	        servicedescription: servicedescription,
            servicevalue: servicevalue,
            isserviceactive: 1,
            servicecategory: servicecategory,
            serviceprovider: jwt.decode(token)['id']
	
        }).then(response =>{
            alert("Serviço criado com sucesso!");
        })
        .catch(
            err => {console.log(err)}
        )
    }

    const handleChangeServiceCategory = event =>{
        setServiceCategory(event['id'])
    }

    const handleChangeServiceSummary = event =>{
        setServiceSummary(event.target.value);
    }
    const handleChangeServiceDescription = event =>{
        setServiceDescription(event.target.value);
    }
    const handleChangeServiceValue = event =>{
        setServiceValue(event.target.value);
    }

        return(
            <>
            <NavBar/>
            <div className='edit-account-modal'>
                    <h1>Novo Serviço</h1>
                    <form className='form-edit-account'>
                        <label id='lbl-edit-summary'>Resumo*</label>
                        <input id='txt-edit-summary' value={servicesummary} onChange={handleChangeServiceSummary}></input>
                        <label id='lbl-edit-value'>Valor*</label>
                        <input id='txt-edit-value' value={servicevalue} onChange={handleChangeServiceValue}></input>
                        <label id='lbl-edit-description'>Descrição*</label>
                        <input id='txt-edit-description' value={servicedescription} onChange={handleChangeServiceDescription}></input>
                        <label id='lbl-edit-category'>Categoria*</label>
                        <Select id='ddl-edit-category' options={categories} onChange={handleChangeServiceCategory}></Select>
                        <input id='btn-edit-account' type="button" value="Salvar" onClick={handleSubmit}></input>
                    </form>
            </div>
            </>
        
    )
}

export default NewService;