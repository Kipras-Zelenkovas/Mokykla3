import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAdmin, logout } from "../../Utils/Auth"

export const Navbar = () => {

    const navigate = useNavigate()

    let authenticated = localStorage.getItem('token') ? true : false
    let admin = isAdmin()

    return(
        <div className="bg-smoked shadow-md shadow-navy">
            <div className='flex p-4 shadow-md justify-center'>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/'}>Home</Link>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/airports'}>Airports</Link>
                {admin ? 
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/add/airport'}>Add airport</Link>
                : ''}
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/airlines'}>Airlines</Link>
                {admin ? 
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/add/airline'}>Add airline</Link>
                : ''}
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/countries'}>Countries</Link>
                {admin ? 
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/add/country'}>Add county</Link>
                : ''}
                {authenticated ? 
                <button className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked"
                    onClick={() => logout(navigate)}> Logout</button> : ''}
                {!authenticated ?
                <button className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked"
                    onClick={() => navigate('/login')}> Login</button> : ''
                }
            </div>
        </div>
    )
}