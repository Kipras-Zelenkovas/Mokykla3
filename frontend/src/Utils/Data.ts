import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { AirlinesData, AirlinesPutPost, AirportPutPost, CountriesData, CountriesPutPost, MapData } from "../Interfaces/Datas"
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
    }).then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirports = (setData: Function, setIsLoaded: Function) => {
    api.get('/airport')
    .then((res) => {
        setIsLoaded(true)
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlines = (setData: Function, setIsLoaded: Function, setCountries: Function) => {
    api.get('/airline')
    .then((res) => {
        setData(res.data)

        res.data.forEach((element: AirlinesData) => {
            getAirlineCountry(element.id, setCountries)
        })
        setIsLoaded(true)
    }).catch((err) => {
        console.log(err)
    })
}

const getCountries = (setData: Function, setIsLoaded: Function) => {
    api.get('/country')
    .then((res) => {
        setIsLoaded(true)
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const getAirport = (id: string | null, setData: Function) => {
    api.get('/airport/' + id)
    .then((res) => {
        setData(res.data)
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
    }).then((res) => {
        console.log(res.data)
        navigate('/airports')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteAirport = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/airport/' + id)
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
    }).then((res) => {
        console.log(res.data)
        navigate('/airlines')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteAirline = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/airline/' + id)
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
    }).then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const deleteCountry = (id: string | null, navigate: NavigateFunction) => {
    api.delete('/country/' + id)
    .then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlineCountry = (id: string | null, setCounty: Function) => {
    api.get('/airline/country/' + id)
    .then((res) => {
        setCounty((arr: CountriesData[]) => [...arr, res.data])
    }).catch((err) => {
        console.log(err)
    })
}

export {getAirportsByMap, addAirport, addAirline, 
        addCountry, getAirports, getAirlines, 
        getCountries, getAirport, updateAirport, deleteAirport,
        getAirline, updateAirline, deleteAirline, getCountry,
        updateCountry, deleteCountry, getAirlineCountry}