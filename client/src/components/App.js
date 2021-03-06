import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../sass/styles.scss'

import Home from './Home';
import Nav from './Nav';
import Categories from './Categories'
import Records from './Records';
import AddForm from './AddForm';
import NotFound from './NotFound';
import Category from './Category';
import EditForm from './EditForm';

function App() {
  return (
    <div className="container">
      <Nav />

      <main>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/records" element={<Records />} />
          <Route exact path="/add" element={<AddForm />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category/:id" element={<Category />} />
          <Route exact path="/edit/:id" element={<EditForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
