import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AirlinesData, CountriesData } from "../../Interfaces/Datas"
import { deleteAirline, getAirlineCountry, getAirlines } from "../../Utils/Data"

export const Airlines = () => {
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [airlines, setAirlines] = useState<AirlinesData[]>([])
    const [countries, setCountries] = useState<CountriesData>()

    useEffect(() => {
        getAirlines(setAirlines, setIsLoaded)
    }, [airlines])

    if(!isLoaded && airlines === undefined){
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
                    {airlines.map((item, index) => {

                        getAirlineCountry(item.id, setCountries)

                        return(
                            <tr key={index} className="text-white text-center">
                                <td className="p-2 border border-navy">{index+1}</td>
                                <td className="p-2 border border-navy">{item.name}</td>
                                <td className="p-2 border border-navy">{countries?.name}</td>
                                <td className="p-2 border border-navy"><Link to={'/update/airline/?id=' + item.id}>Update</Link></td>
                                <td className="p-2 border border-navy"><button onClick={() => deleteAirline(item.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}