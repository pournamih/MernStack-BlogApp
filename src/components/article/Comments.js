import React from 'react';

const Comments = (props) => {
    const { comments } = props;
    let title = "";
    if (!comments)
        return (<div></div>)
    else {
        if (comments.length > 0)
            title = "Comments";
    }
    
    return (
        <div>
            <br />
            <h3 className="commentHeading">{title}</h3>
            {
                comments.map((i, key) => (
                    <div key={key} className="postComment">
                        <h4>{i.username}</h4>
                        <p>{i.text}</p>
                    </div>
                    
                ))
            }
        </div>
    );
};

export default Comments;