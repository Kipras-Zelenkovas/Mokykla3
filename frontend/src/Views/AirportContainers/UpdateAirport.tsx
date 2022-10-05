import { Formik } from "formik"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AirlinesData, AirportPutPost, CountriesData } from "../../Interfaces/Datas"
import { getAirlines, getAirport, getCountries, updateAirport } from "../../Utils/Data"

export const UpdateAirport = () => {
    
    const [data, setData] = useState<AirportPutPost>()
    const [airlines, setAirlines] = useState<AirlinesData[]>([])
    const [countries, setCountries] = useState<CountriesData[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const { search } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        getAirport(searchParams.get('id'), setData)
        getCountries(setCountries, setLoaded)
        getAirlines(setAirlines, setLoaded)
    }, [search])

    if(!loaded || data === undefined || airlines.length === 0 || countries.length === 0){
        return(
            <div>Loading....</div>
        )
    }

    return(
        <Formik
            initialValues={{
                id: data.id,
                name: data.name,
                country: data.country,
                latitude: data.latitude,
                longitude: data.longitude,
                airlines: ''
            }}
            onSubmit={(values) => {
                updateAirport(values, navigate)
            }}

        >
            {props => (
                <form onSubmit={props.handleSubmit}
                    className="block text-md bg-smoked text-white w-1/3 absolute left-1/3 top-1/3 p-3 border-4 border-navy"
                >
                    <div className="block">
                        <label htmlFor="name">Name:</label>
                        <input type="text"
                            name="name"
                            id="name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="country">country:</label>
                        <select className="
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            text-smoked border-2 border-navy p-1 m-2 focus:outline-none" 
                            name="country" id="country" onChange={props.handleChange}
                        >
                            {countries?.map((item, index) => {
                                if(item.name === data.country){
                                    return <option className="text-smoked" selected key={index} value={item.name}>{item.name}</option>
                                }
                                return <option className="text-smoked" key={index} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="block">
                        <label htmlFor="latitude">Latitude:</label>
                        <input type="text"
                            name="latitude"
                            id="latitude"
                            onChange={props.handleChange}
                            value={props.values.latitude}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="longitude">Longitude:</label>
                        <input type="text"
                            name="longitude"
                            id="longitude"
                            onChange={props.handleChange}
                            value={props.values.longitude}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="airlines">Airlines:</label>
                        <select className="
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            text-smoked border-2 border-navy p-1 m-2 focus:outline-none" 
                            name="airlines" id="airlines" onChange={props.handleChange} multiple
                        >
                            <option value="" className="text-smoked" selected disabled hidden>Choose here</option>
                            {airlines?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex w-full">
                        <button type="submit" className="bg-white border-2 border-navy text-smoked p-1 m-2 justify-end">Submit</button>
                    </div>
                </form>
            )}

        </Formik>   
    )
}