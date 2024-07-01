# Advanced Robotics Programming
This tutorial focuses on our *Titan Robotics Framework* (TRC Library). The target audience is for students who already have basic knowledge of the Java language. It is primarily designed for FRC although it is also applicable for FTC because our *TRC Library* is shared between FTC and FRC. After finishing this tutorial, you should be able to write code for both FTC and FRC robots with some platform specific differences.

## Programming Software Installation
Before you can start coding, you need to install the required software on your laptop. Please take some time to do this at home. Software installation is time consuming and require downloading gigabytes of data from the Internet. Follow the instructions below for the software you need.
* [FRC Programming Software Installation](https://trc492.github.io/pages/FrcProgrammingSoftwareInstallation.html)
* [FTC Programming Software Installation](https://trc492.github.io/pages/FtcProgrammingSoftwareInstallation.html)

## TeleOp Driving Your Robot Right Out-Of-The-Box
At this point, you should have installed all necessary software for developing robot code and also clone the robot template code from the GitHub repo. Since the template already contains basic code for three different kinds of robot base (Differential Drive, Mecanum Drive and Swerve Drive), it takes very few modifications to make it work with any of the three types of robots.

* [Driving FRC Swerve Drive Base in TeleOp](https://trc492.github.io/pages/FrcSwerveTeleOp.html)
* [Driving FTC Mecanum Drive Base in TeleOp](https://trc492.github.io/pages/FtcMecanumTeleOp.html)

## Generic Subsystems Supported by Titan Robotics Framework
Once the drive base is fully operational, the next step is to create subsystems for the robot such as Elevator, Arm, Intake, Grabber etc. Even though the game of each season changes, a lot of subsystems repeat themselves season after season. Therefore, our Framework Library provides generalized subsystems to handle most of the scenarios. Here are some typical subsystems provided by our Framework library.
* **[Motor Actuator](https://trc492.github.io/pages/MotorActuator.html)**: Motor is the most fundamental output device on a robot. It provides movements for mechanisms. Motor Actuators contain one or more motors, an encoder to keep track of its position and some limit switches to limit their movement. **FIRST** provided some basic motor classes (e.g. *DcMotor/DcMotorEx* for FTC and *Phoenix5/Phoenix6/SparkMax* for FRC). The Framework Library added a lot more features on top of that in the **TrcMotor** class. For example, it added support for a digital input sensor to reset the motor encoder automatically (limit switches). This is useful for using the motor in a complex actuator such as an arm or elevator when you may need to zero calibrate the zero position of the actuator using a lower limit switch. It also added support to provide velocity control and motor odometry. On top of the fundamental motor features, it also provided PID Controlled functionality. It can support either native motor close-loop control (position and velocity PID control) or software PID control in case some motors do not support native close-loop control (e.g. continuous servos). **TrcMotor** added support for lower and upper limit switches, motor stall protection for safety, multiple motors with synchronization (motor followers), zero position calibration, gravity compensation and much more. These advanced features made it trivial to implement complex subsystems such as swing arm, elevator, slide or pan and tilt. The built-in PIDF controller allows the arm or elevator to be controlled by an analog joystick to speed up or slow down the arm/elevator movement. It understands the arm/elevator position approaching the lower/upper position limits and will automatically slow down its movement. It also provides stall protection. If the PID Actuator got stuck and the motor is stalled, it can cut motor power to prevent it from burning out. It also allows a reset timeout so that the stall condition can be cleared after a certain period assuming the stall condition is caused by human temporarily. This allows the subsystem to resume its function and provides time for the motor to cool down. In addition, it also supports voltage compensation. It understands battery voltage drop and can compensate the power level sent to the motor.
* **[Servo Actuator](https://trc492.github.io/pages/ServoActuator.html)**:
* **[Pneumatic Actuator](https://trc492.github.io/pages/PneumaticActuator.html)**:
* **[Intake](https://trc492.github.io/pages/Intake.html)**:
* **[Conveyor](https://trc492.github.io/pages/Conveyor.html)**:
* **[Shooter](https://trc492.github.io/pages/Shooter.html)**:
* **[Grabber](https://trc492.github.io/pages/Grabber.html)**:

## Creating Subsystems
It is a good practice to create subsystems as separate Java classes that encapsulate all hardware related to those subsystems. To create a subsystem, you need to determine the following:
* **What hardware does the subsystem contain?** This includes motors, actuators and sensors. For example, an elevator will most likely contain a motor to move it up and down, an encoder to keep track of its position and one or two limit switches to tell if the elevator has reached its lower or upper height limit.
* **What operations does the subsystem support?** For example, an elevator may have a method to allow the joystick to control it going up and down at various speed, a method to command the elevator to go to a certain height, and a method to command the elevator to go to next preset height up or down.

## Connecting Subsystems to the Robot
* Instantiate the subsystems
* TeleOp control of the subsystems
* Display subsystem status

## Writing Autonomous Code
