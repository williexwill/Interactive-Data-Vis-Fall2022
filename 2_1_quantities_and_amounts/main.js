
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
//const height = 500;
//const width = 800;
const height = window.innerHeight *.8 ;
//const marginW = window.innerWidth *.7;
//const marginH = window.innerHeight *.7;
const margin = 50

/* LOAD DATA */
d3.csv('data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

  /* SCALES */
  // xscale - linear, count
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)])
    .range([margin, width - margin]) // visual variable
    

    // yscale - linear,activity
  const yScale = d3.scaleBand()
    .domain(data.map(d=> d.activity))
    .range([height - margin, margin])
    .paddingInner(.2)

  //color scale - ordinal, colors
  const color = d3.scaleOrdinal()
    //.domain(data.map(d=> d.activity))
    .domain(data)
    .range(d3.schemeDark2)

  //  //color scale - sequential, grey
  //  const color = d3.scaleSequential()
  //  //.domain(data.map(d=> d.activity))
  //  .domain(data)
  //  .range(d3.interpolateGreys)

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    //.attr("width", xScale.bandwidth())
    //.attr("height", d=> height - yScale(d.count))
    .attr("width", d=> xScale(d.count))
    .attr("height", yScale.bandwidth())
    //.attr("x", d=> xScale(d.count))
    .attr("x", margin)
    .attr("y", d=> yScale(d.activity))
    //.attr("fill", function(d){return color(d)})
    .attr("fill", d=> color(d.activity))
    
  // axes 
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .style("transform", `translate(0px, ${height - margin}px)`)
    .call(xAxis);
  svg.append("g")
    .style("transform", `translate(${margin}px, 0px)`)
    .call(yAxis);
})  