var minWeek = d3.min(weightData, function(d) { 
  return d.week;  
});
var maxWeek = d3.max(weightData, function(d) {
  return d.week;
});
var width = 600;
var height = 200;
var barPadding = 10;
var numBars = 12;
var barWidth = width / numBars - barPadding;
var maxWeight = d3.max(weightData, function(d) { 
  return d.weight;
});
var yScale = d3.scaleLinear()
               .domain([0, maxWeight])
               .range([height, 0]);

d3.select("input")
    .property("min", minWeek)
    .property("max", maxWeek)
    .property("value", minWeek);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("rect")
  .data(weightData.filter(function(d) {
    return d.week === minWeek;
  }))
  .enter()
  .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d) {
      return height - yScale(d.weight);
    })
    .attr("y", function(d) {
      return yScale(d.weight);
    })
    .attr("x", function(d,i) {
      return (barWidth + barPadding) * i;
    })
    .attr("fill", "purple");


// Title to specify week
d3.select('svg')
  .append('text')
  .classed('title', true)
  .text('Data in ' + minWeek)
  .attr('x', width / 2)
  .attr('y', 30)
  .style('text-anchor', 'middle')
  .style('font-size', '2em')

const ms = 2e3;
const delay_ms = 50;

d3.select("input")
    .on("input", function() {
      var week = +d3.event.target.value;
      d3.selectAll("rect")
        .data(weightData.filter(function(d) {
          return d.week === week;
        }))

        // Transitions:
        .transition()
        .duration(ms)
        .ease(d3.easeCubic) // default
        //.ease(d3.easeLinear)
        .delay((d,i) => i * delay_ms)
        .on('start', (d, i) => {

          
          // Only listen for start event on first rectangle
          if (i === 0) {
            d3.select('.title')
              .text('Updating to ' + week + ' data...')
          }
        })
        .on('end', () => {
          d3.select('.title')
            .text(week)
        })


          .attr("height", function(d) {
            return height - yScale(d.weight);
          })
          .attr("y", function(d) {
            return yScale(d.weight);
          });
    });