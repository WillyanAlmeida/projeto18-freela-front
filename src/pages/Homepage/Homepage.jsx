import styled from "styled-components"
import axios from "axios";
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../Context"
import { Link, useNavigate } from "react-router-dom";


export default function HomePage() {
    const [ListServices, setListServices] = useState()

    useEffect(() => {
        axios.get(
            `${import.meta.env.VITE_API_URL}/`
        ).then(x => {
            setListServices(x.data)
            console.log(x.data)
            
        }).catch(x => console.log(x));
    }, []);
    


    return (
        <ServicesContainer >
            {ListServices?.map((service)=>
            <Link  to={`/Service/${service.servid}`} key={service.servid}>
            <MyServicesContainer>
                <MainPicture>
                    <img src={service.url}></img>
                </MainPicture>
                <AllInformationService>
                    <h2>{service.servicename}</h2>
                    <h3>{service.description}</h3>
                    <h3>Categoria: {service.name}</h3>
                    <h4>R$ {service.price}/hora</h4>
                    <p>by {service.username}</p>
                </AllInformationService>
            </MyServicesContainer>
            </Link>)}
        </ServicesContainer>
    )


}

const ServicesContainer = styled.div`
     background-color: #E5E5E5;
     padding-top: 50px;
     overflow:scroll;
    color: #000;
     
    
`

const MyServicesContainer = styled.div`
    background-color: #fff;
    padding: 1px 1px 1px 1px;
    border-radius: 3px;
    
    height: 120px;
    width: 100% - 15px;
    margin-top: 10px; 
    padding-left: 3px;
    margin-bottom: 7px ;    
    display:flex;   
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

`
const MainPicture = styled.div`
       
    height: 100% - 3px;
    width: 110px;
    
    img{
        margin: 1px 1px 1px 1px;
        height: 100px;
        width: 106px;        
    }

`
const AllInformationService = styled.div`
    width: 100% -5px;
    height: 107px;
    
    display: flex;
    flex-direction: column;    
    margin-left: 3px;
    margin-right: 3px;
    gap: 2px;
   

    h2{
        font-size: 24px;
        text-decoration: none;
    }
    h3{
        font-size: 20px;
    }
    h4{
        font-size: 18px;
    }
`

const CheckboxAvailable = styled.div`
    width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

