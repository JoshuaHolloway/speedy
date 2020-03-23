import React, {useState} from 'react';
import {Scatter} from 'react-chartjs-2';

const ScatterExample = () => {

  const [a, b] = useState(
    {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            { x: 65, y: 75 },
            { x: 59, y: 49 },
            { x: 80, y: 90 },
            { x: 81, y: 29 },
            { x: 56, y: 36 },
            { x: 55, y: 25 },
            { x: 40, y: 18 },
          ]
        }
      ]
    }
  );

  // https://github.com/pomber/covid19
  const corona_button_click = (event) => {
    console.log('CORONA button click!');

    const url = 'https://pomber.github.io/covid19/timeseries.json';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => console.log(data.Canada));

      b(
        {
          labels: ['Scatter'],
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [
                { x: 5, y: 75 },
                { x: 5, y: 49 },
                { x: 5, y: 90 },
                { x: 5, y: 29 },
                { x: 5, y: 36 },
                { x: 5, y: 25 },
                { x: 5, y: 18 },
              ]
            }
          ]
        }
      );
  };

  return (
    <div>
      <button onClick={corona_button_click}>JOSH!</button>
      <br/>
      {/* <Scatter data={data} /> */}
      <Scatter data={a} />
    </div>
  );
};

export default ScatterExample;


