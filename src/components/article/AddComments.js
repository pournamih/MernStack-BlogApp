import React, { useState } from 'react';
import useToken from '../userAccounts/useToken';


const AddComments = (props) => {
    const { id, setArticleData } = props;
    const { token } = useToken();
    const [commentValues, setCommentValues] = useState({ username: token.uname, comment: "" });

    function handleChange(event){
        const { name, value } = event.target;
        setCommentValues({ ...commentValues, [name]: value });
    }
    async function fetchComments() {
        const username = commentValues.username;
        const text = commentValues.comment;

        if (username !== "" && text !== "") {
            const response = await fetch(`/api/comments/${id}/comment`, {
                method: 'post',
                body: JSON.stringify({ username, text }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                }
            })
            const body = await response.json();
            setArticleData(body);
            setCommentValues({ comment: "" });
        }
    }
    return (
        <div className="addComment">
            <h3 className='commentHeading'>Add a Comment</h3>
            <label>
                Name:
                <br></br>
                <input type="text" name="username" value={commentValues.username} disabled/>
            </label>
            <br></br>
            <label>
                Comment:
                <br/>
                <textarea rows="4" cols="50" name="comment" value={commentValues.comment} onChange={ handleChange } ></textarea>
            </label>
            <br></br>
            <button onClick={fetchComments}>Submit</button>
        </div>
   
    );
};


export default AddComments;