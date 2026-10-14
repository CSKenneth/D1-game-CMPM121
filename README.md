# What we did

We created a simple cookie clicker based on the theme of bread. It should be noted that we had minor issues with our commits and had to go back and edit in the co-author part for commit
"3. Timed growth" and "Steps 3, 4, and 5".

# Commits

1. A button you can click - Made it so that you can click the square image button
2. Timed growth- created automatic resource growth where you would gain cookies with every passing second
3. Steps 3, 4, and 5 - Created an automatic growing resource with the rate being independent of display frame rate. Also created a clicker upgrade and autoclicker upgrade that becomes more expensive and better with each upgrade
4. Step 9 reworked upgrade system and logic - swapped out the copy-paste style blocks for each upgrade and create an Upgrade class with data fields and two methods to support purchase validation and cost increases+effect applications. This allowed us to use an upgrades array to hold our four improvements and use for loops where needed to create relevant buttons and update the display for slice amounts etc.
5. Button text adjustment - slight changes to the buttons to utilize the types of upgrades used within the class (button now accurately labels increases with per click or per second based on the upgrade type)
6. Created a coherent theme and other small changes - Made the whole project theme based on bread and changed all variable names to be bread based. By changing the variable names it allowed the
   parts of code to make sense when comparing to the playable demo. Without changing the names it would become confusing.
7. README and added another event listener for "mouseleave" to prevent bread image being stuck if the user drags off the image.

# Playable Link

https://cskenneth.github.io/D1-game-CMPM121/

# Commit Link

https://github.com/CSKenneth/D1-game-CMPM121/commits/main/src

# Sources

Ai image generator used to create bread images.(https://deepai.org/machine-learning-model/text2img)
requestAnimationFrame() method (https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
An idea of how to handle automated production and the required display updates (https://developer.mozilla.org/en-US/docs/Games/Anatomy)

# D1 starter

A minimal TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
