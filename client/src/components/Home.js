import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dayJs from 'dayjs';

function Home() {

    const [transaction, setTransaction] = useState([]);
    const [total, setTotal] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/latest')
            .then(response => response.json())
            .then(transactions => {
                //console.log(transactions.data)
                setTransaction(transactions.data)
            }).catch(e => console.log(e))
    }, [])

    
    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/total')
            .then(response => response.json())
            .then(total => {
                //console.log(total.data)
                setTotal(total.data)
            }).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/categories')
            .then(response => response.json())
            .then(category => {
                //console.log(category.data)
                setCategories(category.data)
            }).catch(e => console.log(e))
    }, [])

    return (
        <main>
            <header className="main-header">
                <h2>Home</h2>
            </header>
            <section className="home">
                <article className="total">
                    <h1>Your Total :</h1>
                    <h2>$ {total}</h2>
                </article>
                <article className="transactions">
                    <h2 className="subtitle">Last transactions:</h2>
                    {
                        transaction.length > 0 && transaction.map((elem, i) => {
                            return (
                                <div className={"transaction " + elem.category.name + " " + elem.types.name} key={elem + i}>
                                    <div className="text">
                                        <h2>{elem.category.name}</h2>
                                        <div><p className="concept">{elem.concept}</p><p><strong>{dayJs(elem.date).format('DD-MM-YYYY')}</strong></p></div>
                                    </div>
                                    <h3>{elem.typeId === 2 ? '- $' + elem.amount : '+ $' + elem.amount}</h3>
                                </div>
                            )
                        })
                    }
                    {
                        transaction.length === 0 && (
                            <div className="transaction" >
                                <div className="text">
                                    <h2>No transactions yet</h2>
                                </div>
                            </div>
                        )
                    }
                </article>
                <article className="categories">
                    <h2 className="subtitle">Categories:</h2>
                    {
                        categories.filter(elem => elem.typeId === 2).map((elem, i) => {
                            return (
                                <Link to={"category/" + elem.id} className={"category " + elem.name} key={elem + i}>
                                    <h2>{elem.name}</h2>
                                </Link>
                            )
                        })
                    }

                </article>
            </section>
        </main>
    )
}

export default Home;
