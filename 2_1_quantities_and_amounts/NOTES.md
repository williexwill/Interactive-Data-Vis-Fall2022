## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------

Starting by attempting to reverse the attributes assigned to x and y axis. 
This entails:
    - changing the scales
    - adjusting the bars

    Both to reflect x = count and y = activites

Had to look up d3 map and max functions. 

Getting an error message that expected attribute "width" is NaN. This is related to the  
code I'm using to generate my rectangle bars...

Adjusted my code. Now I'm finally seeing horizontal bars, but they are appearing to sart and stop at random places. I need to make sure the count/width is starting at x = 0...

Here is what I currently have:
  // bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", d=> xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("x", d=> xScale(d.count))
    .attr("y", d=> yScale(d.activity))

Lol, got it. All the funny math we needed to set the negative height of the SVG not needed at all when working horizontal:
 svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", d=> xScale(d.count))
    .attr("height", yScale.bandwidth())
    //.attr("x", d=> xScale(d.count))
    .attr("x", 0)
    .attr("y", d=> yScale(d.activity))

Now I'm trying to add the axes.
I got the axes to appear by following the video demo. But when I try to adjust the margins to place them and make them visible, I'm running into problems. I'm wondering if it is because I have dynamic sizing for my chart. I'm going to try to create dynamic consts for both height and widhth margins and incorporate those.

Added these, and then added them to the scale calculations per the video, but don't seem to be doing what I want them to...
const marginW = window.innerWidth *.7;
const marginH = window.innerHeight *.7;

Maybe dynamism isn't the problem here...it feels like there should be a way to create margins within my container...

OK figured that out by using constant margins and incorporating it at the proper points in the code. 

I spent some time trying to figure out how to rotate the text labels on the Y axis, but after coming up short, instead I just decided to increase the margin.

I'm trying to add color. I imported the library and set up a new const var for color:

  //color scale - oridanal, greys
    const color = d3.scaleOrdinal()
      .domain(data.map(d=> d.activity))
      .range(d3.schemeCategory10)

Then I added this attribute to my svg:

  .attr("fill", function(d){return color(d)})

This was based on documentation I found online...but now I'm not sure if I need to replace "function" in the attribute code with the mapping...

Yeah wow the documentation wasn't very clear on this. Edits worked. Put the scale function in the attributes.

.attr("fill", d=> color(d.activity))

I played around with sequential, but didn't want to spend more time figuring that out now. Maybe I'll come back to it.