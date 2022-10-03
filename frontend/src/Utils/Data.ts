import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { AirlinesData, AirlinesPutPost, AirportPutPost, AirportsData, CountriesData, CountriesPutPost, MapData } from "../Interfaces/Datas"
import { api } from "./HttpLinks"

const getAirportsByMap = (setData: Function, position: MapData | undefined) => {
    api.get('/map', {
        params: {
            latitude: position?.lat,
            longitude: position?.lng
        }
    }).then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const addAirport = (data: AirportPutPost, navigate: NavigateFunction) => {
    api.post('/airport', {
        name: data.name,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        airlines: data.airlines
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/airports')
    }).catch((err) => {
        console.log(err)
    })
}

const addAirline = (data: AirlinesPutPost, navigate: NavigateFunction) => {
    api.post('/airline', {
        name: data.name,
        countries_id: data.countries_id
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/airlines')
    }).catch((err) => {
        console.log(err)
    })
}

const addCountry = (data: CountriesPutPost, navigate: NavigateFunction) => {
    api.post('/country', {
        name: data.name,
        ISO: data.ISO
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirports = (setData: Function, setIsLoaded: Function, setAirlines?: Function) => {
    api.get('/airport')
    .then((res) => {
        setData(res.data)
        if(setAirlines){
            res.data.forEach((element: AirportsData) => {
                getAiportAirlines(element.id, setAirlines, setIsLoaded)
            })
        }else{
            setIsLoaded(true)
        }
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlines = (setData: Function, setIsLoaded: Function, setCountries?: Function) => {
    api.get('/airline')
    .then((res) => {
        setData(res.data)

        if(setCountries){
            res.data.forEach((element: AirlinesData) => {
                getAirlineCountry(element.id, setCountries, setIsLoaded)
            })
        }else{
            setIsLoaded(true)
        }
    }).catch((err) => {
        console.log(err)
    })
}

const getCountries = (setData: Function, setLoaded: Function) => {
    api.get('/country')
    .then((res) => {
        setLoaded(true)
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const getAirport = (id: string | null, setData: Function, setAirlines?: Function, setIsLoaded?: Function) => {
    api.get('/airport/' + id)
    .then((res) => {
        setData(res.data)
        /*if(setAirlines && setIsLoaded){
            getAiportAirlines(id, setAirlines, setIsLoaded)
        }*/
    }).catch((err) => {
        console.log(err)
    })
}

const updateAirport = (data: AirportPutPost, navigate: NavigateFunction) => {
    api.put('/airport/' + data.id, {
        name: data.name,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        airlines: data.airlines
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/airports')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteAirport = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/airport/' + id,{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then((res) => {
        console.log(res.data)
        navigate('/airports')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirline = (id: string | null, setData: Function) => {
    api.get('/airline/' + id)
    .then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const updateAirline = (data: AirlinesPutPost, navigate: NavigateFunction) => {
    api.put('/airline/' + data.id, {
        name: data.name,
        countries_id: data.countries_id,
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/airlines')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteAirline = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/airline/' + id,{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then((res) => {
        console.log(res.data)
        navigate('/airlines')
    }).catch((err) => {
        console.log(err)
    })
}

const getCountry = (id: string | null, setData: Function) => {
    api.get('/country/' + id)
    .then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const updateCountry = (data: CountriesPutPost, navigate: NavigateFunction) => {
    api.put('/country/' + data.id, {
        name: data.name,
        ISO: data.ISO,
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteCountry = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/country/' + id,{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlineCountry = (id: string | null, setCounty: Function, setIsLoaded: Function) => {
    api.get('/airline/country/' + id)
    .then((res) => {
        setCounty((arr: CountriesData[]) => [...arr, res.data])
        setIsLoaded(true)
    }).catch((err) => {
        console.log(err)
    })
}

const getAiportAirlines = (id: string | null, setAirlines: Function, setIsLoaded: Function) => {
    api.get('/airport/airlines/' + id)
    .then((res) => {
        setAirlines((arr: AirlinesData[]) => [...arr, res.data])
        setIsLoaded(true)
    }).catch((err) => {
        console.log(err)
    })
}

export {getAirportsByMap, addAirport, addAirline, 
        addCountry, getAirports, getAirlines, 
        getCountries, getAirport, updateAirport, deleteAirport,
        getAirline, updateAirline, deleteAirline, getCountry,
        updateCountry, deleteCountry, getAirlineCountry, getAiportAirlines}