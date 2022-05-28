<1-- Headings -->
# Habit Tracker












Changelog:
- added in the ability to use onMouseOver on the + symbol so that it'll select the currentHabitID and then it will increment the specific counter on Click
  - previously had a problem when trying to run both functions at the same time where the first click wouldn't increment the counter but would just change the currentHabitId





To do:
- need to make it so that the body that is typed in the input will be put as the body in the new habit 


- the problem right now is that the way that I'm saving is using local storage and isn't updating in the same way
- we can use handleChange to modify the original value, but need to figure out how when clicking submit it can be saved as a new array item 
- once I figure that out, I need to figure out if I can do the same thing when using localStorage