import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useCart } from 'react-use-cart';

function App() {
  const {addItem, items}=useCart()


  console.log(items);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
