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
  console.log('monthCount rollup', monthCount);
  console.log('data and map?', data);
  let monthArray = Array.from(monthCount);
  console.log('monthArray conversion', monthArray);
  
  // SCALES
  // const yScale = d3.scaleLinear()
  // .domain([0, d3.max(monthArray, d => d.value)])
  // .range([height - margin.bottom, margin.top])
  
  // const xScale = d3.scaleBand()
  // .domain(monthArray.map(d => d.key))
  // .range([margin.left, width - margin.right])
  // .paddingInner(.0) //to give the illusion of continuous time

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(monthArray, d => d[1])])
  .range([height - margin.bottom, margin.top])
  
  const xScale = d3.scaleBand()
  .domain(monthArray.map(d => d[0]))
  .range([margin.left, width - margin.right])
  .paddingInner(.0) //to give the illusion of continuous time

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
  // BUILD AND CALL AXES
  // const xAxis = d3.axisBottom()
  // .scale(xScale)
  // // .ticks(9)
  // // .tickFormat(d => d['Feb 2018','Aug 2018','Feb 2019','Aug 2019','Feb 2020','Aug 2020','Feb 2021','Aug 2021','Feb 2022']);
  
  const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickValues(xScale.domain().filter(function(d,i){ return !(i%6)}))
  .tickFormat((d, i) => ['Feb 2018','Aug 2018','Feb 2019','Aug 2019','Feb 2020','Aug 2020','Feb 2021','Aug 2021','Feb 2022', ''][i]);

  const yAxis = d3.axisLeft(yScale);

  // svg.append("g")
  //     .style("transform", `translate(${margin}px, ${margin}px)`)
  //     .call(xAxis);
  // svg.append("g")
  //     .style("transform", `translate(${margin}px, ${margin}px)`)
  //     .call(yAxis);

  // LINE GENERATOR FUNCTION
  //failed experiment 
  // const line = d3.line()
  // .x(d => xScale(d.key))
  // .y(d => yScale(d.value))

  //This one works for the line
  // const line = d3.line()
  // .x(d => xScale(d[0]))
  // .y(d => yScale(d[1]))

  const area = d3.area()
  .x(d => xScale(d[0]))
  .y1(d => yScale(d[1]))
  .y0(yScale(0));

  //Grouped data, but not sure how to incorporate with the roll up...
  // const groupedData = d3.groups(data, d => d.borough)
  // console.log(groupedData)


  // // DRAW LINE/GRAPH
  // //This works
  const path = svg.selectAll("path")
  .data([monthArray])
  .join("path")
  .attr("d", d => area(d))
  //.attr("class", ([borough, data]) => borough)
  .attr("stroke", "black")
  .attr("fill", "black")

svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis)
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll(".tick line").clone()
      .attr("x2", width - margin.left - margin.right)
      .attr("stroke-opacity", 0.1))
  .call(g => g.append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .text("311 Rodent Sightings"));

svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis)
    // .ticks(9)
    // .tickFormat(d => d['Feb 2018','Aug 2018','Feb 2019','Aug 2019','Feb 2020','Aug 2020','Feb 2021','Aug 2021','Feb 2022']));

  });
  


