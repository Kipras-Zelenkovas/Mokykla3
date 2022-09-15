export interface MapData{
    lat: number | undefined,
    lng: number | undefined,
}

export interface AirportPutPost{
    id?: number,
    name: string,
    country: string,
    latitude: string,
    longitude: string,
    airlines: string
}

export interface AirlinesPutPost{
    id?: string,
    name: string,
    countries_id: string
}

export interface CountriesPutPost{
    id?: string,
    name: string,
    ISO: string
}

export interface AirportsData{
    id: string,
    name: string,
    country: string,
    latitude: string,
    longitude: string,
}


export interface AirlinesData{
    id: string,
    name: string,
    countries_id: string
}

export interface CountriesData{
    id: string,
    name: string,
    ISO: string
}