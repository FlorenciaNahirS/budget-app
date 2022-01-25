import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dayJs from 'dayjs';


function EditForm() {

    let { id } = useParams();

    const [formData, setFormData] = useState(
        {amount: '', concept: '', data: '', typeId: '', categoryId: ''}
    )

    useEffect(() => {
        fetch('http://localhost:3030/api/transactions/detail/' + id)
            .then(response => response.json())
            .then(transaction => {
                //console.log(transaction.data)
                setFormData(transaction.data)
            }).catch(e => console.log(e))
    }, [])

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
        if(formData.typeId == earningsCheck.current.value) {
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
        <> 
            <header className="main-header">
                <h2>Edit transaction</h2>
            </header>
            <section className="add" onLoad={show}>
                <form action='/' ref={form}>
                    <div className="input amount">
                        <label htmlFor='amount'>Amount</label>
                        <input type="number" name="amount" id="amount" placeholder="1234" onChange={handleChange}  value={formData.amount} />
                    </div>
                    <div className="input concept">
                        <label htmlFor='concept'>Concept</label>
                        <input type="text" name="concept" id="concept" placeholder="A nice jacket" onChange={handleChange} value={formData.concept}/>
                    </div>
                    <div className="input date">
                        <label htmlFor='date'>Date</label>
                        <input  type="date" name="date" id="date"  value={dayJs(formData.date).format('YYYY-MM-DD')}  onChange={handleChange}/>
                    </div>
                    <div className="typesForm input">
                        <div className="radio" id="typeIn" ref={radio}>
                            <input type="radio" name="typeId" id="earnings" ref={earningsCheck} value="1" checked={formData.typeId === 1} onChange={handleChange} disabled/>
                            <label htmlFor='earnings' >Earnings</label>
                        </div>
                        <div className="radio" id="typeOut" ref={radio}>
                            <input type="radio" name="typeId" ref={expencesCheck} id="expenses" value="2"  checked={formData.typeId === 2} onChange={handleChange} disabled/>
                            <label htmlFor='expenses'>Expenses</label>
                        </div>
                    </div>
                    <div className="categoriesForm categoriesOut" ref={categoriesOut}>
                        {
                            categories.filter(elem => elem.typeId === 2).map((elem, i) => {
                                return (
                                    <div className={"radio " + elem.name} key={elem + i}>
                                        <input type="radio" name="categoryId" id={elem.name} checked={formData.categoryId === elem.id} value={elem.id} disabled/>
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
                                        <input type="radio" name="categoryId" id={elem.name} checked={formData.categoryId === elem.id} value={elem.id} disabled/>
                                        <label htmlFor={elem.name}>{elem.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <button type="submit" className="button" onClick={send}>Edit</button>
                </form>
            </section>
        </>
    )
}

export default EditForm;
