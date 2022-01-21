import React from 'react';
import logo from '../assets/piggy-bank.png';
import homeIcon from '../assets/home.png';
import recordsIcon from '../assets/records.png';
import addIcon from '../assets/add-w.png';
import categoriesIcon from '../assets/categories.png';

import '../sass/styles.scss'

function Nav() {
    return (
        <aside className="nav-bar">
            <a href="#" className="logo"><img src={logo} alt="Piggy banck icon"/></a>
            <nav className="main-nav">
                <a href="index.html" className="active"><img src={homeIcon} alt="Home icon" className="icon"/></a>
                <a href="record.html"><img src={recordsIcon} alt="Recods icon" className="icon"/></a>
                <a href="add.html" ><img src={addIcon} alt="Add icon" className="icon"/></a>
                <a href="categories.html"><img src={categoriesIcon} alt="All categories icon" className="icon"/></a>
            </nav>
        </aside>
    )
}

export default Nav;
