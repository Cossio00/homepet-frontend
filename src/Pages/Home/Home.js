import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../assets/components/navbar';
import api from '../../services/api';
import '../Home/styles.css';

const Home = () =>{

    const navigate = useNavigate();
    const [services, setServices] = useState([])
    const token = localStorage.getItem('x-access-token')

    async function loadServices(){
        await api.get(`/service`, {headers: {"x-access-token": token}})
        .then(response => {
            let data = response.data
            setServices(data)
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

    useEffect(() => {
        loadServices();  
    }, [])

    return(
        <>
            <NavBar/>
            <div className='services-modal'>
                    {services.map( s => 
                        <div key={s.serviceid} className='service-item' /*onClick={event => handleServiceDetails(event, myservice.serviceid)}*/>
                            <h1>{s.servicesummary}</h1>
                            <a>{s.servicedescription}</a>
                        </div>
                    )}
            </div>
        </>
    )
    
}

export default Home;