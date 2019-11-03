import React from 'react';
import './atsa.css';

const Atsamodal = () => {
    const list = [1,2,3,4,5,6,7,8,9,10].map((i, index) => {
        return <li className="list-item" key={index}>{i}</li>
    })
    const value = [1,2,3,4,5,6].map((i, index) => {
        return <li className="value-item" key={index}>
            <div className="item">{i*i}</div>
            <div className="quantity">{i}</div>
        </li>
    })
    return (
        <div className="main-container">
            <div className="header">
                <div className="more">
                    <div>More Filters</div>
                    <div>Dresses</div>
                </div>
                <div>Close</div>
            </div>
            <div className="body">
                <ul className="list">{list}</ul>
                <ul className="value">{value}</ul>
            </div>
        </div>
    );
}
export default Atsamodal;