import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { validateSignup } from './validateForms';
import './Login.css';

const Signup = () => {
    //Storing Form Field Values
    const [formValues, setFormValues] = useState({ username: "", email: "", password: "", retypePsw: "" });
    //Manage Error Values
    const [errorValues, setErrorValues] = useState({});
    //for page navigation
    const navigate = useNavigate();
    // Manage Field Change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }
    //Manage form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        let validationErrors = validateSignup(formValues);
        setErrorValues(validationErrors);
        if(Object.keys(validationErrors).length === 0)
            signupDetails();
    }

    const signupDetails = async () => {
        const uname = formValues.username;
        const email = formValues.email;
        const password = formValues.password;
        const response = await fetch("/api/user/signup", {
            method: 'post',
            body: JSON.stringify({ uname, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const body = await response.json();
            
        if (body.status === "Success") {
            alert("Signup Successful");
            navigate("/login", { replace: true });
        } else {
            alert("Signup Unsuccessful!");
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1><br />
                <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                <p className="errorText">{errorValues.username}</p>
                <input type="email" name="email" placeholder="Email" required="" value={formValues.email} onChange={handleChange} />
                <p className="errorText">{errorValues.email}</p>
                <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                <p className="errorText">{errorValues.password}</p>
                <input type="password" name="retypePsw" placeholder="Retype Password" required="" value={formValues.retypePsw} onChange={handleChange} />
                <br />
                <button>Sign up</button>
            </form>
        </div>
    );
};

export default Signup;