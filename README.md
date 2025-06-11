# Skip Waste Selection

This is a coding challenge by REMWaste for an application as a Full Stack Dev.

The sandbox is live at https://skipwasteselection.netlify.app/

The project was built on ReactJS and TailwindCSS using Vite, hosted on Netlify.  

## Task:
Completely redesign the webpage below while maintaining functionality was the task.

![Original](https://github.com/Geoshua/Skip-Waste-Selection/blob/main/src/assets/original.jpg "Original")

# Design Thoughts
Since I was told to keep the Functionality intact, I saw to keep the step progress tracker same at the top, with some refinements to the animation. Same thing for the originally footer now container at the bottom. Both elements are essentially the same but with bits of refinements to color and animation. 

The skip size selection is now a single box container, the right side being a scroll selector, and the left side displaying the skip size with an image for reference. same as the original site, when the user selects a skip it is displayed in a bottom container, in this case it would be much more useful for the user to compare the different skips. 

Personally I thought the grid design wouldve been sufficient and intuitive, the only potential flaw would be that there were too many skip sizes and you couldn't really see it all at once. I saw it as a fun opportunity to try to make a component that would tackle this problem in a much smaller footprint, not needing the user to actually scroll down the page. I was probably partially inspired by something like setting the alarm, where you get those dials to move the number.

## Drafting
This is the draft of a quick idea of implementing the page without using a very
conventional grid method, it is then given to ChatGPT to visualize it as proper
blocks and not just doodles.

![Draft](https://github.com/Geoshua/Skip-Waste-Selection/blob/main/src/assets/draft.jpg "Draft")

![AIdraft](https://github.com/Geoshua/Skip-Waste-Selection/blob/main/src/assets/aidraft.png "AIdraft")

## Footnotes
This is the final look of the project if you are too lazy to go check it out on the live site.

![Final](https://github.com/Geoshua/Skip-Waste-Selection/blob/main/src/assets/final.png "Final")
- The touch drag on the phone is a bit wonky, it would'nt have been a problem if I had made the whole page strictlly fitting on the phone but it works now so it works.
- I've noticed I forgot to include the disclaimer at the bottom box container, I am a little too unfazed to mingle with the project now that I am typing this readme from the bed.