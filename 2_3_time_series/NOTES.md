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
My Goal:

Again the hardest part of this assignment is finding useful data.

I have a spreadsheet I generated from 311 OpenData on rodent complaints logged since 2018. I'd ideally like to make a line that shows number of rodent complaints by month.

So I need to:
    * Group the data by month based on date (x axis)
    * Count the number of complaints by month (y axis)

This is a bit more complicated than the example I think which simply used date and a given quantity.

Reading in the data:
Before isoaltiing any fields, I read in the full CSV.
for my needs I am going to preserve the fields:
    * City
    * Created Date
    * Unique Key
Hopefully that's enough information to work with.

I'm already seeing some new issues I need to address:
    * The fields I want to access have spaces in their labels, I think this will be a problem in the code
        It looks like I may be able to use [bracket notation] to accomidate this 
    * All information has been entered as strings
        I think from the tutorial, the d3 date method might account for this...

I think the date as provided is probably OK, but I'm going to use the data read function to ensure that is the case, and rename a couple of objects, and just look at those.

OK, it looks like I have the data I need mostly set up and ready to go.

** Alert: No I don't. Instead of seting the created date as the date for the new 


Scales:
OK so here is where I guess I made it tricky for myself. Just to conceptualize it, I think I need:
    * x scale: linear, time:
    In most simple terms the I want to show a left to right progression of time. But in order to make this continuous, ideally I can group the dates by month, use those as increments with a range from first month to last month in my data and show a continuoius monthly progression.  

    x = time(month)

    * y-scale: count
    My count is not simple, because again, I need to create groups of incidents by month, then plot those.

    y = count(incedents grouped by month)

*** Alert to self *** I again have created a situation where I essentially need to create a new dataset from the existing data I found and then plot that. FML.

---------
Attempt 2: After meeting with professor, I have some new ideas. 

Data:

I'm going to try to add a value to each object in my data (array) that runs a function finding the date and month, and combining them. Then I may be able to "roll up" those objects to get a count which I can assign to the y axis.

I have a sense of the function I want to run. But I'm not sure where in the code it should be inserted. It feels like it should happen just after the data has been read in, then to iterate over that data to assign the new value to each object. 

I ended up using a foreach method and templating to create a new value/key pair for each object...I can't read this new date format, but I think it worked.

Scales:

I think for X I can still use a linear time scale, but for y I use a band scale based on my new "timeBucket" value. I'm not sure if I can directly use this for scale or if I still need to rollup and count...

Actually now I'm thinking this really should match a vertical bar chart? So:
    x scale is linear, categorical (timeBucket)
    y scale is lineear, count

    if the y scale of a normal count would look like this: 
         .domain([0, d3.max(data, d=> d.count)])
    Then I need to redefine the "count" category to tally all the incidencies in each 'timeBucket' value group. (And I'll need to do something simlar when charting my line.)

Rollup:
I created a new const monthCount to hold the reuslts of my d3.rollup.

Now I just need to figure out how to access that information when assigning my scales and line.

I'm definitely having some trouble with my new scales and accessing nested data. I tried working with the newly created roll-up "monthCount"...but I'm running into some issues. Here are my latest attempts at scales, but I'm getting an error message that "monthCount.map" isn't a function.

      // SCALES
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(monthCount, d => d.value)])
  .range([height - margin.bottom, margin.top])
  
  const xScale = d3.scaleBand()
  .domain(monthCount.map(d => d.key))
  .range([margin.left, width - margin.right])
  .paddingInner(.0) //to give the illusion of continuous time

If I change it to "data.map(...)" I can generatea line script, but it contains a bunch of NaN..

    // SCALES
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(monthCount, d => d.value)])
  .range([height - margin.bottom, margin.top])
  
  const xScale = d3.scaleBand()
  .domain(data.map(d => d.key))
  .range([margin.left, width - margin.right])
  .paddingInner(.0) //to give the illusion of continuous time

I don't think I can pull from both datasets (original and rollup) at the same time to create my scales separate from the data I'm joining to, but maybe? (Still just a bunch of NaN)

 // SCALES
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(monthCount, d => d.value)])
  .range([height - margin.bottom, margin.top])
  
  const xScale = d3.scaleBand()
  .domain(data.map(d => d.timeBucket))
  .range([margin.left, width - margin.right])
  .paddingInner(.0) //to give the illusion of continuous time

From the reading I'm doing I think this has something to do with nesting and "InternMap" but yeah I guess this is still an access issue. 

I actually don't think it is a "nesting" issue neccessarily, since monthCount is its own array...I just can't figure out why I'm not able to access that array with the map function...

I converted from a map back to an array. I was able to use that, and index postion to assign my scales and chart  path linked to my data!

It looks right, but now I'm so many steps away from my original data sets, no idea how I'll label/set up the axes, but I guess that's next...

