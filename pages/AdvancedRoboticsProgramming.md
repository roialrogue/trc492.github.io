# Advanced Robotics Programming With Titan Robotics Framework
This section focuses on our *Titan Robotics Framework* (TRC Library). The target audience is for students who already know the Java language. The Titan Robotics Framework is designed for both FTC and FRC. After finishing this section, you should be able to write code for both FTC and FRC robots with minimal platform specific changes.

## Programming Software Installation
Before you can start coding, you need to install the required software on your computer. Please take some time to do this at home. Software installation could be time consuming and requires downloading gigabytes of data from the Internet. Follow the instructions below for the software you need.
* [FTC Programming Software Installation](https://trc492.github.io/pages/FtcProgrammingSoftwareInstallation.html)
* [FRC Programming Software Installation](https://trc492.github.io/pages/FrcProgrammingSoftwareInstallation.html)

## Code Development Cycle
Before writing any code, let's understand the proper Code Development Cycle.
1. Analyze the problem
1. Come up with the pseudo-code to solve the problem
1. Run through all scenarios with the pseudo-code
1. Repeat the above steps until all scenarios are covered
1. Translate the pseudo-code to real code
1. Have somebody code review your code
1. Fully test and debug the code with all scenarios
1. Fix all the bugs found and repeat the above two steps until all bugs are fixed and the code works as expected.
1. Fully comment your code and add JavaDoc for all methods.

## Code Development Process
It is important to follow the recommended Code Development Process to minimize bugs introduced in the code you write.
* **Think through the problem you are solving before starting to write code**: Don't start writing code right away. Think through and analyze the problem. Write down the problem on the whiteboard, draw diagrams, use whatever tools to help you visualize and understand the problem. Write down your solution in English (Pseudo-code). Go through the solution again and again for all possible scenarios until they are all covered. Then translating pseudo-code into real code should be super simple.
* **Write maintainable code**: Choose appropriate variable and method names, write comments, and write useful commit notes. You're not just making life easier for others, you're making life easier for yourself next week when you can't remember what you were thinking. It's very important to comment your code in detail, especially if the code is doing something tricky. I assure you that you will be scratching your head on why you did it that way weeks after you wrote the code. Even worse, if you no longer understand the reasons why you did it, you may be tempted to "fix it" that will break whatever that tricky code was trying to solve. If the purpose of a variable or method has changed, change its name to reflect the new purpose. Yes, you will need to change all references to it but don't be lazy. It is worst to read code that doesn't do what its name implied to do. Besides, most Integrated Development Environments (IDE) will search and replace the references for you anyway. Appropriately named variables and methods help you and others to understand the code better and faster.
* **Fully test your code**: Don't just write the code and expect it to work without testing. Test all possible code paths. For example, if you write the code for the Blue Alliance and let auto-reflection to take care of the Red Alliance, you still need to test out the Red Alliance. There will be unexpected scenarios that either auto-reflection cannot handle, or you did not auto-reflect the code correctly.
* **Code Incrementally**: Don't try to write the entire code all at once. Write the code systematically in logical units and test each one thoroughly before starting the next unit. This will make sure testing and debugging are manageable and have good code coverage.
* **Have a mentor and/or a peer to code review your code**: Don't just write the code and expect it to work in all scenarios. Having a fresh pair of eyes to inspect your code will usually reveal scenarios that you forgot to handle. Also, in the process of explaining the code to somebody, you will usually find something wrong with your code that you did not handle.
* **Think, don't guess**: When debugging, your first task is to root-cause the problem. Find out what's causing the unexpected behavior and why. Making guesses seems faster, but in the long run it is faster to slow down and find out why your code is behaving how it is. Then you can be sure that the change you're making will actually fix your code. Patching a symptom (e.g. negating an input or sensor value) may seem to fix the problem, but I assure you that's WRONG. It may seem to fix the problem, but it will break something else that you are not expecting.
* **Finish the software early**: You need to give enough time for the drivers to give you feedback so you can make corresponding changes. It's always tricky to finish software early because the robot is generally not finished early. Try to do whatever you can make progress without the real robot. If at all possible, try to make use of robots from previous seasons. For example, debugging autonomous pathing could be done with any previous robots as long as the code doesn't try to access non-existing subsystems. That's why our code makes use of subsystem switches that can selectively turn ON/OFF subsystems that don't exist. Always write your code assuming some subsystems may not exist (i.e. check if subsystems exist before trying to access them).
* **Robot tuning**: Tune the robot early before competition. DO NOT TUNE THE ROBOT AT COMPETITION! If you do, it's guaranteed to be a stressful season.

## Debugging Process
This section describes the general process of debugging the robot. These process may involve multiple disciplines. Students are highly encouraged to learn multiple disciplines because when the robot *does not work*, you have no idea if the problem is *mechanical*, *electrical* or *programming*. Knowing just one discipline will render you handicapped in debugging the root cause. For example, one of the most common problems is: *a subsystem does not respond to control*. A programmer may try for hours looking into the code trying to figure out why the code is not controlling the mechanism. But in reality, the cause could be as simple as the motor was unplugged. Therefore, when something is not working, one needs to understand how the mechanism works in the big picture involving both mechanically, electrically and programmatically. The most useful debugging technique is *divide and conquer*. To apply this technique, you need to understand how the mechanism works in the complete picture.
1. Code reading gamepad controls.
1. Code sending gamepad values to robot controller.
1. Robot controller sending control signals to motor controller.
1. Motor controller sending electricity to the motor.
1. Motor moving the mechanism.

With this complete picture, you can pick a point where you can easily figure out if the control has successfully reached that point. For example, point 3 above was about the robot controller sending control signals to the motor controller. Ask yourself this question: *how can you tell if the motor controller received signal from the robot controller?* For a TalonSRX motor controller used in FRC, one can tell by looking at the LED light on the controller. If the motor controller received a *forward* signal, it should flash green. If it received *reverse* signal, it should flash red. If this is indeed the case, you can rule out problems from point 1 to point 3. Therefore, the problem is not in the code. If the motor controller does not have status light (e.g. FTC motor controllers), you may pick point 4. Then, the question is: *how can you tell if the motor controller is sending electricity to the motor?* You can easily prove that by getting a known good motor and plug it in to the motor controller and see if the code will spin the known good motor. If it does, then the problem is the motor. If it does not, the problem is upstream from point 1 to point 3. You can also check the Dashboard for the subsystem status and whether the code successfully read the gamepad control and sent the value to control the subsystem (point 1 and 2). And if you have limit switches, whether the limit switches are in the state preventing the motor movement.

Once it has been determined the code is the culprit, it needs to be debugged and fixed. It is often tempting for programmers to hypothesize the cause and formulate a hack without proving the actual cause. Sometimes the hack seems to address the symptom but most likely the wrong fix. For example, when the robot is going the opposite direction in autonomous, programmers often just find a place to negate a value to force the robot to go the correct direction without understanding why it was going the wrong way in the first place. This [video](https://www.youtube.com/watch?v=IVmWh97H-OA) humorously describes that exact problem-solving mentality.

The following shows a list of typical bugs you will encounter:
* **Code is crashing**: The code is causing an *Exception*. This is the most common and easiest type of bugs to fix because when an Exception occurs, you will get a stack dump which shows you the reason and the exact line of code that caused the Exception. It also shows you the history of calls leading to the code that caused the Exception.
* **Code is hung in TeleOp**: The robot stopped responding to human input. Apply the *divide and conquer* technique described above to diagnose the root cause.
* **Code is hung in Autonomous**: This is typically caused by an asynchronous operation that never got completed. Check the Dashboard to tell what state Autonomous is stuck at, in which what operation was it performing. Then figure out why the operation is not completing. Typically, it is a PID operation that was hung due to improper PID tuning causing excessive *Steady State Error* beyond the allowed tolerance. The solution is either re-tune PID to allow stronger response or add a timeout to the operation as a safety measure. Refer to the PID tuning section for more information.
* **Unexpected code behavior**: This is typically caused by logic error in the code. Making use of the Dashboard or Debug Tracing to identify where in the code it was performing the erroneous operation. Once the code location is identified, trace through the logic to figure out why it is performing the erroneous operation. Once the problem is understood, formulate a proper fix considering all corner cases.
* **Robot lost communication**: This is generally an electrical issue caused by power interruption to the robot radio. The root cause may be in the wiring where the power wire/connector to the radio is not secured or the routing of the wires is too taut so that any impact to the robot will cause power to disconnect. In FTC, it is also commonly caused by Electrostatic Discharge (ESD). The FTC robot running on the field mat building up static electric charge and discharging to a metal object it hits. This caused the Control Hub to malfunction and disconnected WiFi. Examining the wire path powering the radio and make sure it has sufficient slack. Also examine the power and network connectors to make sure they are securely plugged in and have strain relief. For the ESD problem in FTC, make sure the [Resistive Ground Strap](https://www.revrobotics.com/rev-31-1269/) is installed.

When the code is not behaving correctly, you need to apply the following debugging process:
1. Identify the code that was performing the unexpected operation.
1. Trace that code to understand why it is performing the unexpected operation.
1. Once the root cause is understood, formulate a proper fix and code it.
1. Test the fix to prove that the code is now behaving properly.
1. Make sure the fix works in all possible scenarios by running the fixed code in all code paths.
1. If some scenarios are still not behaving correctly, repeat this process until everything works as expected.
1. Before checking in the final fix, have a mentor/peer to code review the fix.
1. Add detail comments in the code to explain the issue and how the fix remedy the problem.
1. Check in the fix and add check-in notes on what the fix is for.

To understand the root cause of a bug, you need to trace through the code to find out why it is behaving erroneously. There are three ways to trace through the code.
* **Real Time Debugging**: Setting code breakpoints and trace through the code in real time. Generally, this is not a preferred way in robotics because if you trace through code that turns on a motor, the motor will remain on for the duration while you are tracing the code until the code turns the motor off. If the motor is controlling an arm or elevator, it would have gone beyond its position limit. This way is only desirable if the code doesn't involve anything that's time sensitive.
* **Dashboard**: When the robot is not behaving as expected, you may want to check the state of the subsystems. The Framework Library provides a Dashboard mechanism allowing you to display the values of variables. For example, when the elevator is not moving while you command it to move using a joystick, the Dashboard may show that one of the limit switches is malfunctioning and preventing the elevator to move.
* **Trace Logging**: Do a postmortem analysis of the trace log. The Framework Library provides Debug Tracing allowing you to log events and variable values to the debug console as well as in the log file. Even after the erroneous event has happened, you can look through the trace log to understand what had happened exactly.

## TeleOp Driving Your Robot Right Out-Of-The-Box
At this point, you should have installed all necessary software for developing robot code and also clone the robot template code from the GitHub repo. Since the template already contains basic code for three different kinds of robot base (Differential Drive, Mecanum Drive and Swerve Drive), it takes very few modifications to make it work with any of the three types of robots.

* [Driving FTC Mecanum Drive Base in TeleOp](https://trc492.github.io/pages/FtcMecanumTeleOp.html)
* [Driving FRC Swerve Drive Base in TeleOp](https://trc492.github.io/pages/FrcSwerveTeleOp.html)

## Basic Subsystems Provided by Titan Robotics Framework
Once the drive base is fully operational, the next step is to create subsystems for the robot such as Elevator, Arm, Intake, Grabber etc. Even though the game of each season changes, a lot of subsystems repeat themselves season after season. Therefore, the Framework Library provides generalized basic subsystems to handle most of the scenarios. Here are some typical subsystems provided by the Framework Library.
* **[Motor Actuator](https://trc492.github.io/pages/MotorActuator.html)**: Motor is the most fundamental output device on a robot. It provides movements for mechanisms. Motor Actuators contain one or more motors, an encoder to keep track of its position and some limit switches to limit their movement. *FIRST* provided some basic motor classes (e.g. *DcMotor/DcMotorEx* for FTC and *Phoenix5/Phoenix6/SparkMax* for FRC). The Framework Library added a lot more features on top of that in the **TrcMotor** class. For example, it added support for a digital input sensor to reset the motor encoder automatically (limit switches). This is useful for using the motor in a complex actuator such as an arm or elevator when you may need to zero calibrate the zero position of the actuator using a lower limit switch. It also added support to provide velocity control and motor odometry. On top of the fundamental motor features, it also provided PID Controlled functionality. It can support either native motor close-loop control (position and velocity PID control) or software PID control in case some motors do not support native close-loop control (e.g. continuous servos). **TrcMotor** added support for lower and upper limit switches, motor stall protection for safety, multiple motors with synchronization (motor followers), zero position calibration, gravity compensation and much more. These advanced features made it trivial to implement complex subsystems such as swing arm, elevator, slide or pan and tilt. The built-in PIDF controller allows the arm or elevator to be controlled by an analog joystick to speed up or slow down the arm/elevator movement. It understands the arm/elevator position approaching the lower/upper position limits and will automatically slow down its movement. It also provides stall protection. If the PID Actuator got stuck and the motor is stalled, it can cut motor power to prevent it from burning out. It also allows a reset timeout so that the stall condition can be cleared after a certain period assuming the stall condition is caused by human temporarily. This allows the subsystem to resume its function and provides time for the motor to cool down. In addition, it also supports voltage compensation. It understands battery voltage drop and can compensate the power level sent to the motor.
* **[Servo Actuator](https://trc492.github.io/pages/ServoActuator.html)**: With the limited number of motors allowed by FTC, servos become the secondary most important actuator on a robot. The Framework Library provides extended support of servo in the **TrcServo** class over *FIRST* provided SDK. It supports translation between logical servo positions (between the value of 0.0 and 1.0) to physical positions such as 0.0 to 180.0 degrees. Just like motors, it also allows you to invert the direction of the servo movement. In addition, it provides features to support multiple servos (followers) driving the same mechanism. Most importantly, it allows speed controlling a servo so you can control it by an analog joystick or simply slow down its movement.
* **[Pneumatic Actuator](https://trc492.github.io/pages/PneumaticActuator.html)**: Pnuematic Actuators are only legal for FRC but not FTC.
* **[Intake](https://trc492.github.io/pages/Intake.html)**:
* **[Conveyor](https://trc492.github.io/pages/Conveyor.html)**:
* **[Grabber](https://trc492.github.io/pages/Grabber.html)**:
* **[Shooter](https://trc492.github.io/pages/Shooter.html)**:
* **[Vision](https://trc492.github.io/pages/Vision.html)**:

## Creating Complex Subsystems
The above section talked about how to create simple subsystems using *Basic Subsystems* provided by the Framework Library. In this section, we will talk about creating complex subsystems that consist of multiple Basic subsystems and will support complex operations.

It is a good practice to create subsystems as separate Java classes that encapsulate all hardware related to those subsystems. To create a subsystem, you need to answer the following questions:
* **What hardware does the subsystem contain?** This includes motors, sensors and a combination of other basic subsystems. For example, a complex subsystem that may consist of a wrist attached to the end of an arm that attched to the end of an elevator. This could be written as three independent subsystems. However, since the relationship of the three subsystems is such that they have dependencies on each other, and therefore, must be operated as a single subsystem. In this example, when the elevator is retracted to the lowest height, the arm is not freely movable because it will hit other components on the robot base frame. When the arm is retracted to its resting position, the wrist must be at a certain angle to fit into the resting place. Because of these mechanical restrictions, we will create a complex subsystem that encapsulates all three basic subsystems: an elevator, an arm and a wrist.
* **What operations does the subsystem support?** For example, the complex subsystem described above may provide a retract method that will retract everything to its resting position. This will involve a sequence of movements that will understand the positions of all three basic subsystems and will operate them such that it will not hit any obstacles in the process of retracting. It may also provide an operation to extend the mechanism to the "scoring position". Again, it needs to sequence the movements to pull the wrist out of the resting place before swinging the arm up, for example.

Since complex subsystems are very specific on their restrictions and what they can do, we are ...

## Tuning Subsystems

### Scale and Offset

### Gravity Compensation

### PID

## Tuning Drive Base

### Odometry

### PID

## Operating Subsystems In TeleOp Mode

## Creating Auto-Assist Tasks

## Creating Autonomous Code

## Miscellaneous Tips and Tricks

### Increase the number of available buttons on your Gamepad
Gamepad buttons are scarce resources, but there is a trick to give us more buttons. This is basically similar to a computer keyboard or calculator keypad where you have the Alt button (or 2nd Func button). By pressing and holding the Alt button down, other buttons on the keyboard can have other functions.

### Different ways of using Gamepad buttons
  * Use one button to turn on and another to turn off
  * Use a single button to toggle ON and OFF
  * Button press to turn ON and release to turn off
