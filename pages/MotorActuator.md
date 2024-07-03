# Motor Actuator
Motor Actuator is implemented in the **TrcMotor** class in the Framework Library. It abstracts a superset of functionalities of what a motor controller can do. Some functionalities are supported by some motor controllers natively and others are simulated in software by **TrcMotor**. Since our Framework Library is shared between FTC and FRC, **TrcMotor** is platform independent and provides generic motor controller functionalities for both FTC and FRC. This allows our subsystem code to work in both FTC and FRC environment. In order for **TrcMotor** to support both FTC and FRC platforms, corresponding FTC and FRC subclasses must extend **TrcMotor** and will provide platform specific accesses to the corresponding motor controller hardware. For example, *FtcDcMotor* class in FTC and *FrcCANPhoenix5/FrcCANPhoenix6/FrcCANSparkMax* classes in FRC. To make it even easier to use, the Framework Library also provide wrapper classes *FtcMotorActuator* and *FrcMotorActuator* that contain code to instantiate and configure the motor controller/sensor hardware for the corresponding platform.

Motor Actuator supports different configurations of subsystems. Even though they sound different, they are actually the same. They all contain one or more motors for movement, an encoder for keeping track of their positions, and limit switches to limit their range of movement. Therefore, the same Motor Actuator code can support all these variations.
* **Elevator**: This extends/retracts linearly usually up and down vertically but can be at an angle if necessary. Its movement is in the unit of inches.
* **Slide**: This is the same as an elevator but extends/retracts in and out horizontally instead.
* **Arm**: This is a swing arm that moves around an elbow joint. Its movement is in the unit of degrees. Typically, there is an end-effector attached to the end of the arm that will become a variable load to the arm at different arm angle. For example, the end-effector will be the heaviest when the arm is completely horizontal versus zero load when the arm is vertical. In order to control the arm smoothly and hold it in position regardless of the varying load at different arm angles, **TrcMotor** supports gravity compensation which allows the code to compute compensating power according to the arm angle using trigonometry. Even though software can compensate for gravity by applying additional power, it is recommended to design an arm with mechanical gravity compensation. Ideally, an arm can be mechanically designed to be gravity neutral (i.e. the arm can be positioned at any angle and stay there without applying power to hold it). Without mechanical gravity compensation, software has to apply additional power to hold the arm in position. If the end-effector is heavy, this could cause over current applying to the motor and may eventually burnout the motor.
* **Pan And Tilt**: It is sometimes desirable to mount an end-effector on a pan-and-tilt gimbal. Pan and Tilt are actually two motor actuators:
  * **Turret**: This is the panning mechanism that allows the end-effector to rotate around horizontally aiming at different directions.
  * **Tilter**: This is the tilting mechanism that allows the end-effector to rotation vertically aiming up and down. It is basically the same as an arm.

