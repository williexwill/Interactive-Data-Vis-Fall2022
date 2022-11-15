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

For this tutorial, I'm going to build off of my first distribution tutorial. I'm going to see if I can tweak the transitions I built into that to function more cleanly, and apply them to a dropdown filter instead of upon page load. I'll also add some axes. 

I'm starting by copying over and tweaking code from my completed tutorial 2_2. 

This pretty much worked as planned. At least I nailed my transitions. The parts where I'm still running into trouble are:

    * Customizing my axes. It feels like this should be simple, but I've really been struggling with this throughout the tutorials. I did a little better here than the last tutorial, getting my labels to display and customizing my tick text as well...

    * Having the text of the dropdown match the initial state of the page. Do I need to add a function or attribute during the "option" element setup that determines this? Not sure why it doesn't get set by the int()...

With more time, I would append labels (active on hover) to each dot, with information on State, Population, and Senator name. I could aslo add a bit of CSS to the dropdown to incorporate it better.