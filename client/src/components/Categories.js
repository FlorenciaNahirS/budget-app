import React from 'react';
import '../sass/styles.scss'

function Categories() {
    return (
        <main>
            <header className="main-header">
                <h2>Categoría : Transporte</h2>
            </header>
            <section className="categoriesContainer">
                <a href="category.html" className="category transportation">
                    <h2>Transporte/Auto</h2>
                </a>
                <a href="category.html" className="category bills">
                    <h2>Facturas</h2>
                </a>
                <a href="category.html" className="category entertaiment">
                    <h2>Salidas</h2>
                </a>
                <a href="category.html" className="category health">
                    <h2>Salud</h2>
                </a>
                <a href="category.html" className="category clothes" >
                    <h2>Ropa</h2>
                </a>
                <a href="category.html" className="category groceries">
                    <h2>Supermercado</h2>
                </a>
                <a href="category.html" className="category pets">
                    <h2>Mascotas</h2>
                </a>
                <a href="category.html" className="category other">
                    <h2>Otros</h2>
                </a>
        </section>
    </main >
  )
}

export default Categories;
