import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import dayJs from 'dayjs';

import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

function Records() {

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/all')
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setTransactions(transaction.data)
            }).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/types')
            .then(response => response.json())
            .then(type => {
                //console.log(type.data)
                setTypes(type.data)
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

    // Filtra transacciones
    const [formData, setFormData] = useState(
        { type: "", category: "" }
    )

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function form(e) {
        e.preventDefault()
    }

    function filter() {
        fetch('http://localhost:3030/api/filter/by/'+formData.type+'/'+formData.category)
        .then(response => response.json())
        .then(filter => {
            setTransactions(filter.data)
        }).catch(e => console.log(e))
    }

    function reset() {
        fetch('http://localhost:3030/api/transactions/all')
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setTransactions(transaction.data)
                setFormData("")
            }).catch(e => console.log(e))
    }


    //Elimina transaccion
    let deleteForm = useRef()

    function send(id) {
        let yes = window.confirm('Are you sure you want to delete this transaction?');

        if (yes) {
            let config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch('http://localhost:3030/api/transactions/delete/' + id, config)
                .then(deleteForm.submit())
                .catch(e => console.log(e))
        }
    }

    return (
        <main>
            <header className="main-header">
                <h2>Transactions history</h2>
            </header>
            <div className="filters">
                <form action="" onSubmit={form}>
                    <div className="select">
                        <label>Transaction Type:</label>
                        <select name="type" onChange={handleChange}>
                            <option value='' hidden>Types</option>
                            {
                                types.map((elem, i) => {
                                    return (
                                        <option value={elem.id} key={elem + i} >{elem.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="select">
                        <label>Transaction Category:</label>
                        <select name="category" onChange={handleChange}>
                            <option value='' hidden>Categories</option>
                            {
                                formData.type ?
                                    categories.filter(elem =>  +formData.type === elem.typeId).map((elem, i) => {
                                        return (
                                            <option value={elem.id} key={elem + i} >{elem.name}</option>
                                        )
                                    })
                                    : null

                            }
                        </select>
                    </div>
                    <button type="submit" className="btn" onClick={filter}>Filter</button>
                    <button type="submit" className="btn btn-reset" onClick={reset}>Reset</button>
                </form>
            </div>
            <section className="records">
                <article className="transactions">
                    {
                        transactions.length > 0 && transactions.map((elem, i) => {
                            return (
                                <div className={"transaction " + elem.category.name + " " + elem.types.name} key={elem + i}>
                                    <div className="text">
                                        <h2>{elem.category.name}</h2>
                                        <div><p className="concept">{elem.concept}</p><p><strong>{dayJs(elem.date).format('DD-MM-YYYY')}</strong></p></div>
                                    </div>
                                    <h3>{elem.typeId === 2 ? '- $' + elem.amount : '+ $' + elem.amount}</h3>
                                    <div className="actions" >
                                        <Link to={"/edit/" + elem.id} className="edit"><img src={editIcon} alt="Edit icon" className="icon" /></Link>
                                        <form action="/records" ref={deleteForm} onSubmit={(e) => send(elem.id, e)}>
                                            <button type="submit" className="delete"><img src={deleteIcon} alt="Delete icon" className="icon" onClick={() => send(elem.id)} /></button>
                                        </form>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        transactions.length === 0 && (
                            <div className="transaction" >
                                <div className="text">
                                    <h2>No transactions yet</h2>
                                </div>
                            </div>
                        )
                    }
                </article>
            </section>
        </main>
    )
}

export default Records;
