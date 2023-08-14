import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { styled } from "styled-components";
import { useState } from "react";
import {UserContext} from "./Context";
import SignInPage from "./pages/SignIn/SignIn";
import SignUpPage from "./pages/SignUp/SignUp";
import HomePage from "./pages/Homepage/Homepage";
import Menu from "./pages/Menu/Menu";
import NavBar from "./pages/NavBar/NavBar";
import Mysevices from "./pages/Services/Myservices";
import NewService from "./pages/Services/NewService";
import ServicebyId from "./pages/Services/Service";


function App() {

  const [user, setUser] = useState();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname; 
  }


  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{ currentId: '', user, setUser }}>
          {location.pathname != "/sign-in" && location.pathname != "/sign-up" && <> <NavBar /> <Menu /></>}

         
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/my-services" element={<Mysevices/>} />
            <Route path="/new-service" element={<NewService/>} />
            <Route path="/Service/:id" element={<ServicebyId/>}/>

          </Routes>

        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

export default App;

const PagesContainer = styled.div`
  //border: 1px solid red;
  width: 100hv;
  height: 100vh;
  padding-top: 20px;
  padding: 20px 5% ;
  background-color: #E5E5E5;   

`;
