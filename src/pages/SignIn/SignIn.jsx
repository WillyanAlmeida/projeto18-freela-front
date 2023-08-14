import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {UserContext} from "../../Context.jsx";
import {ThreeDots }from "react-loader-spinner";
import logo from "./../../assets/logos/quebra.jpeg"



export default function SignInPage() {
  
  const [formSignin, setFormSignin] = useState({email: '', password: ''})
  let [btstats, setBtstats] = useState(false)
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate()

  if(user === "Nav") {window.location.reload()}

  const updateFormSignin = (e) => {
    const { id, value } = e.target;
    const newForm = { ...formSignin, [id]: value };
    setFormSignin(newForm);
  }
 
  

  function login(e) {
    e.preventDefault();
    setBtstats(true);

    const reqSignin = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {
      email: formSignin.email,
      password: formSignin.password,
    })
    reqSignin.then((x) => {
      setUser(x.data)
      setBtstats(false)
      navigate("/")      
      console.log(x.data)
    })

    reqSignin.catch(erro => {
      alert(erro);
      setBtstats(false)      
    });
  }

    return (
      <SingInContainer>
        <form onSubmit={login}>
           <img src={logo} />
          <input disabled={btstats} type="email" name="email" id="email" onChange={updateFormSignin} value={formSignin['email']} placeholder="Email" />
          <input disabled={btstats} placeholder="Senha" id="password" type="password" required value={formSignin['password']} onChange={updateFormSignin} />
          {btstats?<button disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51}/></button> :<button disabled={btstats} type="submit">Entrar</button>}
        </form>
        <Link to={`/sign-up`}>
          Primeira vez? Cadastre-se!
        </Link>
      </SingInContainer>
    )
  }

  const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #293845;
  position: relative;
  font-size: 24px;
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
        padding-top: 30px;
    }
`
