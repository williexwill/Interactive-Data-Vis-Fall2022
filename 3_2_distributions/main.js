/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 };

let svg;
let xScale;
let yScale;
let colorScale;
let sizeScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // I can't figure out how to have my 
  // dropdown accurately reflect the initial state
};
console.log("state2", state);

/* LOAD DATA */
d3.csv("LaborData.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  state.data = raw_data;
  console.log("state3", state);
  init();
});


/* INITIALIZING FUNCTION */
function init() {

  // + SCALES
 // xScale  - linear,count
 xScale = d3.scaleLinear()
 .domain([0, 1])
 .range([margin.left, width - margin.right])

// yScale - linear,count
yScale = d3.scaleLinear()
 .domain([0, 1])
 .range([height - margin.bottom, margin.top])

// colorScale
colorScale = d3.scaleOrdinal()
 .domain(["Republican", "Democrat", "ID"])
 .range(["red", "blue", "green"])

// sizeScale - square root, count
sizeScale = d3.scaleSqrt()
 .domain(d3.extent(state.data, d => d.Population))
 //.range([0, 20])
 .range([1, 70])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d => (d * 100) + '%'); //to convert to percent from decimal ranking
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => (d * 100) + '%');


  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  selectElement  
    .selectAll("option")
    .data([...Array.from(new Set(state.data.map(d => d.Party))), "All"])
    .join("option")
    .attr("value", d => d)
    .attr("selected", d => (d === "All"))
    .text(d => d)

  selectElement
    .on("change", (event) => {
      console.log(event)
      console.log("prev", state)
      state.selectedParty = event.target.value;
      console.log("post", state)

      draw();
    })

  console.log(selectElement)


  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "rgb(213 200 175)")

  // + CALL AXES
  const xAxisGroup = svg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height - margin.bottom})`) // move to the bottom
    .call(xAxis)

  const yAxisGroup = svg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${margin.left}, ${0})`) // align with left margin
    .call(yAxis)

  // add labels - xAxis
  xAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .attr("fill", "#333333")
    .attr("font-family", "Amiri")
    .attr("font-size", "1.5em")
    .text("Ideology Score 2020")

  // add labels - yAxis
  yAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", -40)
    .attr("y", height / 2)
    .attr("writing-mode", "vertical-lr")
    .attr("text-anchor", "middle")
    .attr("fill", "#333333")
    .attr("font-family", "Amiri")
    .attr("font-size", "1.5em")
    .text("AFL-CIO Lifetime Labor Rating")
  draw(); 
}

/* DRAW FUNCTION */
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.score_name)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle")
          .attr("r", 5)
          .attr("class", "dot")
          .attr("cx", d => xScale(d.ideology))
          .attr("cy", d => yScale(d.Score))
          .attr("fill", d => colorScale(d.Party))
          .call(sel => sel
            .transition()
            .duration(2000)
            .attr("r", d => sizeScale(d.Population))
          ),

      // + HANDLE UPDATE SELECTION
      update => update
        .call(sel => sel.transition()
          .duration(1000)
          .attr("r", 5) 
          .transition()
          .duration(1000)
          .attr("r", d => sizeScale(d.Population))      
      ),

      // + HANDLE EXIT SELECTION
      exit => exit
        .call(sel => sel
          .attr("opacity", 1)
          .transition()
          .duration(1000)
          .attr("opacity", 0)
          .attr("r", 5) 
          .remove()
          )
    );
}


