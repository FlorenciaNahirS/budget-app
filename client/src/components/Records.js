import React from 'react';
import '../sass/styles.scss'

import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

function Records() {
  return  (
    <main>
    <header className="main-header">
        <h2>Historial de Transacciones</h2>
    </header>
    <div className="filters">
        <form action="">
        <div className="custom-select">
            <label for="transactionsType">Transaccion</label>
            <select id="transactionsType" name="type">
              <option selected hidden>Tipo de transaccion:</option>
              <option value="1">Ingreso</option>
              <option value="2">Gasto</option>
            </select>
        </div>
        <div className="custom-select">
            <label for="transactionsType">Categoria</label>
            <select id="transactionsType" name="category">
              <option selected hidden>Elegí una taregoria</option>
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
            <div className="transaction out entertaiment" id="traa">
                <div className="text">
                    <h2>Salidas</h2>
                    <p>Lorem ipsum dolor sit <strong> 17-01-2022</strong></p>
                </div>
                <h3>- $1234</h3>
                <div className="actions">
                    <a href="add.html" className="edit"><img src={editIcon} alt="Edit icon" className="icon" /></a>
                    <form action="">
                        <button type="submit" className="delete"><img src={deleteIcon} alt="Delete icon" className="icon" /></button>
                    </form>
                </div>
            </div>
            
        </article>
    </section>
</main>
  )
}

export default Records;
