import React from 'react';
import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Registraion/Register';

function App() {
  return (
    <div className="App">
     <Header />

     <Routes>'
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
     </Routes>
    </div>
  );
}

export default App;
