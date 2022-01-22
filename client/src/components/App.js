import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Categories from './Categories'
import Records from './Records';
import AddForm from './AddForm';
import NotFound from './NotFound';

function App() {
  return (
    <div className="container">
        <Nav />

        <Routes>
					<Route exact path="/" element={<Home />} />
          <Route exact path="/records" element={ <Records /> } />
          <Route exact path="/add" element={ <AddForm /> } />
          <Route exact path="/categories" element={<Categories />} />
          <Route  path="*" element={ <NotFound /> } />	
        </Routes>   

    </div>
  );
}

export default App;
