import { Link } from "react-router-dom"

export const Navbar = () => {

    return(
        <div className="bg-smoked shadow-md shadow-navy">
            <div className='flex p-4 shadow-md justify-center'>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/'}>Home</Link>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/airports'}>Airports</Link>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/airlines'}>Airlines</Link>
                <Link className="shadow-none shadow-sm text-center rounded-lg px-5 py-2 text-white font-medium hover:bg-white hover:text-smoked" to={'/countries'}>Countries</Link>
            </div>
        </div>
    )
}