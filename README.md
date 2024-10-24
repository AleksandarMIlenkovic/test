Game Developer (Technical Test)
Please implement these tasks using PixiJS within a single application. Implement some way of switching between the implementations in
the app.
Put the code into a new repository on GitHub and commit there during your progress like you do in your real projects, so the history and
commit messages can be reviewed.

Task 1:
Create 144 sprites (NOT graphics objects), that are stacked on each other like cards in a deck, (so the object above covers the bottom one,
but not completely). Every second 1 object from the top of the stack goes to another stack - the animation of moving should be 2 seconds
long. So at the end of the whole process, you should have the reversed stack. Display the number of cards in each stack and fps. Make
sure, that this demo runs well on low-end devices and mobile devices.

Task 2:
Create a tool that will allow creation of mixed text and images objects easily (for example displaying text with emoticons or prices with
money icon). It should come up every 2 seconds with a random text and images in random configuration (image + text + image, image +
image + image, image + image + text, text + image + text, etc.) and a random font size.

Task 3:

Particles - make a demo that shows an awesome fire effect. Please keep the number of images low (max 10 sprites on screen at once).
Feel free to use existing libraries how you would use them in a real project.

Please add a description of what are the main challenges of each task and how you solve them.

Usage:
1. Clone the repository

2. Run `npm i` - 
3. Run `npm run start`

Main challenges:
1. Task 1 - Mostly handling x and y coordinates and making sure that the animation is smooth and runs well on low-end devices.
2. Task 2 - I used pixi text here so no issues since it already supports emojis
3. Task 3 - to be honest i was counting that pixi-particles or revolt fx would work, both had some forks that supposed to work with pixi8 but they dont, so i had to make my own, i am not really happy how it turned out, tbh..
