import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export const MapLocation = ({setPosition}: any) => {
    useMapEvents({
        click(e){
            console.log(e.latlng)
           setPosition(e.latlng)
        }
    })

    return null
}