# Before You Begin

::: warning
Please make sure to take note of the following before continuing!
:::

::: important
**1.** The target audience for this framework is students who already have a solid understanding of the Java language. While it's not required, I highly recommend being familiar with the basics of the FTC SDK, since the Trc Framework is built on top of it.
:::

::: important
**2.** It’s highly recommended that you read both the [Code Development Cycle](#code-develpment-cycle) and [Debugging Process](#debugging-process) sections. They’ll give you a solid understanding of how to approach writing and debugging your code effectively.
:::

::: tip 
**3.** Using `.xml` files, you can create a hardwareMap configuration. It’s highly recommended to set this up it makes editing easier, helps catch setup errors, and prevents hardware map issues like losing your configuration when scanning for new devices. You can learn how to set it up [here](#setup-hardwaremap)!
:::

::: caution 
Please don’t try to set up TrcLib right before a competition—it won’t go well. Trust me, I’ve tried it. Even if you’re highly proficient with the FTC SDK, give yourself plenty of time to get familiar with everything.
:::

::: note
This document is designed to provide practical insights and real-world setup and tuning experiences from the developers of the framework. It’s not required to set up the Trc Framework. For experienced users, the library is fully documented with [JavaDocs](https://trc492.github.io/FtcJavaDoc/index.html).
:::

## Code Develpment Cycle

Before writing any code, let's understand the proper Code Development Cycle. This section will walk you through the code development cycle used to create the Robotics Framework, along with helpful tips w discovered.

#### Analyze The Problem
Don't start writing code right away. Think through and analyze the problem you are solving. Write down the problem on the whiteboard, draw diagrams, use whatever tools to help you visualize and understand the problem. If the problem is too complex, break it down into smaller manageable units. It's easier and less error prone to solve a smaller problem than a large complex problem. Write down your solution in English (Pseudo-code). 

#### Run Through All Scenarios
Go through the solution again and again for all possible scenarios until they are all covered. Lots of bugs come from unexpected scenarios.

#### Translate Pseudo-code To Real Code
Write maintainable code. Choose appropriate variable and method names, write comments, and write useful commit notes. You're not just making life easier for others, you're making life easier for yourself next week when you can't remember what you were thinking. It's very important to comment your code in detail, especially if the code is doing something tricky. If you no longer understand the reasons why you did it, you may be tempted to "fix it" that will break whatever that tricky code was trying to solve. If the purpose of a variable or method has changed, change its name to reflect the new purpose.

#### Test Your Code
Don't just write the code and expect it to work without testing. Test all possible code paths. For example, if you write the code for the Blue Alliance and let auto-reflection to take care of the Red Alliance, you still need to test out the Red Alliance. There will be unexpected scenarios that either auto-reflection cannot handle, or you did not auto-reflect the code correctly.

#### Debug Your Code
When the code is not behaving correctly, you need to debug it. Don't try to guess the cause and fix it. You need to debug it. When debugging, your first task is to root-cause the problem. Find out what's causing the unexpected behavior and why. Making guesses seems faster, but in the long run it is faster to slow down and find out why your code is behaving how it is. Then you can be sure that the change you are making will actually fix the problem. Patching a symptom without understand the cause (e.g. negating an input or sensor value) may seem to fix the problem, but I assure you that's WRONG. It may seem to fix the problem, but it will break something else that you are not expecting.

#### Document Your Code
Fully comment your code and add [JavaDoc](https://en.wikipedia.org/wiki/Javadoc#:~:text=Javadoc%20is%20a%20documentation%20generator,format%20from%20Java%20source%20code.) for all methods. The comment must add understanding to the code. Don't state the obvious because it doesn't add any value to the understanding. If the code is tricky, explain what it is trying to solve and how you solved it.

#### Code Incrementally
Don't try to write the entire code all at once. Write the code systematically in logical units and test each one thoroughly before starting the next unit. This will make sure testing and debugging are manageable and have good code coverage.

#### Check In Your Code
When checking in your code to the repository, do it incrementally and add detail explanation on what the check-in fixes. If something goes wrong with the code, you want to be able to look at the check-in log to figure out which fix might have broken the code and be able to back out a particular fix to prove it is indeed the culprit.

#### Code Review
Once the code is fully tested and debugged, have a mentor and/or a peer to review your code. Having a fresh pair of eyes to inspect your code will usually reveal scenarios that you forgot to handle. Also, in the process of explaining the code to somebody, you will usually find something wrong with your code that you did not handle.

:::tip
#### Finish The Code Early
You need to give enough time for the drivers to give you feedback so you can make corresponding changes. It's always tricky to finish software early because the robot is generally not finished early. Try to do whatever you can make progress without the real robot. If at all possible, try to make use of robots from previous seasons. For example, debugging autonomous pathing could be done with any previous robots as long as the code doesn't try to access non-existing subsystems. That's why our code makes use of subsystem switches that can selectively turn ON/OFF subsystems that don't exist. Always write your code assuming some subsystems may not exist (i.e. check if subsystems exist before trying to access them).
:::

## Debugging Process

This section describes the general process of debugging the robot. These process may involve multiple disciplines. Students are highly encouraged to learn multiple disciplines because when the robot *does not work*, you have no idea if the problem is *mechanical*, *electrical* or *programming*. Knowing just one discipline will render you handicapped in debugging the root cause. For example, one of the most common problems is: *a subsystem does not respond to control*. A programmer may try for hours looking into the code trying to figure out why the code is not controlling the mechanism. But in reality, the cause could be as simple as the motor was unplugged. Therefore, when something is not working, one needs to understand how the mechanism works in the big picture involving both mechanically, electrically and programmatically. The most useful debugging technique is *divide and conquer*. To apply this technique, you need to understand how the mechanism works in the complete picture.

1. Subsystems operate as expected without power(Mechanical).
2. All sensors and actuators are wired correctly(Electrical).
3. Code is correctly reading gamepad controls(Software).
4. Code is producing the expected outputs(Software).

With this complete picture, you can pick a point where you can easily figure out if the subsystem or action is successfully working. For example, point 3 above was about the code correctly reading gamepad controls. Ask yourself this question: *how can you tell if the code is reading the gamepad inputs?* When using a Driver Station, one can tell the robot is reading gamepad input by printing out the last pressed gamepad input. If this is indeed the case, you can rule out problems from point 3. Therefore, you can assume either the code is not using the input correctly to get the expected output or something is wrong on the hardware side. So now you can work up or down the list, let say you now pick point 4. Then, the question is: *how can i tell if my code is producing the expected out?* In this scenario, let’s assume you’re trying to set power to a motor. You can start by printing the output power value. If the motor power is correct, we can rule out Point 4—the code is using the gamepad inputs properly, and the issue likely isn’t in the logic. However, if the code thinks it's sending power to the motor but nothing is happening, there’s a good chance the issue is with Point 2—the motor might not be wired correctly. In cases like this, it would have been faster to start at the top of the checklist and work downward. Since Points 1 and 2 are quick to verify, it's generally best to begin there before digging deeper into the code.

If we determine the code is the culprit, it needs to be debugged and fixed. It is often tempting for programmers to hypothesize the cause and formulate a hack without proving the actual cause. Sometimes the hack seems to address the symptom but most likely the wrong fix. For example, when the robot is going the opposite direction in autonomous, programmers often just find a place to negate a value to force the robot to go the correct direction without understanding why it was going the wrong way in the first place. This [video](https://www.youtube.com/watch?v=IVmWh97H-OA) humorously describes that exact problem-solving mentality.

When the code is not behaving correctly, you need to apply the following debugging process:

1. Identify the code that was performing the unexpected operation.
2. Trace that code to understand why it is performing the unexpected operation.
3. Once the root cause is understood, formulate a proper fix and code it.
4. Test the fix to prove that the code is now behaving properly.
5. Make sure the fix works in all possible scenarios by running the fixed code in all code paths.

#### Code Tracing Techniques

To understand the root cause of a bug, you need to trace through the code to find out why it is behaving erroneously. There are three ways to trace through the code.

* **Real Time Debugging**: Setting code breakpoints and trace through the code in real time. Generally, this is not a preferred way in robotics because if you trace through code that turns on a motor, the motor will remain on for the duration while you are tracing the code until the code turns the motor off. If the motor is controlling an arm or elevator, it would have gone beyond its position limit. This way is only desirable if the code doesn't involve anything that's time sensitive.

* **Dashboard**: When the robot is not behaving as expected, you may want to check the state of the subsystems. The Framework Library provides a Dashboard mechanism allowing you to display the values of variables. For example, when the elevator is not moving while you command it to move using a joystick, the Dashboard may show that one of the limit switches is malfunctioning and preventing the elevator to move.

* **Trace Logging**: Do a postmortem analysis of the trace log. The Framework Library provides Debug Tracing allowing you to log events and variable values to the debug console as well as in the log file. Even after the erroneous event has happened, you can look through the trace log to understand what had happened exactly.

#### Commonly Encountered Bugs

The following shows a list of typical bugs you will encounter:
* **Code is crashing**: The code is causing an [Exception](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html). This is the most common and easiest type of bugs to fix because when an *Exception* occurs, you will get a stack dump which shows you the reason and the exact line of code that caused the *Exception*. It also shows you the history of calls leading to the code that caused the *Exception*. The most common *Exception* is *NullPointerException*. For example, when declaring a variable in java to hold an object, the variable is initialized to *null*. If the variable is used before it is initialized, a *NullPointerException* will be thrown.
* **Code is hung in TeleOp**: The robot stopped responding to human input. Apply the *divide and conquer* technique described above to diagnose the root cause.

* **Code is hung in Autonomous**: This is typically caused by an asynchronous operation that never got completed. Check the Dashboard to tell what state Autonomous is stuck at, in which what operation was it performing. Then figure out why the operation is not completing. Typically, it is a PID operation that was hung due to improper PID tuning causing excessive *Steady State Error* beyond the allowed tolerance. The solution is either re-tune PID to allow stronger response or add a timeout to the operation as a safety measure. Refer to the PID tuning section for more information.

* **Unexpected code behavior**: This is typically caused by logic error in the code. Making use of the Dashboard or Debug Tracing to identify where in the code it was performing the erroneous operation. Once the code location is identified, trace through the logic to figure out why it is performing the erroneous operation. Once the problem is understood, formulate a proper fix considering all corner cases.

* **Robot lost communication**: This is generally an electrical issue caused by power interruption to the robot radio. The root cause may be in the wiring where the power wire/connector to the radio is not secured or the routing of the wires is too taut so that any impact to the robot will cause power to disconnect. In FTC, it is also commonly caused by Electrostatic Discharge (ESD). The FTC robot running on the field mat building up static electric charge and discharging to a metal object it hits. This caused the Control Hub to malfunction and disconnected WiFi. Examining the wire path powering the radio and make sure it has sufficient slack. Also examine the power and network connectors to make sure they are securely plugged in and have strain relief. For the ESD problem in FTC, make sure the [Resistive Ground Strap](https://www.revrobotics.com/rev-31-1269/) is installed.

## Setup HardwareMap

