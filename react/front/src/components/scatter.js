import React, {useState} from 'react';
import {Scatter} from 'react-chartjs-2';

const ScatterExample = () => {

  const [a, b] = useState(
    {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'Confirmed Cases',
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
      .then(data => {

        let confirmed_arr = [];
        data.US.forEach((val, idx, arr) => {
          console.log(val.confirmed)

          confirmed_arr.push({x: idx, y: val.confirmed});

          
        });
        console.log(confirmed_arr);

        b(
          {
            labels: ['Scatter'],
            datasets: [
              {
                label: 'Confirmed Cases',
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
                data: confirmed_arr
              }
            ]
          }
        );
      });

  };

  return (
    <div>
      <button onClick={corona_button_click}>Update Cases</button>
      <br/>
      {/* <Scatter data={data} /> */}
      <Scatter data={a} />
    </div>
  );
};

export default ScatterExample;


