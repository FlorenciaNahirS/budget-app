import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs';

import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

function Records() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/all')
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setTransactions(transaction.data)
            }).catch(e => console.log(e))
    }, [])

    //Elimina transaccion
    let deleteForm = useRef()

    function send(id) {
        let yes = window.confirm('Are you sure you want to delete this transaction?')

        if (yes) {
            let config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            fetch('http://localhost:3030/api/transactions/delete/' + id, config)
                .then( deleteForm.submit() )
                .catch(e => console.log(e))
        }
    }

    return (
        <main>
            <header className="main-header">
                <h2>Historial de Transacciones</h2>
            </header>
            <div className="filters">
                <form action="">
                    <div className="select">
                        <label>Transaccion</label>
                        <select name="type">
                            <option hidden>Tipo de transaccion:</option>
                            <option value="1">Ingreso</option>
                            <option value="2">Gasto</option>
                        </select>
                    </div>
                    <div className="select">
                        <label>Categoria</label>
                        <select name="category">
                            <option hidden>Elegí una taregoria</option>
                            <option value="1">Transporte/Auto</option>
                            <option value="2">Facturas</option>
                            <option value="3">Salidas</option>
                            <option value="4">Salud</option>
                            <option value="5">Ropa</option>
                            <option value="6">Supermercado</option>
                            <option value="7">Mascotas</option>
                            <option value="8">Otros</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Filtrar</button>
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
                                        <div><p className="notion">{elem.notion}</p><p><DayJS format="DD-MM-YYYY" element="strong">{elem.date}</DayJS></p></div>
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
