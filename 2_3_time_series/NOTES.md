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

Scales:
OK so here is where I guess I made it tricky for myself. Just to conceptualize it, I think I need:
    * x scale: linear, time:
    In most simple terms the I want to show a left to right progression of time. But in order to make this continuous, ideally I can group the dates by month, use those as increments with a range from firt month to last month in my data and show a continuoius monthly progression.  

    x = time(month)

    * y-scale: count
    My count is not simple, because again, I need to create groups of incidents by month, then plot those.

    y = count(incedents grouped by month)

*** Alert to self *** I again have created a situation where I essentially need to create a new dataset from the existing data I found and then plot that. FML.



