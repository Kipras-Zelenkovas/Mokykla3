import './App.css';
import { AddAirport } from './Views/AirportContainers/AddAirport';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AddAirline } from './Views/AirlinesContainers/AddAirline';
import { AddCountry } from './Views/CountriesContainers/AddCountry';
import { Airports } from './Views/AirportContainers/Airports';
import { Airlines } from './Views/AirlinesContainers/Airlines';
import { Countries } from './Views/CountriesContainers/Countries';
import { UpdateAirport } from './Views/AirportContainers/UpdateAirport';
import { UpdateAirline } from './Views/AirlinesContainers/UpdateAirline';
import { UpdateCountry } from './Views/CountriesContainers/UpdateCountry';
import { Navbar } from './Views/NavBar/Navbar';
import { Map } from './Views/MapContainer/Map';
import { Login } from './Views/AuthContainers/Login';
import { isAdmin, isLogged } from './Utils/Auth';
import { useEffect, useState } from 'react';


function App() {

  const [auth, setAuth] = useState<boolean | undefined>(undefined)
  const [admin, setAdmin] = useState<boolean>(false)

  useEffect(() => {
    async function adminCheck() {
      const res = await isAdmin()
      setAdmin(res)
    }

    async function loggedCheck(){
      const res = await isLogged()
      setAuth(res)
    }

    loggedCheck()
    adminCheck()
  }, [auth])

  if(auth === undefined || admin === undefined){
    return(
      <div>Loading....</div>
    )
  }


  return (
    <BrowserRouter>
      <Navbar admin={admin} auth={auth} setAuth={setAuth} setAdmin={setAdmin}/>
      <Routes>
        <Route path='/' element={<Map />}/>
        <Route path='/login' element={!auth ? <Login setAuth={setAuth}/> : <Navigate to="/" />}></Route> 
        <Route path='/add/airport' element={admin ? <AddAirport /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/>
        <Route path='/airports' element={<Airports />}/>
        <Route path='/update/airport' element={admin ? <UpdateAirport /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/>
        <Route path='/add/airline' element={admin ? <AddAirline /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/> 
        <Route path='/airlines' element={<Airlines />}/>
        <Route path='/update/airline' element={admin ? <UpdateAirline /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/>
        <Route path='/add/country' element={admin ? <AddCountry /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/> 
        <Route path='/countries' element={<Countries />}/>
        <Route path='/update/country' element={admin ? <UpdateCountry /> : auth ? <Navigate to="/" /> : <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
