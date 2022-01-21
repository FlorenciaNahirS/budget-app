import React from 'react';
import '../sass/styles.scss'

function Home() {
  return (
    <main>
    <header className="main-header">
        <h2>Home</h2>
      
    </header>
    <section className="home">
        <article className="total">
            <h1>Your Total :</h1>
            <h2>$1234</h2>
        </article>
        <article className="transactions">
            <h2 className="subtitle">Últimas transacciones:</h2>
            <div className="transaction out entertaiment" id="traa">
                <div className="text">
                    <h2>Salidas</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div> 
                <h3>- $1234</h3>
            </div>
            <div className="transaction out transportation">
                <div className="text">
                    <h2>Transpaorte</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>- $1234</h3>
            </div>
            <div className="transaction out entertaiment">
                <div className="text">
                    <h2>Salidas</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>- $1234</h3>
            </div>
            <div className="transaction in">
                <div className="text">
                    <h2>Sueldo</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>+ $1234</h3>
            </div>
            <div className="transaction out bills">
                <div className="text">
                    <h2>Facturas</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>- $1234</h3>
            </div>
            <div className="transaction out clothes">
                <div className="text">
                    <h2>Ropa</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>- $1234</h3>
            </div>
            <div className="transaction in">
                <div className="text">
                    <h2>Sueldo</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>+ $1234</h3>
            </div>
            <div className="transaction out bills">
                <div className="text">
                    <h2>Facturas</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>- $1234</h3>
            </div>
            <div className="transaction in">
                <div className="text">
                    <h2>Regalo</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>+ $1234</h3>
            </div>
            <div className="transaction in">
                <div className="text">
                    <h2>Transaccion</h2>
                    <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
                </div>
                <h3>+ $1234</h3>
            </div>
        </article>
        <article className="categories">
            <h2 className="subtitle">Categorias:</h2>
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
        </article>
    </section>
</main>
  )
}

export default Home;
