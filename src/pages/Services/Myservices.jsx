import styled from "styled-components"
import axios from "axios";
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../Context"
import { useNavigate } from "react-router-dom";


export default function Mysevices() {
    const { setUser, user } = useContext(UserContext);
    const [refresh, setRefresh] = useState(true)
    const [myListServices, setMyListServices] = useState()
    const navigate = useNavigate()

   

    const config = {
        headers: {
            "Authorization": `Bearer ${user?.token}`
        }
    }

    useEffect(() => {
        console.log("useef")
        axios.get(
            `${import.meta.env.VITE_API_URL}/my-service`, config
        ).then(x => {
            setMyListServices(x.data)
            console.log(x.data)

        }).catch(x => {console.log(x)
            setUser("Nav")
            navigate("/sign-in")});
    }, [refresh]);


    function availableService(e) {
        const { id } = (e.target)
        console.log(id)

        const availableserv = axios.patch(`${import.meta.env.VITE_API_URL}/my-service/${id}`, id, config)
        availableserv.then(() => {
            setRefresh(!refresh)
            console.log(refresh)
        })

        availableserv.catch(erro => {
            alert(erro);
            console.log("nok")

        });


    }


    return (
        <ServicesContainer>
            {myListServices?.map((service) =>
                <MyServicesContainer key={service.servid}>
                    <MainPicture>
                        <img src={service.url}></img>
                    </MainPicture>
                    <AllInformationService>
                        <h2>{service.servicename}</h2>
                        <h3>{service.description}</h3>
                        <h4>R$ {service.price}</h4>
                        <p>{service.username}</p>
                    </AllInformationService>
                    <CheckboxAvailable>
                        <input type="checkbox" id={service.servid} name="available" onChange={availableService} checked={service.available} />
                        <label for="scales">{service.available ? 'Ativo' : 'Inativo'}</label>
                    </CheckboxAvailable>
                </MyServicesContainer>)}

        </ServicesContainer>
    )


}

const ServicesContainer = styled.div`
     background-color: #E5E5E5;
     padding-top: 50px;
     overflow:scroll;
`

const MyServicesContainer = styled.div`
    background-color: #fff;
    padding: 1px 1px 1px 1px;
    border-radius: 3px;
 justify-content: space-between;
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
    align-items: right;
    margin-right:10px;
`
