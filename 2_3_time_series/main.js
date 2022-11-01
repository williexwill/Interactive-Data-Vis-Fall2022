 /* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ;

/* LOAD DATA */

d3.csv('311_Service_Requests_from_2010_to_Present_Rodents_clean.csv', d => {
  return {
    time: Date(+d['Created Date']),
    borough: d.Borough,
    incident: d['Unique Key']
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

});