import { Formik } from "formik"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AirlinesPutPost, CountriesData } from "../../Interfaces/Datas"
import { getAirline, getCountries, updateAirline } from "../../Utils/Data"

export const UpdateAirline = () => {
    
    const [data, setData] = useState<AirlinesPutPost | undefined>(undefined)
    const [countries, setCountries] = useState<CountriesData[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const { search } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        getAirline(searchParams.get('id'), setData)
        getCountries(setCountries, setLoaded)
    }, [search])

    if(data === undefined || countries.length === 0 || loaded === false){
        return(
            <div>Loading....</div>
        )
    }

    return(
        <Formik
            initialValues={{
                id: data.id,
                name: data.name,
                countries_id: data.countries_id,
            }}
            onSubmit={(values) => {
                updateAirline(values, navigate)
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
                        <label htmlFor="countries_id">Countries id:</label>
                        <select className="
                            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            text-smoked border-2 border-navy p-1 m-2 focus:outline-none" 
                            name="countries_id" id="countries_id" onChange={props.handleChange}
                        >
                            <option value="" className="text-smoked" selected disabled hidden>Choose here</option>
                            {countries?.map((item, index) => {
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