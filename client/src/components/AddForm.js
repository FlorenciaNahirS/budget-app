import React, { useState, useEffect, useRef } from 'react';
import dayJs from 'dayjs';

function AddForm() {

    let day = new Date();
    let today = dayJs(day).format('YYYY-MM-DD');

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


    //Guarda infomacion en formData
    const [formData, setFormData] = useState(
        { amount: "", concept: "", date: today, typeId: "", categoryId: "" }
    )


    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    console.log(formData)

    //Muestra y oculta las categorias
    let earningsCheck = useRef();
    let expencesCheck = useRef()
    let categoriesIn = useRef();
    let categoriesOut = useRef();

    function showCategoriesIn() {
        categoriesIn.current.style.display = 'grid';
        categoriesOut.current.style.display = 'none';
    }

    function showCategoriesOut() {
        categoriesOut.current.style.display = 'grid';
        categoriesIn.current.style.display = 'none';
    }

    //Agrega transaccion 
    let form = useRef();

    function send() {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        fetch('http://localhost:3030/api/transactions/create', config)
        .then( form.submit() )
        .catch(e => console.log(e))
    }

    return (
        <>
            <header className="main-header">
                <h2>Add transaction</h2>
            </header>
            <section className="add">
                <form action='/' ref={form}>
                    <div className="input amount">
                        <label htmlFor='amount'>Amount</label>
                        <input type="number" name="amount" id="amount" placeholder="1234" onChange={handleChange} />
                    </div>
                    <div className="input concept">
                        <label htmlFor='concept'>Concept</label>
                        <input type="text" name="concept" id="concept" placeholder="A nice jacket" onChange={handleChange} />
                    </div>
                    <div className="input date">
                        <label htmlFor='date'>Date</label>
                        <input type="date" name="date" id="date"  value={formData.date} onChange={handleChange}/>
                    </div>
                    <div className="typesForm input">
                        <div className="radio" id="typeIn" onClick={showCategoriesIn}>
                            <input type="radio" name="typeId" id="earnings" ref={earningsCheck} value="1" onChange={handleChange} />
                            <label htmlFor='earnings'>Earnings</label>
                        </div>
                        <div className="radio" id="typeOut" onClick={showCategoriesOut}>
                            <input type="radio" name="typeId" ref={expencesCheck} id="expenses" value="2" onChange={handleChange} />
                            <label htmlFor='expenses' >Expenses</label>
                        </div>
                    </div>
                    <div className="categoriesForm categoriesOut" ref={categoriesOut} >
                        {
                            categories.filter(elem => elem.typeId === 2).map((elem, i) => {
                                return (

                                    <div className={"radio " + elem.name} key={elem + i}>
                                        <input type="radio" name="categoryId" id={elem.name} value={elem.id} onChange={handleChange} />
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
                                        <input type="radio" name="categoryId" id={elem.name} value={elem.id} onChange={handleChange} />
                                        <label htmlFor={elem.name}>{elem.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <button type="submit" className="button" onClick={send}>Add</button>
                </form>
            </section>
        </>
    )
}

export default AddForm;
