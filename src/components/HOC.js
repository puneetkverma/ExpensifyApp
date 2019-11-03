import React from 'react';

const HOC = (props) => {
    const fun = (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        console.log("jdbcuyevbfiebfuvbehfbuevyf", e);
        setTimeout(() => {
            alert("lauda");
        }, 2000);
    }
    return (
        <div onClick={(e) => fun(e)}>
            vreate expense
        </div>
    );
}

export default HOC;