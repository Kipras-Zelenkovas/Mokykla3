import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AirportsData } from "../../Interfaces/Datas"
import { deleteAirport, getAirports } from "../../Utils/Data"

export const Airports = () => {
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [airports, setAirports] = useState<AirportsData[]>()
    const navigate = useNavigate()

    useEffect(() => {
        getAirports(setAirports, setIsLoaded)
    }, [])

    if(airports === undefined && !isLoaded){
        return(
            <div>Loading....</div>
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
                <tbody className="bg-smoked mt-6 text-center">
                    {airports?.map((item, index) => {
                        return(
                            <tr key={index} className="text-white text-center">
                                <td className="p-2 border border-navy">{index+1}</td>
                                <td className="p-2 border border-navy">{item.name}</td>
                                <td className="p-2 border border-navy">{item.country}</td>
                                <td className="p-2 border border-navy"><Link to={'/update/airport/?id=' + item.id}>Update</Link></td>
                                <td className="p-2 border border-navy"><button onClick={() => deleteAirport(item.id, navigate)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}