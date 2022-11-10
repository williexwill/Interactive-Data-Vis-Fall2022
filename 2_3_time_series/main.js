 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 60 }

/* LOAD DATA */

d3.csv('311_Service_Requests_from_2010_to_Present_Rodents_clean.csv', d => {
  return {
    time: new Date(d['Created Date']),
    borough: d.Borough,
    incident: d['Unique Key']
  }
}).then(data => {
  console.log('data :>> ', data);

  //Create new date value key
  data.forEach(d => {
    d.timeBucket = `${d.time.getMonth()}_${d.time.getYear()}`;
    });
  console.log('dates :>> ', data);

  //Rollup data
  const monthCount = d3.rollup(data, v => v.length, d => d.timeBucket);
  console.log(monthCount);

  // SCALES
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(monthCount, d => d.value)])
  .range([height - margin.bottom, margin.top])
  
  const xScale = d3.scaleBand()
  .domain(data.map(d=> d.timeBucket))
  .range([margin.left, width - margin.right])
  .paddingInner(.0) //to give the illusion of continuous time

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
//   // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION
  // const line = d3.line()
  // .x(d => xScale(d.timeBucket))
  // .y(d => yScale(//whatever I come up with))

  const groupedData = d3.groups(data, d => d.borough)
  console.log(groupedData)

  // DRAW LINE
  const path = svg.selectAll("path")
  .data("data")
  .join("path")
  //.attr("d", ([country, data]) => line(data))
  //.attr("class", ([country, data]) => country)
  .attr("stroke", "black")
  .attr("fill", "none")

  });
  



