/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 };
  

/* LOAD DATA */
d3.csv("LaborData.csv", d3.autoType)
  .then(data => {
    console.log('data', data)
    const selection = d3.select("#selection")
    console.log(selection)

  /* SCALES */
  // xScale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right])

  // yScale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height - margin.bottom, margin.top])

  // colorScale
  const colorScale = d3.scaleOrdinal()
    .domain(["Republican", "Democrat", "ID"])
    .range(["red", "blue", "green"])

  // sizeScale - square root, count
  const sizeScale = d3.scaleSqrt()
    //.domain([0, d3.max(pop)])
    .domain([0, 8e6])
    .range([0, 10])
    
      /* HTML ELEMENTS */

  // svg
  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#dcdbd9")

// x axis

// y axis

// circles
const circles = svg.selectAll(".dot")
  .data(data)
  .join(
    enter => enter
      .append("circle")
      .call(sel => sel.transition()
        .duration(1000)
        .delay(d => d.ideology * 2000),
    update => update,
    exit => exit,
  )
  .attr("class", "dot")
  .attr("cx", d => xScale(d.ideology))
  .attr("cy", d => yScale(d.Score))
  .attr("fill", d => colorScale(d.Party))
  .attr("r", d => sizeScale(d.Population))
  )
    
  });

