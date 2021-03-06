import React from 'react';
import {NavLink} from 'react-router-dom';
import HOC from './HOC'

const Header = () => (
    <header>
        <h1>header</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">
            <HOC />
        </NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </header>
);

export default Header;