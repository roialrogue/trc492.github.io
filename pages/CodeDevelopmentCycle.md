Before writing any code, let's understand the proper Code Development Cycle.

## Analyze The Problem
Don't start writing code right away. Think through and analyze the problem you are solving. Write down the problem on the whiteboard, draw diagrams, use whatever tools to help you visualize and understand the problem. If the problem is too complex, break it down into smaller manageable units. It's easier and less error prone to solve a smaller problem than a large complex problem. Write down your solution in English (Pseudo-code). 

## Run Through All Scenarios
Go through the solution again and again for all possible scenarios until they are all covered.

## Translate Pseudo-code To Real Code
Write maintainable code. Choose appropriate variable and method names, write comments, and write useful commit notes. You're not just making life easier for others, you're making life easier for yourself next week when you can't remember what you were thinking. It's very important to comment your code in detail, especially if the code is doing something tricky. I assure you that you will be scratching your head on why you did it that way weeks after you wrote the code. Even worse, if you no longer understand the reasons why you did it, you may be tempted to "fix it" that will break whatever that tricky code was trying to solve. If the purpose of a variable or method has changed, change its name to reflect the new purpose. Yes, you will need to change all references to it but don't be lazy. It is worst to read code that doesn't do what its name implied to do. Besides, most Integrated Development Environments (IDE) will search and replace the references for you anyway. Appropriately named variables and methods help you and others to understand the code better and faster.

## Code Incrementally
Don't try to write the entire code all at once. Write the code systematically in logical units and test each one thoroughly before starting the next unit. This will make sure testing and debugging are manageable and have good code coverage.

## Test Your Code
Don't just write the code and expect it to work without testing. Test all possible code paths. For example, if you write the code for the Blue Alliance and let auto-reflection to take care of the Red Alliance, you still need to test out the Red Alliance. There will be unexpected scenarios that either auto-reflection cannot handle, or you did not auto-reflect the code correctly.

## Debug Your Code
When the code is not behaving correctly, you need to debug it. Don't try to guess the cause and fix it. You need to debug it. When debugging, your first task is to root-cause the problem. Find out what's causing the unexpected behavior and why. Making guesses seems faster, but in the long run it is faster to slow down and find out why your code is behaving how it is. Then you can be sure that the change you are making will actually fix the problem. Patching a symptom without understand the cause (e.g. negating an input or sensor value) may seem to fix the problem, but I assure you that's WRONG. It may seem to fix the problem, but it will break something else that you are not expecting.

## Code Review
Once the code is fully tested and debugged, have a mentor and/or a peer to review your code. Having a fresh pair of eyes to inspect your code will usually reveal scenarios that you forgot to handle. Also, in the process of explaining the code to somebody, you will usually find something wrong with your code that you did not handle.

## Repeat The Process
Once a bug is found, repeat the process of analyzing the problem, understanding the cause, coming up with a new fix, testing the fix and reviewing the fix until no more bug is found.

## Document Your Code
Fully comment your code and add JavaDoc for all methods. The comment must add understanding to the code. Don't state the obvious because it doesn't add any value to the understanding. If the code is tricky, explain what it is trying to solve and how you solved it.

## Check In Your Code
When checking in your code to the repository, do it incrementally and add detail explanation on what the check-in fixes. If something goes wrong with the code, you want to be able to look at the check-in log to figure out which fix might have broken the code and be able to back out a particular fix to prove it is indeed the culprit.

## Finish The Code Early
You need to give enough time for the drivers to give you feedback so you can make corresponding changes. It's always tricky to finish software early because the robot is generally not finished early. Try to do whatever you can make progress without the real robot. If at all possible, try to make use of robots from previous seasons. For example, debugging autonomous pathing could be done with any previous robots as long as the code doesn't try to access non-existing subsystems. That's why our code makes use of subsystem switches that can selectively turn ON/OFF subsystems that don't exist. Always write your code assuming some subsystems may not exist (i.e. check if subsystems exist before trying to access them).

## Robot Tuning
Tune the robot early before competition. DO NOT TUNE THE ROBOT AT COMPETITION! If you do, it's guaranteed to be a stressful season.
