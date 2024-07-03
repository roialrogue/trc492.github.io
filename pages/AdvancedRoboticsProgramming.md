# Advanced Robotics Programming With Titan Robotics Framework
This tutorial focuses on our *Titan Robotics Framework* (TRC Library). The target audience is for students who already know the Java language. The Titan Robotics Framework is designed for both FTC and FRC. After finishing this tutorial, you should be able to write code for both FTC and FRC robots with minimal platform specific changes.

## Programming Software Installation
Before you can start coding, you need to install the required software on your laptop. Please take some time to do this at home. Software installation is time consuming and require downloading gigabytes of data from the Internet. Follow the instructions below for the software you need.
* [FTC Programming Software Installation](https://trc492.github.io/pages/FtcProgrammingSoftwareInstallation.html)
* [FRC Programming Software Installation](https://trc492.github.io/pages/FrcProgrammingSoftwareInstallation.html)

## TeleOp Driving Your Robot Right Out-Of-The-Box
At this point, you should have installed all necessary software for developing robot code and also clone the robot template code from the GitHub repo. Since the template already contains basic code for three different kinds of robot base (Differential Drive, Mecanum Drive and Swerve Drive), it takes very few modifications to make it work with any of the three types of robots.

* [Driving FTC Mecanum Drive Base in TeleOp](https://trc492.github.io/pages/FtcMecanumTeleOp.html)
* [Driving FRC Swerve Drive Base in TeleOp](https://trc492.github.io/pages/FrcSwerveTeleOp.html)

## Basic Subsystems Provided by Titan Robotics Framework
Once the drive base is fully operational, the next step is to create subsystems for the robot such as Elevator, Arm, Intake, Grabber etc. Even though the game of each season changes, a lot of subsystems repeat themselves season after season. Therefore, the Framework Library provides generalized basic subsystems to handle most of the scenarios. Here are some typical subsystems provided by the Framework Library.
* **[Motor Actuator](https://trc492.github.io/pages/MotorActuator.html)**: Motor is the most fundamental output device on a robot. It provides movements for mechanisms. Motor Actuators contain one or more motors, an encoder to keep track of its position and some limit switches to limit their movement. **FIRST** provided some basic motor classes (e.g. *DcMotor/DcMotorEx* for FTC and *Phoenix5/Phoenix6/SparkMax* for FRC). The Framework Library added a lot more features on top of that in the **TrcMotor** class. For example, it added support for a digital input sensor to reset the motor encoder automatically (limit switches). This is useful for using the motor in a complex actuator such as an arm or elevator when you may need to zero calibrate the zero position of the actuator using a lower limit switch. It also added support to provide velocity control and motor odometry. On top of the fundamental motor features, it also provided PID Controlled functionality. It can support either native motor close-loop control (position and velocity PID control) or software PID control in case some motors do not support native close-loop control (e.g. continuous servos). **TrcMotor** added support for lower and upper limit switches, motor stall protection for safety, multiple motors with synchronization (motor followers), zero position calibration, gravity compensation and much more. These advanced features made it trivial to implement complex subsystems such as swing arm, elevator, slide or pan and tilt. The built-in PIDF controller allows the arm or elevator to be controlled by an analog joystick to speed up or slow down the arm/elevator movement. It understands the arm/elevator position approaching the lower/upper position limits and will automatically slow down its movement. It also provides stall protection. If the PID Actuator got stuck and the motor is stalled, it can cut motor power to prevent it from burning out. It also allows a reset timeout so that the stall condition can be cleared after a certain period assuming the stall condition is caused by human temporarily. This allows the subsystem to resume its function and provides time for the motor to cool down. In addition, it also supports voltage compensation. It understands battery voltage drop and can compensate the power level sent to the motor.
* **[Servo Actuator](https://trc492.github.io/pages/ServoActuator.html)**: With the limited number of motors allowed by FTC, servos become the secondary most important actuator on a robot. The Framework Library provides extended support of servo in the **TrcServo** class over FIRST provided SDK. It supports translation between logical servo positions (between the value of 0.0 and 1.0) to physical positions such as 0.0 to 180.0 degrees. Just like motors, it also allows you to invert the direction of the servo movement. In addition, it provides features to support multiple servos (followers) driving the same mechanism. Most importantly, it allows speed controlling a servo so you can control it by an analog joystick or simply slow down its movement.
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

## Debugging Process
The following shows a list of typical bugs you will encounter:
* **Code is crashing**: The code is causing an *Exception*. This is the most common and easiest type of bugs to fix because when an Exception occurs, you will get a stack dump which shows you the reason and the exact line of code that caused the Exception. It also shows you the history of calls leading to the code that caused the Exception.
* **Code is hung in TeleOp**: The robot stopped responding to human input. 
* **Code is hung in Autonomous**: This is typically caused by an asynchronous operation that never completed.
* **Unexpected code behavior**: This is typically caused by logic error in the code.
* **Robot lost communication**: This is generally an electrical issue caused by power interruption to the robot radio. The root cause may be in the wiring where the power wire/connector to the radio is not secured so that any impact to the robot will cause power to disconnect. In FTC, it is also commonly caused by Electrostatic Discharge (ESD). The FTC robot running on the field mat building up static electric charge and discharging to a metal object it hits. This caused the Control Hub to malfunction and disconnected WiFi.

When the code does not work as expected, it needs to be debugged and fixed. It is often tempting for programmers to hypothesize the cause and formulate a hack without proving the actual cause. Sometimes the hack seems to address the symptom but most likely the wrong fix. For example, when the robot is going the opposite direction in autonomous, programmers often just find a place to negate a value to force the robot to go the correct direction without understanding why it was going the wrong way in the first place. The following video humorously describes that exact problem-solving mentality.

[![Problem Solving](https://img.youtube.com/vi/IVmWh97H-OA/0.jpg)](https://www.youtube.com/watch?v=IVmWh97H-OA)

In order to debug the code properly, you need to apply the following debugging process:
* Identify the code that was performing the unexpected operation.
* Trace that code to understand why it is performing the unexpected operation.
* Once the root cause is understood, formulate a proper fix and code it.
* Test the fix to prove that the code is now behaving properly.
* Make sure the fix works in all possible scenarios by running the fixed code in all code paths.
* If some scenarios are still not behaving correctly, repeat this process until everything works as expected.
* Before checking in the final fix, have a mentor/peer to code review the fix.
* Add detail comments in the code to explain the issue and how the fix remedy the problem.
* Check in the fix and add check-in notes on what the fix is for.

To understand the root cause of a bug, you need to trace through the code to find out why it is behaving erroneously. There are three ways to trace through the code.
* **Real Time Debugging**: Setting code breakpoints and trace through the code in real time. Generally, this is not a preferred way in robotics because if you trace through code that turns on a motor, the motor will remain on for the duration while you are tracing the code until the code turns the motor off. If the motor is controlling an arm or elevator, it would have gone beyond its position limit. This way is only desirable if the code doesn't involve anything that's time sensitive.
* **Dashboard**:
* **Trace Logging**: Do a postmortem analysis of the trace log. This involves adding trace logging code in appropriate places to log the values or states of the component you are debugging.

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
