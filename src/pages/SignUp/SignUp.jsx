import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {UserContext} from "../../Context";
import { ThreeDots } from "react-loader-spinner";
import logo from "./../../assets/logos/quebra.jpeg"
import errosend from "./../../assets/logos/tendinada.gif"
import verify from "./../../assets/logos/caracracha.gif"



export default function SignUpPage() {
  const [formNewClient, setFormNewClient] = useState({ name: '', email: '', password: '', confirmPassword: '', city: '', phone: '', zipcode: '', cpf: '', picture:'' })
  const [btstats, setBtstats] = useState(false)
  const { setUser, user } = useContext(UserContext);
  let cityok = true
  var validacep = /^[0-9]{8}$/;
  const navigate = useNavigate()
  const [imglogo, setImglogo] = useState(logo)

  const updateFormNewClient = (e) => {
    const { id, value } = e.target;
    const newForm = { ...formNewClient, [id]: value };
    setFormNewClient(newForm);
  }

  if (validacep.test(formNewClient.zipcode) && formNewClient.city === "") return callcep(formNewClient.zipcode)

  function callcep(zip) {
    cityok = false

    axios.get('https://viacep.com.br/ws/' + zip + '/json/')
      .then((res) => {
        const newForm = { ...formNewClient, ['city']: res.data.localidade };
        setFormNewClient(newForm);
        
      })
      .catch((err) => {
        console.log(err.message)
      })
  };

  function sendsignup(e) {
    e.preventDefault();
    setImglogo(verify)
    setBtstats(true);
    console.log(formNewClient)

    if (formNewClient.password === formNewClient.confirmPassword) {
setTimeout(()=>{ 
      const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, 
        formNewClient
      )
      cadastro.then((x) => {
        setBtstats(false)
        console.log(x.data)
        signin()
      })
      cadastro.catch(erro => {
        console.log("erro")
        alert(erro.response.data);
        setBtstats(false)
        setImglogo(errosend)
      })},4000)
    }
  }

  function signin(e) {
   
    setBtstats(true);

    const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {
      email: formNewClient.email,
      password: formNewClient.password
    })
    cadastro.then((x) => {
      setUser(x.data)
      setBtstats(false)
      console.log(x.data)
      navigate("/")
    })

    cadastro.catch(erro => {
      alert(erro);
      setBtstats(false)
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={sendsignup}>
        <img src={imglogo} />
        <input disabled={btstats} placeholder="Nome" type="text" id="name" required value={formNewClient['name']} onChange={updateFormNewClient} />
        <input disabled={btstats} type="email" name="email" id="email" onChange={updateFormNewClient} value={formNewClient['email']} placeholder="Email" />
        <input disabled={btstats} placeholder="Celular" type="text" id="phone" value={formNewClient['phone']} onChange={updateFormNewClient} />
        <input disabled={btstats} placeholder="CPF" type="number" id="cpf" value={formNewClient['cpf']} onChange={updateFormNewClient} />
        <input disabled={btstats} placeholder="CEP" type="number" id="zipcode" value={formNewClient['zipcode']} onChange={updateFormNewClient} />
        <input disabled={btstats} placeholder="Cidade" type="text" id="city" value={formNewClient['city']} onChange={updateFormNewClient} />
        <input disabled={btstats} placeholder="Foto URL" type="url" id="picture" value={formNewClient['picture']} onChange={updateFormNewClient} />

        <input disabled={btstats} placeholder="Senha" id="password" type="password" required value={formNewClient['password']} onChange={updateFormNewClient} />
        <input disabled={btstats} placeholder="Confirme a senha" id="confirmPassword" type="password" value={formNewClient['confirmPassword']} onChange={updateFormNewClient} />

        {btstats ? <button disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button disabled={btstats} type="submit">Cadastrar</button>}
      </form>

      <Link to={`/sign-in`}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.div` 
  
  margin-top: 70px;
  margin-bottom: 70px;
  position: relative;
  padding-bottom: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #293845;
 
  font-size: 24px;
  button {
        display:flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        border-radius: 5px;
        background-color:${btstats => btstats.btstats ? '#A68A94' : '#73384E'};
        font-size: 18px;
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
        font-size: 18px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 10px;
        
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
        gap: 9px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 13px;
        line-height: 15px;
        color: #A68A94;
        text-decoration: none;
        padding-top: 10px;
    }

    img{
      height: 100px;
    }
  
`
