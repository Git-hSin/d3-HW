// @TODO: YOUR CODE HERE!
d3.csv("assets/data/data.csv").then(Data=>{

    console.log(Data);

    Data.forEach(x=>{
        x.healthcare= +x.healthcare;
        x.poverty= +x.poverty;
        x.smokes=+x.smokes
        x.age=+x.age
    });


// svg dims    
var svgWidth = 960;
var svgHeight = 500;

// chart margins

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100,
};

// chart dims

var cWidth = svgWidth - margin.left - margin.right;
var cHeight = svgHeight - margin.top - margin.bottom;

// svg group to hold chart, set dimension attributes

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// create scales that are within the chartHeight crange, based off passed data
var xScaleLinear = d3.scalelinear()
    .domain(d3.extent(Data, x => x.poverty))
    .range([chartHeight, 0]);

var yScaleLinear = d3.scalelinear()
    .domain(d3.extent(Data, x => x.healthcare))
    .range([chartHeight, 0]);

// function to determine axes
var bottomAxis = d3.axisBottom(xScaleLinear);
var leftAxis = d3.axisLeft(yScale);

var line = d3.line()
.x(x => xScaleLinear(x.poverty))
.y(d => yScaleLinear(x.healthcare));


var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("fill", "blue")
    .attr("opacity", ".5");

var textGroup = chartGroup.selectAll("text")
    .data(Data)
    .enter()
    .append("text")
    .attr("x", x => xScaleLinear(x.poverty - 7))
    .attr("y", x => yScaleLinear(x.healthcare + 4))
    .attr("font-family", "sans-serif")
    .attr("fill", "white")
    .text(x=>x.abbr)

// append svg group to the chartGroup
chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);


var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);
  
var xLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "proverty")
    .classed("active", true)
    .text("In Poverty (%)");


chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Without Healthcare (%)");
    

});