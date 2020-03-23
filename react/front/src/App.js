import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import ScatterExample from './components/scatter';

function App() {


  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <br/>

        <ScatterExample/>

      </header>

    </div>
  );
}

export default App;
