import React from 'react';
import { Link } from 'react-router-dom'

import logo from '../assets/piggy-bank.png';
import homeIcon from '../assets/home.png';
import recordsIcon from '../assets/records.png';
import addIcon from '../assets/add-w.png';
import categoriesIcon from '../assets/categories.png';

import '../sass/styles.scss'

function Nav() {
    return (
        <aside className="nav-bar">
            { /*<Link to="/" className="logo"><img src={logo} alt="Piggy banck icon"/></Link> */ }
            <nav className="main-nav">
                <Link to="/" className="active"><img src={homeIcon} alt="Home icon" className="icon"/></Link>
                <Link to="/records"><img src={recordsIcon} alt="Recods icon" className="icon"/></Link>
                <Link to="/add" ><img src={addIcon} alt="Add icon" className="icon"/></Link>
                <Link to="/categories"><img src={categoriesIcon} alt="All categories icon" className="icon"/></Link>
            </nav>
        </aside>
    )
}

export default Nav;