## Subsystem Parameters
* **setMotorInverted**: Sets the motor direction so that positive power is to move the mechanism forward/upward.
* **setFollowerMotor**: Specifies if you have a follower motor (2-motor driven mechanism) and also sets its direction so that it agrees with the primary motor.
* **setLowerLimitSwitch, setUpperLimitSwitch**: Specifies if you have lower and/or upper limit switches. Depending on if the limit switches are Normal-Open or Normal-Close, set "inverted" appropriately so that pressing it will return a true value (inverted set to false for Normal-Close and true for Normal-Open).
* **setExternalEncoder**: Specifies if you have an external encoder and also sets its direction as well as whether it is an absolute encoder.
* **setVoltageCompensationEnabled**: Enables/disables voltage compensation to compensate for battery voltage variations.
* **setPositionScaleAndOffset**: Sets the position scale and offset to scale the position value to real world units. For example, for gravity compensation to work correctly, the arm must report its angle position in degrees relative to vertical which is 0-degree (i.e. arm angle is 90-degree at horizontal). You must determine the proper scaling factor by applying the following equation:

  *ARM_DEG_PER_COUNT = 360.0 / ENCODER_PPR / GEAR_RATIO;*

  The resting position of an arm is typically not vertical. Therefore, you must specify the resting position angle as the *ARM_OFFSET*. To determine the resting position, use a leveling app on your smart phone (download one from your app store if you don't have it) resting up against the arm to measure its angle relative to vertical.
* **setPositionPresets**: Sets up an array of preset positions. This is optional. Only if you wish to use two gamepad buttons (e.g. DPad Up/Down) to command the mechanism to go up/down to the next preset position. Note that the preset position array must be sorted in ascending order.

## Subsystem Methods
* **Constructor**: Creates an instance of the mechanism with the specified parameters and optionally specifies if it is a DC Motor or a Continuous Rotation Servo (default is DC Motor).
* **getActuator**: Returns the **TrcMotor** object created for the mechanism.

The following are the most commonly called methods provided by **TrcMotor** which is the object returned by the *getActuator* method:
* **setStallProtection**: Sets stall protection. When stall protection is turned ON, it will monitor the motor movement for stalled condition and will cut power to protect the motor.

  A motor is considered stalled if:
  * power applied to the motor is above or equal to *stallMinPower*.
  * motor has not moved or movement stayed within *stallTolerance* for at least *stallTimeout*.

  Note: By definition, holding target position doing software PID control is stalling. If you decide to enable stall protection while holding target, please make sure to set a *stallMinPower* much greater than the power necessary to hold position against gravity. However, if you want to zero calibrate on motor stall (e.g. don't have lower limit switch), you want to make sure *calPower* is at least *stallMinPower*.
* **setStallDetectionEnabled**: Enables/disables Stall Detection. This is independent and different from Stall Protection. You only need this if you want to zero calibrate the mechanism, but you don't have a lower limit switch. By enabling stall detection, the mechanism position will be reset when the motor is stalled during zero calibration.
  * *stallDetectionDelay* specifies the amount of time to delay detecting stall condition in order to give time for the motor to start up.
  * *stallDetectionTimeout* specifies the amount of time that the motor is not moving, or the movement is below *stallErrorRateThreshold* before declaring motor stalled.
  * *stallErrorRateThreshold* specifies the amount of movement below which we considered the motor not moving.
* **isLowerLimitSwitchActive, isUpperLimitSwitchActive**: Returns the state of the lower/upper limit switch.
* **resetPosition**: Resets the motor position sensor if it has one, typically an encoder. If *hardware* is false, it will do a soft reset (i.e. set the current sensor reading as the zero position).
* **setSoftwarePidEnabled**: Enables/disables Software PID Control. Some motor controllers support native close-loop control but some don't (e.g. Continuous Rotation Servo). Enabling Software PID Control will apply close-loop control using our software PID control algorithm.
* **cancel**: Cancels a previous operation by resetting the state set by the previous operation. Note: cancel does not stop the motor and therefore it will still hold its position. If you want to stop the motor, call the *stop* method instead.
* **stop**: Stops the motor regardless of the control mode and resets it to power control mode. This is different from setting the motor value to zero. In Velocity Control Mode, setting zero velocity will abruptly stop the motor that could be very stressful to the gear box. The *stop* method will gracefully spin down the motor instead of forcing it to stop abruptly.
* **setPower**: Sets the motor power. If the motor is not in the correct control mode, it will stop the motor and set it to power control mode. Optionally, you can specify a delay before running the motor and a duration for which the motor will be turned off afterwards.
* **getPower**: Returns the current motor power.
* **setVelocity**: Sets the motor velocity. If the motor is not in the correct control mode, it will stop the motor and set it to velocity control mode. Optionally, you can specify a delay before running the motor and a duration for which the motor will be turned off afterwards.
* **getVelocity**: Returns the current motor velocity in scaled units per second.
* **setPosition**: Sets the motor position. If the motor is not in the correct control mode, it will stop the motor and set it to power control mode. Optionally, you can specify a power limit to limit the maximum power it will apply to the motor (i.e. slowing down the motor movement).
* **getPosition**: Returns the current motor position in scaled units.
* **setPidPower**: Sets the motor power with PID control. This is basically the same as *setPosition* but with dynamically changing *powerLimit*. The motor will be under position PID control and the power specifies the maximum limit of how fast the motor can go. The actual motor power is controlled by a PID controller with the target either set to *minPos* or *maxPos* depending on the direction of the motor. This is very useful in scenarios such as an elevator where you want to have the elevator controlled by a joystick but would like PID control to pay attention to the upper and lower limits and slow down when approaching those limits. The joystick value will specify the maximum limit of the elevator power. So if the joystick is only pushed half way, the elevator will only go half power even though it is far away from the target.
* **setCurrent**: Sets the motor current. If the motor is not in the correct control mode, it will stop the motor and set it to current control mode. Optionally, you can specify a delay before running the motor and a duration for which the motor will be turned off afterwards. Note that not all motor controllers support close-loop control by current. If they don't, this will throw an *UnsupportedOperationException*.
* **getCurrent**: Returns the motor current in amperes.
* **setVelocityPidParameters**: Sets the PID parameters of the motor's velocity PID controller. Note that PID coefficients are different for software PID and controller built-in PID. If you enable/disable software PID, you need to set the appropriate PID coefficients accordingly.
* **setVelocityPidTolerance**: Sets the velocity tolerance for PID control in scaled units per second.
* **getVelocityOnTarget**: Checks if velocity PID control has reached target.
* **setVelocityPidPowerComp**: Sets the power compensation callback of the motor's velocity PID controller.
* **setPositionPidParameters**: Sets the PID parameters of the motor's position PID controller. Note that PID coefficients are different for software PID and controller built-in PID. If you enable/disable software PID, you need to set the appropriate PID coefficients accordingly.
* **setPositionPidTolerance**: Sets the position tolerance for PID control in scaled units.
* **getPositionOnTarget**: Checks if position PID control has reached target.
* **setPositionPidPowerComp**: Sets the power compensation callback of the motor's position PID controller.
* **setCurrentPidParameters**: Sets the PID parameters of the motor's current PID controller. Note that PID coefficients are different for software PID and controller built-in PID. If you enable/disable software PID, you need to set the appropriate PID coefficients accordingly.
* **setCurrentPidTolerance**: Sets the current tolerance for PID control in amperes.
* **getCurrentOnTarget**: Checks if current PID control has reached target.
* **setCurrentPidPowerComp**: Sets the power compensation callback of the motor's current PID controller.
* **zeroCalibrate**: Starts zero calibration mode by moving the motor with specified calibration power until a limit switch is hit or the motor is stalled.
* **presetPositionUp**: Sets the motor to the next preset position up from the current position.
* **presetPositionDown**: Sets the motor to the next preset position down from the current position.
* **presetVelocityUp**: Sets the motor to the next preset velocity up or down from the current velocity.
* **presetVelocityDown**: Sets the motor to the next preset velocity down from the current velocity.

## Example: Create An Arm Subsystem for FTC
Since all these subsystems are derivatives of the Motor Actuator, we will just show the example of how an Arm subsystem for FTC is implemented. For FRC implementation, we will leave it for you as an exercise. It should be very similar. To create the arm subsystem, follow the steps below:
* Create a Java class in the subsystems folder (e.g. Arm.java).
```
    public class Arm
    {
        private final TrcMotor armMotor;
    
        /**
         * Constructor: Creates an instance of the object.
         */
        public Arm()
        {
            FtcMotorActuator.Params armParams = new FtcMotorActuator.Params()
                .setMotorInverted(RobotParams.ARM_MOTOR_INVERTED)
                .setLowerLimitSwitch(RobotParams.ARM_HAS_LOWER_LIMIT_SWITCH, RobotParams.ARM_LOWER_LIMIT_INVERTED)
                .setUpperLimitSwitch(RobotParams.ARM_HAS_UPPER_LIMIT_SWITCH, RobotParams.ARM_UPPER_LIMIT_INVERTED)
                .setVoltageCompensationEnabled(RobotParams.ARM_VOLTAGE_COMP_ENABLED)
                .setPositionScaleAndOffset(RobotParams.ARM_DEG_PER_COUNT, RobotParams.ARM_OFFSET)
                .setPositionPresets(RobotParams.ARM_PRESET_TOLERANCE, RobotParams.ARM_PRESETS);
            armMotor = new FtcMotorActuator(RobotParams.HWNAME_ARM, true, armParams).getActuator();
            //
            // If you are using motor native PID control, uncomment the following line. Otherwise, comment it out.
            // For FTC motors, the built-in PID Coefficients are generally good enough, so we don't need to set it. But for
            // FRC, you need to do a setPositionPidParameters here because the default Coefficients are probably zeros.
            //
            armMotor.setPositionPidTolerance(RobotParams.ARM_TOLERANCE);
            //
            // If you are using software PID control, uncomment the following section. Otherwise, comment it out.
            //
    //        armMotor.setSoftwarePidEnabled(true);
    //        armMotor.setPositionPidParameters(
    //            RobotParams.ARM_KP, RobotParams.ARM_KI, RobotParams.ARM_KD, RobotParams.ARM_KF,
    //            RobotParams.ARM_IZONE, RobotParams.ARM_TOLERANCE);
    //        // The getPowerComp method will be called every time when PID is calculating the power to be applied to the
    //        // arm. The PowerComp value will be added to the arm power to compensate for gravity.
    //        arm.setPositionPidPowerComp(this::getPowerComp);
    //        armMotor.setStallDetectionEnabled(
    //            RobotParams.ARM_STALL_DETECTION_DELAY, RobotParams.ARM_STALL_DETECTION_TIMEOUT,
    //            RobotParams.ARM_STALL_ERR_RATE_THRESHOLD);
            armMotor.setStallProtection(
                RobotParams.ARM_STALL_MIN_POWER, RobotParams.ARM_STALL_TOLERANCE,
                RobotParams.ARM_STALL_TIMEOUT, RobotParams.ARM_STALL_RESET_TIMEOUT);
        }
    
        public TrcMotor getArmMotor()
        {
            return armMotor;
        }
    
        /**
         * This method is called to compute the power compensation to counteract gravity on the Arm.
         *
         * @param currPower specifies the current motor power (not used).
         * @return gravity compensation for the arm.
         */
        private double getPowerComp(double currPower)
        {
            // ARM_MAX_GRAVITY_COMP_POWER is the power required to hold the arm at horizontal position.
            return RobotParams.ARM_MAX_GRAVITY_COMP_POWER * Math.sin(Math.toRadians(arm.getPosition()));
        }
   }
```
* Instantiate the Arm subsystem in the constructor of Robot.java.
```
    ...
    public TrcMotor arm;
    ...
    public Robot(TrcRobot.RunMode runMode)
    {
        ...
        if (RobotParams.Preferences.useSubsystems)
        {
            ...
            if (RobotParams.Preferences.useArm)
            {
                arm = new Arm().getArmMotor();
                // Zero calibrate the arm.
                arm.zeroCalibrate(RobotParams.ARM_CAL_POWER);
            }
            ...
        }
        ...
    }
```
* The Arm class above is referencing a lot of constants from RobotParams.java. We need to define all those constants. In RobotParams.Preferences, add a switch so that we can enable/disable the subsystem. This is very useful during development because the subsystem may not exist yet. At the end of the RobotParam.java class, add the Arm subsystem section like below.

  The Arm consists of a DC motor with no limit switches. Therefore, we are using zero calibration by motor stall. Since the code above is using motor native close-loop control, the Software PID Control Coefficients section is not really required. It is there in case you want to change the code to use Software PID control instead.
```
    public static class Preferences
    {
        ...
        // Subsystems
        public static boolean useSubsystems = true;
        public static boolean useArm = true;
        ...
    }
    ...
    //
    // Arm subsystem: All values below are just an example implementation, you need to change them to fit your subsystem
    // and tune some of the values (e.g. PID Coefficients).
    //
    public static final String HWNAME_ARM                       = "arm";
    // Actuator parameters.
    public static final boolean ARM_MOTOR_INVERTED              = false;
    public static final boolean ARM_HAS_LOWER_LIMIT_SWITCH      = false;
    public static final boolean ARM_LOWER_LIMIT_INVERTED        = false;
    public static final boolean ARM_HAS_UPPER_LIMIT_SWITCH      = false;
    public static final boolean ARM_UPPER_LIMIT_INVERTED        = false;
    public static final boolean ARM_VOLTAGE_COMP_ENABLED        = true;
    public static final double ARM_ENCODER_PPR                  = 537.6898;     // Motor encoder PPR
    public static final double ARM_GEAR_RATIO                   = 28.0;
    public static final double ARM_DEG_PER_COUNT                = 360.0 / ARM_ENCODER_PPR / ARM_GEAR_RATIO;
    public static final double ARM_OFFSET                       = 27.0;         // Arm resting position angle in deg
    public static final double ARM_MIN_POS                      = 27.3;         // Arm min angle in deg
    public static final double ARM_MAX_POS                      = 300.0;        // Arm max angle in deg
    public static final double ARM_POWER_SCALE                  = 0.5;          // Slowing down the arm
    // Preset positions.
    public static final double ARM_PRESET_TOLERANCE             = 5.0;          // in deg
    // Presets array must be sorted in ascending order in the unit of deg
    public static final double[] ARM_PRESETS                    = new double[] {
        30.0, 60.0, 90.0, 120, 150.0, 180.0, 210.0, 240.0, 270.0
    };
    // Software PID Control Coefficients.
    public static final double ARM_KP                           = 0.0162;
    public static final double ARM_KI                           = 0.0;
    public static final double ARM_KD                           = 0.0;
    public static final double ARM_KF                           = 0.0;
    public static final double ARM_IZONE                        = 0.0;
    
    public static final double ARM_TOLERANCE                    = 2.0;          // in deg
    public static final double ARM_MAX_GRAVITY_COMP_POWER       = 0.1675;       // in percentage power
    public static final double ARM_STALL_DETECTION_DELAY        = 0.5;          // in seconds
    public static final double ARM_STALL_DETECTION_TIMEOUT      = 0.1;          // in seconds
    public static final double ARM_STALL_ERR_RATE_THRESHOLD     = 10.0;         // in deg/sec
    public static final double ARM_CAL_POWER                    = -0.25;        // in percentage power
    public static final double ARM_STALL_MIN_POWER              = Math.abs(ARM_CAL_POWER);
    public static final double ARM_STALL_TOLERANCE              = 0.1;          // in deg
    public static final double ARM_STALL_TIMEOUT                = 0.2;          // in second
    public static final double ARM_STALL_RESET_TIMEOUT          = 0.0;          // in second
```
* To display Arm Subsystem status in Dashboard, add code to the *updateStatus* method of **Robot.java**.
```
    public void updateStatus()
    {
        ...
        if (arm != null)
        {
            dashboard.displayPrintf(
                ++lineNum,
                "Arm: power=" + arm.getPower() +
                ",pos=" + arm.getPosition() +
                ",target=" + arm.getPidTarget());
        }
        ...
    }
``` 
* Operating the Arm Subsystem in TeleOp Mode
  * Determine how you want to control the Arm Subsystem. For example:
    * Assign the Y-axis of the right joystick on the Operator Gamepad to control the Arm moving up and down.
    * Assign the Right Bumper of the Operator Gamepad as the *operateAltFunc* button where if it is pressed and held, the Arm will be moving with direct power using the joystick value (manual override). If the Right Bumpeer is not pressed, the Arm will be moving with the joystick value using PID control and therefore will slow down when approaching its lower or upper limits regardless of the joystick value.
    * Assign the DPad Up/Down buttons on the Operator Gamepad to move the Arm to the next preset position up or down.
  * To control the Arm with an analog joystick, add code to the *periodic* method of **FtcTeleOp.java** like below. This code will periodically read the joystick value and use it to control how fast the Arm will move. There are two ways to control how fast the Arm will move: *setPower* and *setPidPower*. *setPower* applies direct power to the Arm motor with the joystick value. It does not understand *minPos* and *maxPos* and therefore will not stop or slow down at the lower or upper Arm limits. *setPidPower* applies power to the Arm motor with the joystick value. However, it understands *minPos* and *maxPos*. When it is approaching those limits, it will slow down the Arm movement regardless of the joystick value and will stop to make sure it never passes the limits.
  *  To step the Arm position up and down preset values, add code to the *operatorButtonEvent* method of **FtcTeleOp.java**. The Framework Library monitors button events and will call this method when a button is pressed or released. When the DPad Up is pressed, we will call the Arm to move to the next preset position up. When the DPad Down is pressed, we will call it to move to the next preset position down.
  *  Also add code to the *operatorButtonEvent* method of **FtcTeleOp.java** for using Right Bumper button as *operatorAltFunc*.
```
    private double armPrevPower = 0.0;
    private boolean operatorAltFunc = false;
    ...
    public void periodic(double elapsedTime, boolean slowPeriodicLoop)
    {
        ...
        //
        // Other subsystems.
        //
        if (RobotParams.Preferences.useSubsystems)
        {
            // Arm subsystem: only do this if the arm is enabled.
            if (robot.arm != null)
            {
                // Send power value to the arm if it is different from before.
                // This prevents repeatedly sending zero power to the arm if the joystick is not moved.
                double armPower = operatorGamepad.getRightStickY(true) * RobotParams.ARM_POWER_SCALE;
                if (armPower != armPrevPower)
                {
                    if (operatorAltFunc)
                    {
                        // By definition, Manual Override should not observe any safety.
                        // Therefore, set arm power directly bypassing all safety checks.
                        robot.arm.setPower(armPower);
                    }
                    else
                    {
                        robot.arm.armSetPidPower(
                            null, armPower, RobotParams.ARM_MIN_POS, RobotParams.ARM_MAX_POS);
                    }
                    armPrevPower = armPower;
                }
            }
            ...
        }
        ...
    }
    ...
    protected void operatorButtonEvent(TrcGameController gamepad, int button, boolean pressed)
    {
        ...
        switch (button)
        {
            ...
            case FtcGamepad.GAMEPAD_RBUMPER:
                robot.globalTracer.traceInfo(moduleName, ">>>>> operatorAltFunc=" + pressed);
                operatorAltFunc = pressed;
                break;
            case FtcGamepad.DPAD_UP:
                // Check if arm is enabled.
                if (robot.arm != null && pressed)
                {
                    robot.globalTracer.traceInfo(moduleName, ">>>>> Arm Preset Up");
                    robot.arm.presetPositionUp(moduleName, RobotParams.ARM_POWER_SCALE);
                }
                break;
            case FtcGamepad.DPAD_DOWN:
                // Check if arm is enabled.
                if (robot.arm != null && pressed)
                {
                    robot.globalTracer.traceInfo(moduleName, ">>>>> Arm Preset Down");
                    robot.arm.presetPositionDown(moduleName, RobotParams.ARM_POWER_SCALE);
                }
                break;
        }
        ...
    }
```
