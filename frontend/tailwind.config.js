/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/Views/MapContainer/Map.tsx',
    './src/Views/AirportContainers/AddAirport.tsx',
    './src/Views/AirportContainers/UpdateAirport.tsx',
    './src/Views/AirportContainers/Airports.tsx',
    './src/Views/AirlineContainers/AddAirline.tsx',
    './src/Views/AirlineContainers/UpdateAirline.tsx',
    './src/Views/AirlineContainers/Airlines.tsx',
    './src/Views/CountriesContainers/AddCountry.tsx',
    './src/Views/CountriesContainers/UpdateCountry.tsx',
    './src/Views/CountriesContainers/Countries.tsx',
    './src/Views/NavBar/Navbar.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FAF8FF',
        'smoked': '#494554',
        'navy': '#298895',
      }
    },
  },
  plugins: [],
}
