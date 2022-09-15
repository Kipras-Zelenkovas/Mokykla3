import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { addAirport } from "../../Utils/Data";

export const AddAirport = () => {

    const navigate = useNavigate()

    return(
        <Formik
            initialValues={{
                name: '',
                country: '',
                latitude: '',
                longitude: '',
                airlines: ''
            }}
            onSubmit={(values) => {
                addAirport(values, navigate)
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
                        <label htmlFor="country">Country:</label>
                        <input type="text"
                            name="country"
                            id="country"
                            onChange={props.handleChange}
                            value={props.values.country}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="latitude">Latitude:</label>
                        <input type="text"
                            name="latitude"
                            id="latitude"
                            onChange={props.handleChange}
                            value={props.values.latitude}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="longitude">Longitude:</label>
                        <input type="text"
                            name="longitude"
                            id="longitude"
                            onChange={props.handleChange}
                            value={props.values.longitude}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="airlines">Airlines id:</label>
                        <input type="text"
                            name="airlines"
                            id="airlines"
                            onChange={props.handleChange}
                            value={props.values.airlines}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex w-full">
                        <button type="submit" className="bg-white border-2 border-navy text-smoked p-1 m-2 justify-end">Submit</button>
                    </div>
                </form>
            )}

        </Formik>   
    )
}
