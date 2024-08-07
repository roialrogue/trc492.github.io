# Simple Motor
Motor is the most fundamental component in a robot. It provides movement of mechanisms. There are many different types of motors with different capabilities. Most motors are brushed motors but some FRC motors are brushless. Some of their capabilities are built-in to the motor hardware. For example, *quadrature encoders* are sensor that keep track of the rotational position and velocity of the motor. Some encoders are even capable of registering absolute positions (i.e. absolute rotational position persists across power cycles - doesn't get clear across power cycles). Some capabilities are provided by the *Smart Motor Controller* the motor is connected to (e.g. close-loop position or velocity control). *Smart Motor Controllers* usually have their own microcontrollers running firmware in a higher frequency loop than the Robot Controller. They can provide native close-loop control at a much higher resolution than software close-loop control running on the Robot Controller. Some *Smart Motor Controllers* support limit switches. Limit switches provides protection against mechanisms travelling beyond their physical range limits. They will cut motor power if the mechanism hits the lower or upper physical limits.

FIRST provided some basic motor classes (e.g. DcMotor/DcMotorEx for FTC and Phoenix5/Phoenix6/SparkMax for FRC). All these motor classes provide very different APIs. It makes writing code for motor subsystems very specific to the motor you use. The Framework Library provides a generic *TrcMotor* class that abstract all motor capabilities to a generic set of APIs. This allows code written to the generic *TrcMotor* class applicable to both FTC and FRC platforms regardless of the type of physical motor used. On top of that, *TrcMotor* also implements many useful features. The following list shows many of the supported features in *TrcMotor*. Some of the features are supported by the motor or motor controller natively. If the motor is not capable of such features, *TrcMotor* may simulate some of them in software if at all possible.
* **Voltage Compensation**: Motors are powered by a battery and battery voltage will decline as it is running down. When *Voltage Compensation* is enabled, it will compensate the motor power value (within reason) according to the condition of the battery voltage. In other words, a fully charged battery may have a higher voltage than the nominal voltage of the battery (12V). A fairly drained battery may have a lower voltage. If we set the motor power value to 0.5 (i.e. half power), for a fully charged battery at 14V, it will run the motor at 7V. For a drained battery at 10V, it will run it at 5V. This makes the motor running at different speed according to the battery voltage even though we are programming it with the same power value. With *Voltage Compensation* turned on, a power value of 0.5 means half of the battery's nominal voltage (12V/2 = 6V). It will compensate the power value to effectively run the motor at 6V regardless of the battery condition. This makes the motor running at a more consistent speed regardless of the battery voltage.
* **Follow Another Motor**: There are some mechanism designs that require two or more motors to drive them. It could be because the mechanism has too heavy load for a single motor to handle or it has two sides that each side is driven by a motor for parallel movement. For this kind of mechanisms, we will designate a primary motor and all other motors being followers of the primary motor. From programming's point of view, all motors are treated as a single motor. Setting the power or velocity of the primary motor will result in all followers receiving the same command.
*  **Motor Stall Protection**: Motors provide infinite rotational movement, but mechanisms in the real world usually have physical range limits. For example, an Arm or Elevator will have a lower and upper limit to its movement. If the mechanism reaches one of the physical range limits, it cannot go further and will stall the motor. When a motor is stalled, it will draw tremendous amount of current overheating the motor and will eventually fry the motor. Some motor controllers support limit switches so that if they got triggered, the power will be cut off to protect the motor. For motor controllers that do not support limit switches, *TrcMotor* provides software stall protection. To detect motor stall, the motor must be powered at or above the specified minimum stall power and the motor encoder must register no movement or movement less than the specified threshold for more than the specified amount of time. Once stall condition is detected, *TrcMotor* will stop the motor. If a *reset timeout* is specified, the stall condition will be cleared after reset timeout has expired. If the cause of the motor stall is not removed and power is re-applied, the motor will stall again and will trigger the protection again. *Reset timeout* allows the motor to cool off so that the operation can be retried if the cause of the motor stall is removed. Without *reset timeout", motor stall will render the motor inoperable for the rest of the competition match.


*  For example, it added support for a digital input sensor to reset the motor encoder automatically (limit switches). This is useful for using the motor in a complex actuator such as an arm or elevator when you may need to zero calibrate the zero position of the actuator using a lower limit switch. It also added support to provide velocity control and motor odometry. On top of the fundamental motor features, it also provided PID Controlled functionality. It can support either native motor close-loop control (position and velocity PID control) or software PID control in case some motors do not support native close-loop control (e.g. continuous servos). *TrcMotor* added support for lower and upper limit switches, motor stall protection for safety, multiple motors with synchronization (motor followers), zero position calibration, gravity compensation and much more. These advanced features made it trivial to implement complex subsystems such as swing arm, elevator, slide or pan and tilt. The built-in PIDF controller allows the arm or elevator to be controlled by an analog joystick to speed up or slow down the arm/elevator movement. It understands the arm/elevator position approaching the lower/upper position limits and will automatically slow down its movement. It also provides stall protection. If the PID Actuator got stuck and the motor is stalled, it can cut motor power to prevent it from burning out. It also allows a reset timeout so that the stall condition can be cleared after a certain period assuming the stall condition is caused by human temporarily. This allows the subsystem to resume its function and provides time for the motor to cool down. In addition, it also supports voltage compensation. It understands battery voltage drop and can compensate the power level sent to the motor.

* setStallProtection
* enableLowerLimitSwitch
* enableUpperLimitSwitch
* softPositionLimits
* positionSensorInverted
* positionSensorScaleAndOffset
* resetPosition
* setSoftwarePidEnabled
* cancel
* stop
* setPidPower
* setPower
* setPosition
* setVelocity
* setCurrent
* setVelocityPidParams
* setPositionPidParams
* setCurrentPidParams
* resetPositionOnLowerLimitSwitch
* zeroCalibrate
* positionPresets
* velocityPresets
* motorOdometry
* 
* resetFactoryDefault
* setCurrentLimit
* setCloseLoopRampRate
* setOpenLoopRampRate
* setBrakeModeEnabled
