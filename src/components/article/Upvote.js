import React, {useEffect, useState} from 'react';
import useToken from '../userAccounts/useToken';

const Upvote = (props) => {
    const { id, upvoters, setArticleData } = props;
    const { token } = useToken();
    const [voteValues, setVoteValues] = useState({ vote: 0, disabled: false });

    useEffect(() => {
        if (upvoters) {
            let upvotes = upvoters.length;
            let disabled = false;
            let voted = upvoters.find((name) => name === token.uname);
            if (voted)
                disabled = true;
            setVoteValues({ vote: upvotes, disabled: disabled });
        }
    }, [upvoters]);
    
    async function fetchUpVotes() {
        const username = token.uname;
        const response = await fetch(`/api/comments/${id}/upvotes`, {
            method: 'post',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            }
            
        });
        const body = await response.json();
        setArticleData(body);
    }

    return (
        <div>
            <button className="like" onClick={fetchUpVotes} disabled={voteValues.disabled}>👍</button>
            <p className="votes">This article has {voteValues.vote} upvotes</p>
        </div>
    );
}

export default Upvote;


