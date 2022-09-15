import './App.css';
import { AddAirport } from './Views/AirportContainers/AddAirport';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Map />}/>
        <Route path='/add/airport' element={<AddAirport />}/>
        <Route path='/airports' element={<Airports />}/>
        <Route path='/update/airport' element={<UpdateAirport />}/>
        <Route path='/add/airline' element={<AddAirline />}/>
        <Route path='/airlines' element={<Airlines />}/>
        <Route path='/update/airline' element={<UpdateAirline />}/>
        <Route path='/add/country' element={<AddCountry />}/>
        <Route path='/countries' element={<Countries />}/>
        <Route path='/update/country' element={<UpdateCountry />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
