import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'



function Categories() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/categories')
            .then(response => response.json())
            .then(category => {
                //console.log(category.data)
                setCategories(category.data)
            }).catch(e => console.log(e))
    }, [])

    return (
        <>
            <header className="main-header">
                <h2>All Categories</h2>
            </header>
            <section className="categoriesContainer">
                {
                    categories.filter(elem => elem.typeId === 2).map((elem, i) => {
                        return (
                            <Link to={"/category/"+elem.id} className={"category " + elem.name} key={elem + i}>
                                <h2>{elem.name}</h2>
                            </Link>
                        )
                    })
                }
            </section>
        </ >
    )
}

export default Categories;
