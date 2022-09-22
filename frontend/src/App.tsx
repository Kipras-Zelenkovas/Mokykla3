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


function App() {

  const authenticated = localStorage.getItem('token') ? true : false

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Map />}/>
        <Route path='/login' element={!authenticated ? <Login /> : <Navigate to="/" />}></Route> 
        <Route path='/add/airport' element={authenticated ? <AddAirport /> : <Navigate to="/login" />}/>
        <Route path='/airports' element={<Airports />}/>
        <Route path='/update/airport' element={authenticated ? <UpdateAirport />: <Navigate to="/login" />}/>
        <Route path='/add/airline' element={authenticated ? <AddAirline /> : <Navigate to="/login" />}/> 
        <Route path='/airlines' element={<Airlines />}/>
        <Route path='/update/airline' element={authenticated ? <UpdateAirline />: <Navigate to="/login" />}/>
        <Route path='/add/country' element={authenticated ? <AddCountry /> : <Navigate to="/login" />}/> 
        <Route path='/countries' element={<Countries />}/>
        <Route path='/update/country' element={authenticated ? <UpdateCountry />: <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
