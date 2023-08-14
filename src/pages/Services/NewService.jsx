import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context";
import { ThreeDots } from "react-loader-spinner";



export default function NewService() {
    const [formNewService, setFormNewService] = useState({ name: '', description: '', price: '', categoryId: '', url: '' })
    const [btstats, setBtstats] = useState(false)
    const [categoryList, setCategoryList] = useState();
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate()

   


    const config = {
        headers: {
            "Authorization": `Bearer ${user?.token}`
        }
    }

    useEffect(() => {
        axios.get(
            `${import.meta.env.VITE_API_URL}/categorys`
        ).then(x => {
            setCategoryList(x.data)
            console.log(x.data)
            if (!user) {
                setUser("Nav")
                navigate("/sign-in")
            }
        

        }).catch(x => console.log(x));
    }, []);


    const updateFormNewService = (e) => {
        const { id, value } = e.target;
        const newForm = { ...formNewService, [id]: value };
        setFormNewService(newForm);
        console.log(newForm)
    }


    function createService(e) {
        e.preventDefault();
        setBtstats(true);

        const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/new-service`, formNewService, config)
        cadastro.then((x) => {

            setBtstats(false)
            console.log(x.data.user)
            navigate("/")
        })

        cadastro.catch(erro => {
            alert(erro);
            setBtstats(false)
        });
    }

 


    return (
        <SingInContainer>
            <form onSubmit={createService}>
                <input disabled={btstats} placeholder="Nome" type="text" id="name" required value={formNewService['name']} onChange={updateFormNewService} />
                <input disabled={btstats} type="text" name="description" id="description" onChange={updateFormNewService} value={formNewService['description']} placeholder="Descrição" />
                <input disabled={btstats} type="url" name="picture" id="url" onChange={updateFormNewService} value={formNewService['url']} placeholder="Foto do Serviço" />
                <input disabled={btstats} placeholder="Preço" type="number" id="price" value={formNewService['price']} onChange={updateFormNewService} />
                <select id="categoryId" value={formNewService['categoryId']} onChange={updateFormNewService} >
                    {categoryList?.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })}

                </select>


                {btstats ? <button disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button disabled={btstats} type="submit">Criar Serviço</button>}
            </form>


        </SingInContainer>
    )
}

const SingInContainer = styled.section`
  margin-top: 1px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #293845;
  position: relative;
  font-size: 24px;
  select{
    font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 12px;
  }
  button {
        display:flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        border-radius: 5px;
        background-color:${btstats => btstats.btstats ? '#A68A94' : '#73384E'};
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: calc(100% - 30px);
        
        padding: 12px;
    }
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: white;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 12px;
        
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #A68A94;
        text-decoration: none;
        padding-top: 10px;
    }
  
`
