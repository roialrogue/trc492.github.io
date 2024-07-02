# Servo Actuator
Servo Actuator is implemented in the **TrcServo** class in the Framework Library. It abstracts a superset of functionalities of what a servo can do. Some functionalities are supported by the servo natively and others are simulated in software by **TrcServo**. Note that our Framework Library considers a Continuous Rotation Servo the same as a DC motors and not a servo, therefore, Servo Actuator only supports servos configured as regular servos (refer to *https://trc492.github.io/pages/MotorActuator.html* for Continuous Rotation Servos). Since our Framework Library is shared between FTC and FRC, **TrcServo** is platform independent and provides generic servo functionalities for both FTC and FRC. This allows our subsystem code to work in both FTC and FRC environment. In order for **TrcServo** to support both FTC and FRC platforms, corresponding FTC and FRC subclasses must extend **TrcServo** and will provide platform specific accesses to the corresponding servo hardware. For example, *FtcServo* class in FTC and *FrcServo* class in FRC. To make it even easier to use, the Framework Library also provide wrapper classes *FtcServoActuator* and *FrcServoActuator* that contain code to instantiate and configure the servo hardware for the corresponding platform.

## Subsystem Parameters
* **setServoInverted**: Sets the servo direction.
* **setHasFollowerServo**: Specifies if you have a follower servo (2-servo driven mechanism) and also sets its direction so that it agrees with the primary servo.
* **setLogicalPosRange**: Sets the logical position range of the servo. This is useful to limit the range to be within the max range of 0.0 and 1.0. If this is not set, the default range is 0.0 to 1.0.
* **setPhysicalPosRange**: Sets the physical position range of the servo in physical real world unit. The physical range should correspond to the logical range. For example, if the Logical Range is set to 0.2 to 0.85 which corresponds to 15 to 95 degrees, then the logical range should be set to 15.0 and 95.0 correspondingly. If this is not set, the default physical range is 0.0 to 1.0. In most common scenarios, we don't really care about using physical position values, therefore, we generally do not set physical range nor logical range and just leave them at their default ranges.
* **setMaxStepRate**: Sets the maximum stepping rate of the servo. This enables *setPower* to speed control the servo. Generally, servos do not support speed control. If you set the servo to a certain position, it will go there at its own time. You cannot speed up or slow it down. However, it is sometimes useful to be able to speed control a servo. For example, using a joystick to control how fast the servo moves. Therefore, **TrcServo** provides software simulation of speed controlling a servo by specifying the maximum stepping rate of the servo in physical units per second. It performs speed controlling the servo by moving the servo to its target position in steps. It calculates the step size by multiplying the *maxStepRate* with percentage power. Therefore, if we are moving the servo at maximum power, it will calculate a maximum step size. To slow down the movement, it will calculate a percentage of the maximum step size.
* **setPositionPresets**: Sets up an array of preset positions in physical units. This is optional. Only if you wish to use two gamepad buttons (e.g. DPad Up/Down) to command the mechanism to go up/down to the next preset position. Note that the preset position array must be sorted in ascending order.

## Subsystem Methods
* **Constructor**: Creates an instance of the mechanism with the specified parameters.
* **getActuator**: Returns the **FtcServo** object created for the mechanism.

The following are the most commonly called methods provided by **TrcServo** which is the object returned by the *getActuator* method:
* **cancel**: Cancels a previous servo operation if there is one.
* **getPosition**: Returns the physical position value of the servo. Generally, servo do not provide real time position feedback. Therefore, this will only return the position set by the last *setPosition* call.
* **setPosition**: Sets the servo position. By default, the servo maps its physical position the same as its logical position [0.0, 1.0]. However, if setPhysicalPosRange was called, it could map a real world physical range (e.g. [0.0, 180.0] degrees) to the logical range of [0.0, 1.0]. Servo operates on logical position. On a 180-degree servo, 0.0 is at 0-degree and 1.0 is at 180-degree. For a 90-degree servo, 0 -> 0-deg, 1 -> 90-deg. If servo direction is inverted, then 0.0 is at 180-deg and 1.0 is at 0-deg. Optionally, you can specify a delay before running the servo to the specified position. Also optionally, if you specify a stepping rate, it will speed control the servo with the specified speed.
* **setPower**: Speed controls the servo with stepping. Optionally, you can specify a delay before running the servo with the specified percentage speed.
* **getPower**: Returns the last set power value.
* **presetPositionUp**: Sets the servo to the next preset position up from the current position.
* **presetPositionDown**: Sets the servo to the next preset position down from the current position.

## Example: Create a Grabber Subsystem
* Create a Java class in the subsystems folder (e.g. Grabber.java).
```
    public class Grabber
    {
        private final TrcMotor armMotor;
    
        /**
         * Constructor: Creates an instance of the object.
         */
        public Grabber()
        {
            FtcMotorActuator.Params armParams = new FtcMotorActuator.Params()
                // Set motor direction so that positive power is to swing the arm upward.
                .setMotorInverted(RobotParams.ARM_MOTOR_INVERTED)
                // Specify whether you have lower and/or upper limit switches.
                // Depending on if the limit switches are Normal-Open or Normal-Close, set INVERTED appropriately
                // so that pressing it will return a true value (false for Normal-Close and true for Normal-Open).
                .setLowerLimitSwitch(RobotParams.ARM_HAS_LOWER_LIMIT_SWITCH, RobotParams.ARM_LOWER_LIMIT_INVERTED)
                .setUpperLimitSwitch(RobotParams.ARM_HAS_UPPER_LIMIT_SWITCH, RobotParams.ARM_UPPER_LIMIT_INVERTED)
                // Enabling voltage compensation will compensate for different battery level due to use.
                .setVoltageCompensationEnabled(RobotParams.ARM_VOLTAGE_COMP_ENABLED)
                // For gravity compensation to work correctly, the arm must report its angle position in degrees relative
                // to vertical which is 0-degree (i.e. arm angle is 90-degree at horizontal). You must determine the
                // proper scaling factor by applying the following equation:
                //   ARM_DEG_PER_COUNT = 360.0 / ENCODER_PPR / GEAR_RATIO;
                // The resting position of an arm is typically not vertical. Therefore, you must specify the rest position
                // angle as the ARM_OFFSET. To determine the rest position, use a leveling app on your smart phone (download
                // one from your app store if you don't have it) resting up against the arm to measure its angle relative to
                // vertical.
                .setPositionScaleAndOffset(RobotParams.ARM_DEG_PER_COUNT, RobotParams.ARM_OFFSET)
                // Setting position presets is optional. Only if you wish to use two gamepad buttons (e.g. DPad Up/Down) to
                // command the arm to go up/down to the next preset position. Note that the preset position array must be
                // sorted in ascending order.
                .setPositionPresets(RobotParams.ARM_PRESET_TOLERANCE, RobotParams.ARM_PRESETS);
            armMotor = new FtcMotorActuator(RobotParams.HWNAME_ARM, true, armParams).getActuator();
            //
            // If you are using motor native PID control, uncomment the following line. Otherwise, comment it out.
            // For FTC motors, the built-in PID Coefficients are generally good enough, so we don't need to set it. But for FRC,
            // you need to do a setPositionPidParameters here because the default Coefficients are probably zeros.
            //
            armMotor.setPositionPidTolerance(RobotParams.SLIDE_TOLERANCE);
            //
            // If you are using software PID control, uncomment the following section. Otherwise, comment it out.
            //
    //        armMotor.setSoftwarePidEnabled(true);
    //        armMotor.setPositionPidParameters(
    //            RobotParams.ARM_KP, RobotParams.ARM_KI, RobotParams.ARM_KD, RobotParams.ARM_KF,
    //            RobotParams.ARM_IZONE, RobotParams.ARM_TOLERANCE);
    //        // The getPowerComp method will be called every time when PID is calculating the power to be applied to the arm.
    //        // The PowerComp value will be added to the arm power to compensate for gravity.
    //        arm.setPositionPidPowerComp(this::getPowerComp);
    //        // Enabling Stall Detection is optional. You only need this if you want to zero calibrate the arm, but you don't
    //        // have a lower limit switch. By enabling stall detection, the arm position will be reset when the motor is
    //        // stalled during zero calibration.
    //        // STALL_DETECTION_DELAY specifies the amount of time to delay detecting stall condition in order to give time for
    //        //    the motor to start up.
    //        // STALL_DETECTION_TIMEOUT specifies the amount of time that the motor is not moving, or the movement is below
    //        //    ErrRateThreshold before declaring motor stalled.
    //        // STALL_DETECTION_ERR_RATE_THRESHOLD specifies the amount of movement below which we considered the motor not
    //        //    moving.
    //        armMotor.setStallDetectionEnabled(
    //            RobotParams.ARM_STALL_DETECTION_DELAY, RobotParams.ARM_STALL_DETECTION_TIMEOUT,
    //            RobotParams.ARM_STALL_ERR_RATE_THRESHOLD);
            //
            // Stall protection is optional and will detect motor stall to cut power to protect it.
            // A motor is considered stalled if:
            // - the power applied to the motor is above or equal to stallMinPower.
            // - the motor has not moved, or movement stayed within stallTolerance for at least stallTimeout.
            // Note: By definition, holding target position doing software PID control is stalling. If you decide to enable
            //       stall protection while holding target, please make sure to set a stallMinPower much greater than the
            //       power necessary to hold position against gravity, for example. However, if you want to zero calibrate
            //       on motor stall, you want to make sure calPower is at least stallMinPower.
            //
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
* The Arm class above is referencing a lot of constants from RobotParams.java. We need to define all those constants. At the end of the RobotParam.java class, add the Arm subsystem section like below:
```
    //
    // Arm subsystem.
    //
    public static final String HWNAME_ARM                       = "arm";
    // Actuator parameters.
    public static final boolean ARM_MOTOR_INVERTED              = false;
    public static final boolean ARM_HAS_LOWER_LIMIT_SWITCH      = false;
    public static final boolean ARM_LOWER_LIMIT_INVERTED        = false;
    public static final boolean ARM_HAS_UPPER_LIMIT_SWITCH      = false;
    public static final boolean ARM_UPPER_LIMIT_INVERTED        = false;
    public static final boolean ARM_VOLTAGE_COMP_ENABLED        = true;
    public static final double ARM_ENCODER_PPR                  = 537.6898;
    public static final double ARM_GEAR_RATIO                   = 28.0;
    public static final double ARM_DEG_PER_COUNT                = 360.0 / ARM_ENCODER_PPR / ARM_GEAR_RATIO;
    public static final double ARM_OFFSET                       = 27.0;
    public static final double ARM_MIN_POS                      = 27.3;
    public static final double ARM_MAX_POS                      = 300.0;
    // Preset positions.
    public static final double ARM_PRESET_TOLERANCE             = 5.0;
    public static final double[] ARM_PRESETS                    = new double[] {
        30.0, 60.0, 90.0, 120, 150.0, 180.0, 210.0, 240.0, 270.0
    };
    // PID Actuator parameters.
    public static final double ARM_KP                           = 0.0162;
    public static final double ARM_KI                           = 0.0;
    public static final double ARM_KD                           = 0.0;
    public static final double ARM_KF                           = 0.0;
    public static final double ARM_IZONE                        = 0.0;
    public static final double ARM_TOLERANCE                    = 2.0;
    public static final double ARM_MAX_GRAVITY_COMP_POWER       = 0.1675;
    public static final double ARM_STALL_DETECTION_DELAY        = 0.5;
    public static final double ARM_STALL_DETECTION_TIMEOUT      = 0.1;
    public static final double ARM_STALL_ERR_RATE_THRESHOLD     = 10.0;
    public static final double ARM_CAL_POWER                    = -0.25;
    public static final double ARM_STALL_MIN_POWER              = Math.abs(ARM_CAL_POWER);
    public static final double ARM_STALL_TOLERANCE              = 0.1;
    public static final double ARM_STALL_TIMEOUT                = 0.2;
    public static final double ARM_STALL_RESET_TIMEOUT          = 0.0;
```
