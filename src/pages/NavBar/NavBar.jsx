import styled from "styled-components";
import { UserContext } from "../../Context"
import { useContext} from "react"
import { Link, useNavigate } from "react-router-dom";



export default function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    function x (){
        setUser("Nav")
        navigate("/sign-in")
    }
    
    return (
        <NavContainer >
            <p>Severino's</p>
           <div onClick={x} >{ user ? <img src={user?.picture }></img> : "Login"}</div>
        </NavContainer>
    )
}

const NavContainer = styled.div`
z-index: 4;
font-family: 'Playball', cursive;
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #73384E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    color: #fff;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 39;
    position: fixed;
    top: 0;
    left: 0;
    div{
        color: #fff;
    }
    p {
        font-family: 'Playball', cursive;
        font-size: 39px;
        font-weight: 400;
        line-height: 49px;
        letter-spacing: 0em;
        text-align: left;
        color: #fff;
    }
    img{
        height: 51px;
        width: 51px;
        background-size: 100%;
        border: 1px solid #000;
        border-radius: 98.5px;

    }
`