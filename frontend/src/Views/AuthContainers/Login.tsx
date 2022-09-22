import { Formik } from "formik"
import { useNavigate } from "react-router-dom";
import { login } from "../../Utils/Auth";
import { http } from "../../Utils/HttpLinks";

export const Login = () => {

    const navigate = useNavigate()

    return(
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={(values) => {
                login(values, navigate)
            }}

        >
            {props => (
                <form onSubmit={props.handleSubmit}
                    className="block text-md bg-smoked text-white w-1/3 absolute left-1/3 top-1/3 p-3 border-4 border-navy"
                >
                    <div className="block">
                        <label htmlFor="email">Email:</label>
                        <input type="text"
                            name="email"
                            id="email"
                            onChange={props.handleChange}
                            value={props.values.email}
                            className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        text-smoked border-2 border-navy p-1 m-2 focus:outline-none"
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="password">Password:</label>
                        <input type="text"
                            name="password"
                            id="password"
                            onChange={props.handleChange}
                            value={props.values.password}
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