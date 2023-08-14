import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context"
import { useContext } from "react"


export default function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  return (
    <MenuContainer >

      <p onClick={() => navigate('/my-services')}>Gerenciar</p>
      <Progress onClick={() => navigate('/')}>
        <CircularProgressbar
        
          text={`Home`}
          background
          backgroundPadding={6}
          styles={buildStyles({
          backgroundColor: "#73384E",
          textColor: "#fff",
          pathColor: "#73384E",
          trailColor: "transparent"
          })}
        />
      </Progress>
      <p  onClick={() => navigate('/new-service')} >Adicionar</p>

    </MenuContainer>
  )

}

const MenuContainer = styled.div`
  z-index: 3;
  font-family: 'Playball', cursive;
  width: 100vw;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #FFFFFF;   
  font-size: 39;
  position: fixed;
  bottom: 0;
  left: 0;
  p {
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #73384E;
  }`

const Progress = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  width: 91px;
  height: 91px;
  margin-bottom: 32px;
  `