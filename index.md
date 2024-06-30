# Welcome to Titan Robotics Club
The Titan Robotics Club is a middle and high school robotics program at the International School in Bellevue, Washington. We aim to spread awareness and raise interest within our school and our community about robotics and the programs of **FIRST** (**F**or **I**nspiration and **R**ecognition of **S**cience and **T**echnology). As part of the annual FIRST Robotics Competition, FIRST Tech Challenge and FIRST Lego League, our team of around 100 students work with field professionals and adult mentors to earn valuable life experience with robotics, technology and science. You can learn more about us at our [official website](http://www.titanrobotics.com).

## History of our Open Source Projects on GitHub
Titan Robotics Club (TRC) was started in 2001 competing in the FIRST Robotics Competition (FRC). Starting in the FRC season 2007-2008, the Club decided to develop the Titan Robotics Framework Library (TrcLib) and to make the library open source. At the time, we were using Mercurial as our source control and was hosting the source code on our own Linux server. In 2010, we switched to use Git as our source control and have moved all our repositories to GitHub to free ourselves from maintaining our own source control server. With over a decade of development, TrcLib has become a feature rich Robotics Library. At the beginning, the library was written in C for FRC. In 2009, the Club added the FIRST Tech Challenge program (FTC). TrcLib was then ported to RobotC, the programming language for the LEGO Mindstorm platform used by FTC. In 2015, with the introduction of the Android platform in FTC, the Club switched to use Java as the programming language for both FTC and FRC. TrcLib was then rewritten in Java so that the majority of the Library code can be shared between FTC and FRC. At the time of writing (2021), TrcLib has grown to over 20,000 lines of code with over 12,000 lines shared between FTC and FRC. Aside from the repositories of the FTC and FRC competition seasons, we also created many useful projects on GitHub. In 2016, we created the FtcSamples repository including lots of sample code helping other FTC teams who decided to use our TrcLib for FTC. This enables rookie teams to write relatively advanced code without too much effort. With that, we also created JavaDoc for TrcLib which can be found [here](https://trc492.github.io/FtcJavaDoc/). The recent addition of the FtcTemplate repository enables FTC teams to quickly create their own code repository for the new season with the latest copy of TrcLib as well as the FTC SDK for the season. In the FtcTemplate repository, it comes with basic robot code for a mecanum drive base robot with ready to drive TeleOp code. The FtcTemplate repository can be found [here](https://github.com/trc492/FtcTemplate).

## Titan Robotics Framework Library
Our Framework Library provides numerous features. We will list some of them [here](pages/TrcLibFeatures.md).

## Advanced Robotics Programming
This tutorial focuses on our *Titan Robotics Framework* (TRC Library). The target audience is for students who already have basic knowledge of the Java language. The class is primarily designed for FRC although it is also applicable for FTC because our *TRC Library* is shared between FTC and FRC. After finishing this class, you should be able to write code for both FTC and FRC robots with some platform specific differences.

### Programming Software Installation
Before coming to the programming class, you need to install the required software on your laptop. Please do this at home before coming to class. We do not want to dedicate class time to install software because they are time consuming and require downloading gigabytes of data from the Internet which would overwhelm our Internet bandwidth if all students were downloading at the same time. Therefore, please make sure you finish these tasks at home before coming to class.
- [FRC Programming Software Installation](pages/FrcProgrammingSoftwareInstallation.md)
- [FTC Programming Software Installation](pages/FtcProgrammingSoftwareInstallation.md)

== TeleOp Driving Your Robot Right Out-Of-The-Box ==
At this point, you should have installed all necessary software for developing robot code and also clone the robot template code from the GitHub repo. Since the template already contains basic code for three different kinds of robot base (Differential Drive, Mecanum Drive and Swerve Drive), it takes very few modifications to make it work with any of the three types of robots.

* [[Driving FRC Swerve Drive Base in TeleOp]]
* [[Driving FTC Mecanum Drive Base in TeleOp]]

== Creating Subsystems ==
Once the drive base is fully operational, the next step is to create subsystems for the robot such as Elevator, Arm, Intake, Grabber etc. It is a good practice to create subsystems as separate Java classes that encapsulate all hardware related to those subsystems. To create a subsystem, you need to determine the following:
* '''What hardware does the subsystem contain?''' This includes motors, actuators and sensors. For example, an elevator will most likely contain a motor to move it up and down, an encoder to keep track of its position and one or two limit switches to tell if the elevator has reached its lower or upper height limit.
* '''What operations does the subsystem support?''' For example, an elevator may have a method to allow the joystick to control it going up and down at various speed, a method to command the elevator to go to a certain height, and a method to command the elevator to go to next preset height up or down.

Even though the game of each season changes, a lot of subsystems repeat themselves season after season. Therefore, our Framework Library provides generalized subsystems to handle most of the scenarios. Here are some typical subsystems you will find on a robot.
* '''[[Motor Actuator]]''': Motor is the most fundamental output device on a robot. It provides movements for mechanisms. Motor Actuators contain one or more motors, an encoder to keep track of its position and some limit switches to limit their movement. '''FIRST''' provided some basic motor classes (e.g. ''DcMotor/DcMotorEx'' for FTC and ''Phoenix5/Phoenix6/SparkMax'' for FRC). The Framework Library added a lot more features on top of that in the '''TrcMotor''' class. For example, it added support for a digital input sensor to reset the motor encoder automatically (limit switches). This is useful for using the motor in a complex actuator such as an arm or elevator when you may need to zero calibrate the zero position of the actuator using a lower limit switch. It also added support to provide velocity control and motor odometry. On top of the fundamental motor features, it also provided PID Controlled functionality. It can support either native motor close-loop control (position and velocity PID control) or software PID control in case some motors do not support native close-loop control (e.g. continuous servos). '''TrcMotor''' added support for lower and upper limit switches, motor stall protection for safety, multiple motors with synchronization (motor followers), zero position calibration, gravity compensation and much more. These advanced features made it trivial to implement complex subsystems such as swing arm, elevator, slide or pan and tilt. The built-in PIDF controller allows the arm or elevator to be controlled by an analog joystick to speed up or slow down the arm/elevator movement. It understands the arm/elevator position approaching the lower/upper position limits and will automatically slow down its movement. It also provides stall protection. If the PID Actuator got stuck and the motor is stalled, it can cut motor power to prevent it from burning out. It also allows a reset timeout so that the stall condition can be cleared after a certain period assuming the stall condition is caused by human temporarily. This allows the subsystem to resume its function and provides time for the motor to cool down. In addition, it also supports voltage compensation. It understands battery voltage drop and can compensate the power level sent to the motor.
* '''[[Servo Actuator]]''':
* '''[[Pneumatic Actuator]]''':
* '''[[Intake]]''':
* '''[[Conveyor]]''':
* '''[[Shooter]]''':
* '''[[Grabber]]''':

== Connecting Subsystems to the Robot ==
* Instantiate the subsystems
* TeleOp control of the subsystems
* Display subsystem status

== Writing Autonomous Code ==
