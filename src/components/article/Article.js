import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comments from './Comments';
import Upvote from './Upvote';
import AddComments from './AddComments';
import ErrorPage from '../error/Error';
import "./Article.css"
import Preloader from './PreLoader';

const Article = ({token}) => {
    const { id } = useParams();
    const [articleData, setArticleData] = useState({
        title: "",
        description: "",
        name: "",
        upvoters: [],
        comments: []
    });
    const [loading, setLoading] = useState(true);

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
            setArticleData(body);
        setLoading(false);
    }

    
    if (!articleData.title) 
        return (<><Preloader loading={loading} /><ErrorPage /></>);
    
        
   
    return (
        <div className="blogPost">
            <h1 className="postTitle">{articleData.title}</h1>
            {/* <h2 className="postAuthor">By {articleData.name}</h2> */}
            <Upvote id={id} setArticleData={setArticleData} upvoters={articleData.upvoters} />
            <pre className="postDescr">{articleData.description}</pre>
            <Comments comments={articleData.comments} />
            <AddComments id={id} setArticleData={setArticleData} />
        </div>
    );
};

export default Article;