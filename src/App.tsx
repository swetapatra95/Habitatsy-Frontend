import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Signup from './scenes/Signup';
import Listings from './scenes/Listings';
import ListingDetails from './scenes/ListingDetails';
import AddListings from './scenes/AddListings';
import Host from './components/Host';
import Filters from './scenes/Filters';


function App() {
  const [token, setToken] = useState('');
  return (

    
    <div>
            <Routes>

                <Route path='/' element={<LoginPage  setToken={setToken}  />} /> 
                <Route path='/Listings' element={<Listings  />} /> 
                <Route path='/Signup' element={<Signup   />} />  
                <Route path='/Listings/:id' element={<ListingDetails    />} />     
                <Route path='/AddListings' element={<AddListings   />} />
                <Route path='/Filters' element={<Filters   />} />
            </Routes>
    </div>
  );
}


export default App;
