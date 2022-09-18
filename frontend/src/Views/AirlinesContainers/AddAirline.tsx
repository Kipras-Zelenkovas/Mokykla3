import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { addAirline } from "../../Utils/Data";

export const AddAirline = () => {
    
    const navigate = useNavigate()

    return(
        <Formik
            initialValues={{
                name: '',
                countries_id: ''
            }}
            onSubmit={(values) => {
                addAirline(values, navigate)
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
                        <label htmlFor="countries_id">Countries id:</label>
                        <input type="text"
                            name="countries_id"
                            id="countries_id"
                            onChange={props.handleChange}
                            value={props.values.countries_id}
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