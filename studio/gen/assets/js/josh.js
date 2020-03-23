$(function(){

    let chart = document.querySelector('canvas').chart;

    $(document).on('click', function(){

        console.log(chart.data.datasets[0].data);

        // When the document is clicked, update the chart 
        // with a random value and animate it.

        chart.data.datasets[0].data[2] = Math.random()*10000;
        chart.update();
    });

});