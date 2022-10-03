import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AirlinesData, CountriesData } from "../../Interfaces/Datas";
import { addAirport, getAirlines, getCountries } from "../../Utils/Data";

export const AddAirport = () => {

    const [airlines, setAirlines] = useState<AirlinesData[]>([])
    const [countries, setCountries] = useState<CountriesData[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAirlines(setAirlines, setLoaded)
        getCountries(setCountries, setLoaded)
    }, [])

    if(!loaded || airlines.length === 0 || countries.length === 0){
        return(
            <div>
                Loading....
            </div>
        )
    }

    return(
        <Formik
            initialValues={{
                name: '',
                country: '',
                latitude: '',
                longitude: '',
                airlines: ''
            }}
            onSubmit={(values) => {
                addAirport(values, navigate)
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
                        <label htmlFor="country">Country:</label>
                        <select className="
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            text-smoked border-2 border-navy p-1 m-2 focus:outline-none" 
                            name="country" id="country" onChange={props.handleChange}
                        >
                            <option value="" className="text-smoked" selected disabled hidden>Choose here</option>

                            {countries?.map((item, index) => {
                                return <option className="text-smoked" value={item.name} key={index}>{item.name}</option>
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
                        <label htmlFor="airlines">Airlines id:</label>

                        <select className="
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            text-smoked border-2 border-navy p-1 m-2 focus:outline-none" 
                            name="airlines" id="airlines" onChange={props.handleChange} multiple
                        >
                            {airlines?.map((item, index) => {
                                return <option className="text-smoked" key={index} value={item.id}>{item.name}</option>
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
