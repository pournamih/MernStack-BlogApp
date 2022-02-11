import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { validateLogin } from './validateForms';
import './Login.css';

const Login = ({setToken}) => {
    //Storing Form Field Values
    const [formValues, setFormValues] = useState({ username: "", password: "" });
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
        let validationErrors = validateLogin(formValues);
        setErrorValues(validationErrors);
        if(Object.keys(validationErrors).length === 0)
            userLogin();
    }

    const userLogin = async () => {
        const uname = formValues.username;
        const password = formValues.password;
        const response = await fetch("/api/user/login", {
            method: 'post',
            body: JSON.stringify({ uname, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const body = await response.json();
        
        if (body.uname === uname) {
            setToken(body);
            navigate("/article-list", { replace: true });
        } else {
            alert("Login Unsuccessful!");
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1><br />
                <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                <p className="errorText">{errorValues.username}</p>
                <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                <p className="errorText">{errorValues.password}</p>
                <br />
                <button>Login</button>
                <Link to="/signup" className="signupLink">Sign up</Link>
            </form>
        </div>
    );
};

export default Login;