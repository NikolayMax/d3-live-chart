let data = [],
width = 1000,
height = 500,
margin=30,
xScale,
yScale,
xAxis,
yAxis,
xRange = [0, 100];

function random(min, max){
  return Math.floor(Math.random() * (+max - +min)) + +min;
}
    
for(let i = -1000; i <= 1000; i+=10){
	data.push({
		x: i,
    y: random(0, 100)
	})
}
let oldData = [];

let svg = d3.select("svg")
	.attr("width", width)
  .attr("height", height);
  
xScale = d3.scaleLinear().domain([0, 100]).range([0, width - margin * 2]);
yScale = d3.scaleLinear().domain([0, 100]).range([height - margin * 2, 0]);

xAxis = d3.axisBottom(xScale);
yAxis = d3.axisLeft(yScale);

let wrapXAxis = svg.append('g');
wrapXAxis
  .attr('transform', `translate(${margin}, ${height - margin})`)
  .call(xAxis);
  
svg.append('g')
  .attr('transform', `translate(${margin}, ${margin})`)
  .call(yAxis);

oldData = data.filter(i => i.x >= xRange[0] && i.x <= xRange[1])
console.log(oldData);

svg.append('g')
  .attr("class", "wrap-circle")
                .selectAll('circle')
                .data(oldData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.x) + margin)
                .attr("cy", d => yScale(d.y) + margin)
                .style("fill", "#3c8dbc" )
                .attr("r", 2);


function prev(){
  xRange = [xRange[0]-10, xRange[1]-10];
  newxScale = d3.scaleLinear().domain(xRange).range([0, width - margin * 2]);
  
  
  console.log(xRange, oldData, oldData.filter(i => i.x <= xRange[1]));
  
  oldData = oldData.filter(i => i.x <= xRange[1])
                  .concat(data.filter(i => i.x >= xRange[0] && i.x < xRange[0]+10))
  
  
   d3.select(".wrap-circle")
     .selectAll("circle")
    .data(oldData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x) - margin)
    .attr("cy", d => yScale(d.y) + margin)
    .style("fill", "#3c8dbc" )
    .attr("r", 2)
  
  
  d3.selectAll("circle")
    .data(oldData)
    .transition()
    .duration(1000)
    .attr("cx", d => newxScale(d.x) + margin)
    .attr("cy", d => yScale(d.y) + margin)
    .attr("myx", d => d.x)
    .attr("myy", d => d.y);
 xScale = newxScale;
 
  
  xAxis = d3.axisBottom(xScale);
  
  wrapXAxis.transition().duration(1000).call(xAxis);
}