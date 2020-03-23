import React, {useState} from 'react';
import {Scatter} from 'react-chartjs-2';
import { readString  } from 'react-papaparse'

const ScatterExample = () => {

  const [a, b] = useState(
    {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'Cases',
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
        console.clear();
        console.log(res);
        return res.json();
      })
      .then(data => {

        let confirmed_arr = [];
        data.US.forEach((val, idx, arr) => {
          confirmed_arr.push({x: idx, y: val.confirmed});
        });

        b(
          {
            labels: ['Scatter'],
            datasets: [
              {
                label: 'Confirmed',
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

  const johns_hopkins_click = _ => {
    
    const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

    fetch(url)
        .then(res => res.text()).then(data => {

            const x = readString(data);
            for (let i = 0; i < x.data.length; ++i)
            {
              if (x.data[i][1] == 'US')
                console.log(x.data[i]);
            }
        });
  }

  return (
    <div>
      <button onClick={johns_hopkins_click}>Johns Hopkins</button>
      <button onClick={corona_button_click}>Update Cases</button>
      <br/>
      <Scatter data={a} />


    </div>

  );
};

export default ScatterExample;


