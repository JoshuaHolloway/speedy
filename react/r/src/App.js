import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';

function App() {

  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  const getProducts = _ => {
    
    fetch(url)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log('EURO-Rate: ' + data.bpi.EUR.rate);
      })
    ;
  };


  getProducts();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Chart/>

      </header>

    </div>
  );
}

export default App;
