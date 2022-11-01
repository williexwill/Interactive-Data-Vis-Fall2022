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

Finding the data:

The first step in this assignment will be finding a new data source. The challenge is to find something that a) is interesting but b) crucially contains data that makes sense to present in a scatter plot.

I like the example used in the demo to look at a particular policy or political rating and see how that maps onto political alignment/party. I think for the size dimension it would be interesting to see the population represented by the politician shown. I don't know where I will find the data but I guess I need to find a data set that includes:
    * Politicians listed by district
    * district sizes (size)
    * party affiliation (color)
    * ideological ranking (x axis)
    * score (y axis) ((I'm interested in labor issues, so maybe I can find somehting there))

I am going to check the source for the ideological scores. However I know that the dataset used in the was joined to environmental data from another source. I'm not sure how confident I am in my python/data joining skills at the moment, so I may need to find a different datapoint to look at in this chart, or maybe find some new data altogether... I'm going to have to add population data also...hmm maybe I'll try to dust it off.  (I imagine there's a way to do data joins in JS, but we maybe haven't covered it yet.)

Data Sources:
https://www.govtrack.us/congress/members/report-cards/2020/senate/ideology
http://goodcsv.com/geography/us-states-territories/
https://aflcio.org/scorecard/legislators 

I found a bunch of interesting data...but I realize I'm burning too much time trying to combine and clean that data. I need to find a new data set, (preferably saved as a JSON?), that has 4 data points that make sense to map as a scatter plot...

After looking through NYC OpenData I got frustrated and against my better judgement went ahead and created my own dataset manually using the sources above...(sometimes when you have a good question to answer it's hard to come up with another one on the spot.)

Load Data:

First step is reading in my data. I have it saved as a csv, so I'm going to usd the d3.csv method. Log that, and check in a live browser. Looks good.

Scales:

* Going to start with x and y. Like the demo I'm going to set the ideology score left -> right on the x axis. Thankfully the ideology score has "progressives" at 0 and scales up to 1 for conservatives (which means going left to right from 0->1 will match with the common conception of "left" and "right" politics).

* For the y-axis I'm using lifetime scores from the AFL-CIO. These were created as percentages (that I converted to decimals as part of my data cleaning), with 1 being friendly and 0 being antagonistic to labor. Should also easily map onto the y axis alomg the same range/scale.

* Color: there are a few independents I want to account for, so for domain I have Republican, Democrat, and ID, and i'll add green to the range.

* Size: This will be a little tricky. As mentioned I want to size the dots by state population. obviously a 1 to 1 scale won't work. Once I figure out the code, and get everything loaded I might need to experiment with visibility. The actual range is max: 39,512,223 (CA) and min: 578,759 (WY). Also because I'm dealing with scale of circles, I need to keep in mind the area needs to be proportional. So I need a square root scale, and ideally some way to dynamically determine the min-max values (what if everyone in CA moves to WY??).

    My first attempt looks like this:
    // sizeScale - square root, count
  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(pop)])
    .range([0,120])

    My thinking was that the domain should be minimum of 0 and maximum, whatever the highest value of my most populous state within my array. Tying this scale later to the radius, and having it run a function over the .Population attriubute within my array...

    But I tried the above and it is kicking some errors, so now I'm not sure you can nest the max method this way...

    In an attempt to debug, I'm just going to set the max at 8e6 and see if the page works. ** (square root of 8e6)...
    And I just realized my population was a string not a number. Adjusting in my original data...

    And it works...without the dynamic domain anyway. I just set the threshold highenough to accommidate but if I had more time, I would work on this further.

    Current code:
    const sizeScale = d3.scaleSqrt()
    //.domain([0, d3.max(pop)])
    .domain([0, 8e6])
    .range([0, 10]) (after playing with the range 10px seemed to work well)

  ** after another tutoiral, realized I could use the d3.extent function for my domain! Code updated. Now dynamic! 

  const sizeScale = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.Population))
    .range([0, 20])
    //.range([1, 70])
  
    However, I haven't figured out how to also make my *range* dynamice here...I guess it maps dyanmicaly, but I think I shouldn't start the range at 0. I guess ideally the range should at least account for the proportional difference between minimum and maximum if possible, and that's something on the scale of 1/70. That scale doesn't really work visually while also showing isoalted data points...perhaps somehting that could be achieved through interactivity.... a transition that began with a set visible radius for each senator, then sclaed proportionaly to show their constituency, might actually drive home the argument I'm trying to look at here about proportional support/antagonism towards labor issues.  

  

X and Y axis:
Left these blank, but would consider adding labels. As an admitted shortcut, I added some explanitory text directly in the HTML. 

Circles:
For this section I originally was going to keep it simple without transitions. But I revisted it after realzing some of the dynamic scaling and range issues I detailed above, and attempted to incoprorate both visualizations of the data via transition animation.