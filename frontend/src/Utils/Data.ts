import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { AirlinesData, AirlinesPutPost, AirportPutPost, CountriesData, CountriesPutPost, MapData } from "../Interfaces/Datas"

const url = 'https://backend2.ddev.site/api'
const tempUrl = 'http://127.0.0.1:8000/api'

const getAirportsByMap = (setData: Function, position: MapData | undefined) => {
    axios.get(url + '/map', {
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
    axios.post(url + '/airport', {
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
    axios.post(url + '/airline', {
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
    axios.post(url + '/country', {
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
    axios.get(url + '/airport')
    .then((res) => {
        setIsLoaded(true)
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlines = (setData: Function, setIsLoaded: Function, setCountries: Function) => {
    axios.get(url + '/airline')
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
    axios.get(url + '/country')
    .then((res) => {
        setIsLoaded(true)
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const getAirport = (id: string | null, setData: Function) => {
    axios.get(url + '/airport/' + id)
    .then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const updateAirport = (data: AirportPutPost, navigate: NavigateFunction) => {
    axios.put(url + '/airport/' + data.id, {
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
    axios.delete(url + '/airport/' + id)
    .then((res) => {
        console.log(res.data)
        navigate('/airports')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirline = (id: string | null, setData: Function) => {
    axios.get(url + '/airline/' + id)
    .then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const updateAirline = (data: AirlinesPutPost, navigate: NavigateFunction) => {
    axios.put(url + '/airline/' + data.id, {
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
    axios.delete(url + '/airline/' + id)
    .then((res) => {
        console.log(res.data)
        navigate('/airlines')
    }).catch((err) => {
        console.log(err)
    })
}

const getCountry = (id: string | null, setData: Function) => {
    axios.get(url + '/country/' + id)
    .then((res) => {
        setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

const updateCountry = (data: CountriesPutPost, navigate: NavigateFunction) => {
    axios.put(url + '/country/' + data.id, {
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
    axios.delete(url + '/country/' + id)
    .then((res) => {
        console.log(res.data)
        navigate('/countries')
    }).catch((err) => {
        console.log(err)
    })
}

const getAirlineCountry = (id: string | null, setCounty: Function) => {
    axios.get(url + '/airline/country/' + id)
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