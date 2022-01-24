import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dayJs from 'dayjs';


function EditForm() {

    //Llama a la transaccion actual
    let { id } = useParams();

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/detail/' + id)
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setTransactions(transaction.data)
            }).catch(e => console.log(e))
    }, [])

    let {amount,notion,date,typeId,categoryId} = transactions;
    let day = dayJs(date).format('YYYY-MM-DD');

    //Guarda infomacion en formData
    const [formData, setFormData] = useState( 
        { amount , notion , date:day , typeId , categoryId  }
    )

    console.log(formData)
    console.log(transactions)

    //Actualiza la infomacion en formData
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    //Llama a las categorias
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/filter/categories')
            .then(response => response.json())
            .then(category => {
                //console.log(category.data)
                setCategories(category.data)
            }).catch(e => console.log(e))
    }, [])   

    //Muestra y oculta las categorias
    let earningsCheck = useRef();
    let expencesCheck = useRef();
    let categoriesIn = useRef();
    let categoriesOut = useRef();
    let radio = useRef();

    function show(){
        if(typeId == earningsCheck.current.value) {
            categoriesIn.current.style.display = 'grid';
            categoriesOut.current.style.display = 'none';
            categoriesIn.current.style.pointerEvents = 'none'
            radio.current.style.pointerEvents = 'none'
        }else{
            categoriesOut.current.style.display = 'grid';
            categoriesIn.current.style.display = 'none';
            categoriesOut.current.style.pointerEvents = 'none'
            radio.current.style.pointerEvents = 'none'
        }
    }

    //Agrega transaccion 
    let form = useRef();

    function send() {
        let config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        fetch('http://localhost:3030/api/transactions/update/'+id, config)
            .then(form.submit())
            .catch(e => console.log(e))
    }

    return (
        <main onLoad={show}> 
            <header className="main-header">
                <h2>Add transactions</h2>
            </header>
            <section className="add">
                <form action='/' ref={form}>
                    <div className="input amount">
                        <label htmlFor='amount'>Monto</label>
                        <input type="number" name="amount" id="amount" placeholder="1234" onChange={handleChange} value={formData.amount}/>
                    </div>
                    <div className="input notion">
                        <label htmlFor='notion'>Nota</label>
                        <input type="text" name="notion" id="notion" placeholder="A nice jacket" onChange={handleChange} value={formData.notion}/>
                    </div>
                    <div className="input date">
                        <label htmlFor='date'>Fecha</label>
                        <input  type="date" name="date" id="date" onChange={handleChange} value={formData.date} data-date-format="DD-MM-YYYY"/>
                    </div>
                    <div className="typesForm input">
                        <div className="radio" id="typeIn" ref={radio}>
                            <input type="radio" name="typeId" id="earnings" ref={earningsCheck} value="1" checked={typeId === 1} onChange={handleChange} disabled/>
                            <label htmlFor='earnings'>Earnings</label>
                        </div>
                        <div className="radio" id="typeOut" ref={radio}>
                            <input type="radio" name="typeId" ref={expencesCheck} id="expenses" value="2"  checked={typeId === 2} onChange={handleChange} disabled/>
                            <label htmlFor='expenses'>Expenses</label>
                        </div>
                    </div>
                    <div className="categoriesForm categoriesOut" ref={categoriesOut}>
                        {
                            categories.filter(elem => elem.typeId === 2).map((elem, i) => {
                                return (

                                    <div className={"radio " + elem.name} key={elem + i}>
                                        <input type="radio" name="categoryId" id={elem.name} checked={categoryId === elem.id} value={elem.id} onChange={handleChange}/>
                                        <label htmlFor={elem.name}>{elem.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className="categoriesForm categoriesIn" ref={categoriesIn}>
                        {
                            categories.filter(elem => elem.typeId === 1).map((elem, i) => {
                                return (

                                    <div className="radio" key={elem + i}>
                                        <input type="radio" name="categoryId" id={elem.name} checked={categoryId === elem.id} value={elem.id} onChange={handleChange}/>
                                        <label htmlFor={elem.name}>{elem.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <button type="submit" className="button" onClick={send}>Add</button>
                </form>
            </section>
        </main>
    )
}

export default EditForm;
