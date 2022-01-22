import React from 'react';

function AddForm() {
    return (
        <main>
            <header className="main-header">
                <h2>Agregar transaccion</h2>
            </header>
            <section className="add">
                <form action="" method="get">
                    <div className="input amount">
                        <label for="amount">Monto</label>
                        <input type="number" name="amount" id="amount" placeholder="1234" />
                    </div>
                    <div className="input notion">
                        <label for="notion">Nota</label>
                        <input type="text" name="notion" id="notion" placeholder="Una linda campera" />
                    </div>
                    <div className="input date">
                        <label for="date">Fecha</label>
                        <input type="date" name="date" id="date" />
                    </div>
                    <div className="typesForm input">
                        <div className="radio" id="typeIn">
                            <input type="radio" name="type" id="in" value="1" />
                                <label for="in">Ingresos</label>
                        </div>
                        <div className="radio" id="typeOut">
                            <input type="radio" name="type" id="out" value="2" />
                                <label for="out">Gastos</label>
                        </div>
                    </div>
                    <div className="categoriesForm categoriesOut" id="categoriesOut">
                        <div className="radio transportation">
                            <input type="radio" name="category" id="transportation" value="34" />
                                <label for="transportation">Transporte</label>
                        </div>
                        <div className="radio bills">
                            <input type="radio" name="category" id="bills" value="3" />
                                <label for="bills">Facturas</label>
                        </div>
                        <div className="radio entertaiment">
                            <input type="radio" name="category" id="entertaiment" value="7" />
                                <label for="entertaiment">Salidas</label>
                        </div>
                        <div className="radio health">
                            <input type="radio" name="category" id="health" value="8" />
                                <label for="health">Salud</label>
                        </div>
                        <div className="radio clothes">
                            <input type="radio" name="category" id="clothes" value="94" />
                                <label for="clothes">Ropa</label>
                        </div>
                        <div className="radio groceries">
                            <input type="radio" name="category" id="groceries" value="9" />
                                <label for="groceries">Supermercado</label>
                        </div>
                        <div className="radio pets">
                            <input type="radio" name="category" id="pets" value="3465" />
                                <label for="pets">Mascotas</label>
                        </div>
                        <div className="radio other">
                            <input type="radio" name="category" id="other" value="99" />
                                <label for="other">Mascotas</label>
                        </div>
                    </div>
                    <div className="categoriesForm categoriesIn" id="categoriesIn">
                        <div className="radio ">
                            <input type="radio" name="category" id="salery" value="349" />
                                <label for="salery">Sueldo</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="category" id="deposit" value="34" />
                                <label for="deposit">Transferencia</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="category" id="gift" value="35" />
                                <label for="gift">Regalo</label>
                        </div>
                    </div>
                    <button type="submit" className="button">Agragar</button>
                </form>
            </section>
        </main>
    )
}

export default AddForm;
