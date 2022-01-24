import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import DayJS from 'react-dayjs';


function Category() {

    let { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/categories/' + id)
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setTransactions(transaction.data)
            }).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/categories/expences')
            .then(response => response.json())
            .then(category => {
                //console.log(category.data)
                setCategories(category.data)
            }).catch(e => console.log(e))
    }, [])

    let category = categories.filter(category => id == category.id).map(category => category.name);

    return (
        <main>
            <header className="main-header">
                <h2>{'Category: '+category}</h2>
            </header>
            <div className="btn-back">
                <Link to="/categories" className="btn">See all</Link>
            </div>
            <section className="category">
                <article className="transactions">
                    {
                        transactions.length > 0 && transactions.map((elem, i) => {
                            return (
                                <div className={"transaction " + elem.category.name + " " + elem.types.name} key={elem + i}>
                                    <div className="text">
                                        <h2>{elem.category.name}</h2>
                                        <div><p className="notion">{elem.notion}</p><p><DayJS format="DD-MM-YYYY" element="strong">{elem.date}</DayJS></p></div>
                                    </div>
                                    <h3>{elem.typeId === 2 ? '- $' + elem.amount : '+ $' + elem.amount}</h3>
                                </div>
                            )
                        })
                    }
                    {
                        transactions.length === 0 &&  (
                            <div className="transaction" >
                                <div className="text">
                                    <h2>No transactions in this category yet</h2>
                                </div>
                            </div>
                        )
                    }
                </article>
            </section>
        </main>
    )
}

export default Category;
