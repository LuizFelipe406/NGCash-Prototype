import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ContextProvider } from './context';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path='/' element={ <Login /> }/>
          <Route path='/register' element={ <Register /> }/>
          <Route path='/home' element={ <Home />} />
        </Routes>
     </ContextProvider>
    </div>
  );
}

export default App;