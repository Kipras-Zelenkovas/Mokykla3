import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CountriesData } from "../../Interfaces/Datas"
import { deleteCountry, getCountries } from "../../Utils/Data"

export const Countries = () => {
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [countries, setCountries] = useState<CountriesData[]>()
    const navigate = useNavigate()

    useEffect(() => {
        getCountries(setCountries, setIsLoaded)
    }, [])

    if(!isLoaded || countries === undefined){
        return(
            <div>Loading.....</div>
        )
    }

    return(
        <div className="mt-5">
            <table className="w-screen text-left border-navy border-4">
                <thead className="bg-smoked uppercase">
                    <tr className="p-2 text-white text-center">
                        <th className="p-2 border border-navy">#</th>
                        <th className="p-2 border border-navy">Name</th>
                        <th className="p-2 border border-navy">Country</th>
                        <th className="p-2 border border-navy"></th>
                        <th className="p-2 border border-navy"></th>
                    </tr>   
                </thead>
                <tbody className="bg-smoked mt-6">
                    {countries?.map((item, index) => {
                        return(
                            <tr key={index} className="text-white text-center">
                                <td className="p-2 border border-navy">{index+1}</td>
                                <td className="p-2 border border-navy">{item.name}</td>
                                <td className="p-2 border border-navy">{item.ISO}</td>
                                <td className="p-2 border border-navy"><Link to={'/update/country/?id=' + item.id}>Update</Link></td>
                                <td className="p-2 border border-navy"><button onClick={() => deleteCountry(item.id, navigate)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}