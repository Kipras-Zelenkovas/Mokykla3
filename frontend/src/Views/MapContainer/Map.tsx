import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { AirportsData } from '../../Interfaces/Datas';
import { getAirportsByMap } from '../../Utils/Data';
import { MapLocation } from './MapLocation'

export const Map = () => {

    const [position, setPosition] = useState(undefined);
    const [data, setData] = useState<AirportsData[]>();

    useEffect(() => {
        if(position != undefined){
            getAirportsByMap(setData, position)
        }
    }, [position])

    return (
        <div className='w-screen h-full'>
            <MapContainer center={[54.890, 23.945]} zoom={7}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapLocation setPosition={setPosition}/>
            </MapContainer>

            <div className='mt-6 ml-96'>
                <table className='w-1/2 ml-32 text-left border-navy border-4'>
                    <tbody className='bg-smoked mt-6'>
                        {data?.map((item, index) => {
                        return(
                            <tr key={index} className="text-white text-center">
                                <td className="p-2 border border-navy">{item.name}</td>
                                <td className="p-2 border border-navy">{item.country}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}