import React from 'react';
import "./Article.css";

const Preloader = ({loading}) => {
    if (loading) {
        return (
            <>
                <div className="cover">
                    <div className="spinner">
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div></div>
        );
    }
};

export default Preloader;