import styled from "styled-components"
import axios from "axios";
import wpp from "../../assets/logos/whatsapp.png"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../Context"
import { useNavigate, useParams } from "react-router-dom";


export default function ServicebyId() {
    const [allinfo, setAllinfo]= useState()
    const navigate = useNavigate()

    const parametros = useParams();
    console.log(parametros)
    useEffect(() => {
        axios.get(
            `${import.meta.env.VITE_API_URL}/service/${parametros.id}`
        ).then(x => {
            setAllinfo(x.data)
            console.log(x.data)
            
        }).catch(x => console.log(x));
    }, []);

function Sendmsg(){

    let wpplink =
    "https://api.whatsapp.com/send?phone=55" + allinfo.phone + "&text=" + "Oi, "+ allinfo.username + " Gostaria de saber mais sobre " + allinfo.servicename + " que encontrei no Severino's";
  window.open(wpplink)
}
    if(allinfo?.length===0) {return (<>Carregando...</>)} else { 

    return (
        <ServiceContainer>
            <h1 onClick={()=>navigate("/")} >{"< Voltar"}</h1>
            <MyServicesContainer>
                <MainPicture>
                    <img src={allinfo?.picture}></img>
                </MainPicture>
                <AllInformationService>
                    <h2>{allinfo?.servicename}</h2>
                    <h3>{allinfo?.description}</h3>
                    <h4>R$ {allinfo?.price}/hora</h4>
                    <p>{allinfo?.username}</p>
                    <p>{allinfo?.city}</p>
                    <Phone onClick={Sendmsg}><img src={wpp}></img> {allinfo?.phone}</Phone>
                </AllInformationService>
            </MyServicesContainer>

        </ServiceContainer>
    )
}

}

const ServiceContainer = styled.div`
     background-color: #E5E5E5;
     padding-top: 90px;
     overflow:scroll;
`

const MyServicesContainer = styled.div`
    background-color: #fff;
    padding: 1px 1px 1px 1px;
    border-radius: 3px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 100%;
    width: 100% - 15px;
    margin-top: 10px; 
    padding-left: 3px;
    margin-bottom: 7px ;    
    display:flex; 
    flex-direction: column;  
    align-items: left;
    img{}

`
const MainPicture = styled.div`
       
    height: 230px;
    width: 100%;
    
    img{
        margin: 1px 1px 1px 1px;
        height: 229px;
        width: 100%;        
    }

`
const AllInformationService = styled.div`
    width: 100% -5px;
    height: 200px;
    padding-top: 10px;
    
    display: flex;
    flex-direction: column;  
    justify-content: space-between;  
    margin-left: 3px;
    margin-right: 3px;
    gap: 2px;

    h2{
        font-size: 24px;
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
const Phone = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
