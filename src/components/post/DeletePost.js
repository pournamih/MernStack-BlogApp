import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useToken from "../userAccounts/useToken";
import ErrorPage from "../error/Error";
import "../article/Article.css";
import Preloader from '../article/PreLoader';

const DeletePost = () => {
    const { token } = useToken();
    const { id } = useParams();
    const [postValues, setPostValues] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        fetchAPI();
    }, [id]);

    async function fetchAPI() {
        const response = await fetch(`/api/posts/${id}`, {
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
    
    async function fetchPost() {
        const response = await fetch(`/api/posts/${id}/delete`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        })
        const body = await response.json();
            
        if (body.status === "Success") {
            alert("Post Deletion Successful.");
            navigate("/article-list", { replace: true });
        } else {
            alert("Post Deletion Unsuccessful!");
        }
    }
    if (!postValues.title) 
        return (<><Preloader loading={loading} /><ErrorPage /></>);
    if(!token.admin) return <ErrorPage />
    return (
        <div className="blogPost">
            <div className="addComment">
                <h3 className='commentHeading'>Delete a Blog Post</h3>
                <label>
                    Title: {postValues.title}
                </label>
                <br></br>
                <label>
                    Description: {postValues.description}
                </label>
                <br></br>
                <button onClick={fetchPost}>Delete</button>
            </div>
        </div>
    );
};

export default DeletePost;