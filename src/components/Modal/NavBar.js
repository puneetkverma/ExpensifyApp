import React from 'react';

const NavBar = (props) => {
    return (
        <ul className="nav navbar-nav navbar-right">
            <li><a onClick={props.showLoginMenu}>LOGIN</a></li>
        </ul>
    );
}

export default NavBar;