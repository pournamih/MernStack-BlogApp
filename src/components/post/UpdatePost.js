import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useToken from "../userAccounts/useToken";
import ErrorPage from "../error/Error";
import "../article/Article.css";
import Preloader from '../article/PreLoader';

const UpdatePost = () => {
    const { token } = useToken();
    const { id } = useParams();
    const [postValues, setPostValues] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAPI();
    }, [id]);

    async function fetchAPI() {
        const response = await fetch(`/api/posts/${id}`,{
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
        const body = await response.json();
        if (body !== { status: "Error" })
            setPostValues({ title: body.title, description: body.description });
        setLoading(false);
    }

    function handleChange(event){
        const { name, value } = event.target;
        setPostValues({ ...postValues, [name]: value });
    }
    async function fetchPost() {
        const title = postValues.title;
        const description = postValues.description;

        if (title !== "" && description !== "") {
            const response = await fetch(`/api/posts/${id}/update`, {
                method: 'post',
                body: JSON.stringify({ title, description}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                }
            })
            const body = await response.json();
            
            if (body.status !== "Error") {
                alert("Post Update Successful.");
                navigate(`/article/${id}`, { replace: true });
            } else {
                alert("Post Update Unsuccessful!");
            }
            
        } else {
            alert("Enter all required fields.");
        }
    }
    if (!postValues.title) 
        return (<><Preloader loading={loading} /><ErrorPage /></>);
    if(!token.admin) return <ErrorPage />
    return (
        <div className="blogPost">
            <div className="addComment">
                <h3 className='commentHeading'>Update a Blog Post</h3>
                <label>
                    Title:
                    <br></br>
                    <input type="text" className="titleTextBox" name="title" value={postValues.title} onChange={handleChange} />
                </label>
                <br></br>
                <label>
                    Description:
                    <br />
                    <textarea rows="20" cols="100" name="description" value={postValues.description} onChange={handleChange} ></textarea>
                </label>
                <br></br>
                <button onClick={fetchPost}>Submit</button>
            </div>
        </div>
    );
};

export default UpdatePost;