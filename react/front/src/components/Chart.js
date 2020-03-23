import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const chartConfig = {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
};

const Chart = () => {
  // ============================================
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  // ============================================
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);
  // ============================================
  const updateDataset = (datasetIndex, newData, newLabels) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.labels = newLabels;

    console.log(chartInstance.data.labels);

    chartInstance.update();
  };
  // ============================================
  const onButtonClick = (event) => {

    const url = 'http://localhost:8888/josh';
    fetch(url)
      .then(res => res.json())
      .then(({data}) => {

        console.log(data[0].name, data[0].quantity);

        const x = data[0].quantity;
        const n = data[0].name;

        updateDataset(0, [x,x,x,x,x,x,x], [n, n, n, n, n, n]);
      });
  };
  // ============================================
  // https://github.com/pomber/covid19
  const corona_button_click = (event) => {
    console.log('CORONA button click!');

    const url = 'https://pomber.github.io/covid19/timeseries.json';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => console.log(data.Canada));
  };
  // ============================================
  return (
      <div>

          <input id="josh" type="number"/>
          <button onClick={onButtonClick}>JOSH!</button>
          <button onClick={corona_button_click}>COVID-19</button>
          <canvas ref={chartContainer} />

          
      </div>
  );
  // ============================================
};

export default Chart;