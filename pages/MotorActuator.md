# Motor Actuator
Motor Actuator is implemented in the **TrcMotor** class in the Framework Library. It abstracts a superset of functionalities of what a motor controller can do. Some functionalities are supported by some motor controllers natively and others are simulated in software by **TrcMotor**. Since our Framework Library is shared between FTC and FRC, **TrcMotor** is platform independent and provides generic motor controller functionalities for both FTC and FRC. This allows our subsystem code to work in both FTC and FRC environment. In order for **TrcMotor** to support both FTC and FRC platforms, corresponding FTC and FRC subclasses must extend **TrcMotor** and will provide platform specific accesses to the corresponding motor controller hardware. For example, *FtcDcMotor* class in FTC and *FrcCANPhoenix5/FrcCANPhoenix6/FrcCANSparkMax* classes in FRC. To make it even easier to use, the Framework Library also provide wrapper classes *FtcMotorActuator* and *FrcMotorActuator* that contain code to instantiate and configure the motor controller/sensor hardware for the corresponding platform.

Motor Actuator supports different configurations of subsystems. Even though they sound different, they are actually the same. They all contain one or more motors for movement, an encoder for keeping track of their positions, and limit switches to limit their range of movement. Therefore, the same Motor Actuator code can support all these variations.
* **Elevator**: This extends/retracts linearly usually up and down vertically but can be at an angle if necessary. Its movement is in the unit of inches.
* **Slide**: This is the same as an elevator but extends/retracts in and out horizontally instead.
* **Arm**: This is a swing arm that moves around an elbow joint. Its movement is in the unit of degrees. Typically, there is an end-effector attached to the end of the arm that will become a variable load to the arm at different arm angle. For example, the end-effector will be the heaviest when the arm is completely horizontal versus zero load when the arm is vertical. In order to control the arm smoothly and hold it in position regardless of the varying load at different arm angles, **TrcMotor** supports gravity compensation which allows the code to compute compensating power according to the arm angle using trigonometry. Even though software can compensate for gravity by applying additional power, it is recommended to design an arm with mechanical gravity compensation. Ideally, an arm can be mechanically designed to be gravity neutral (i.e. the arm can be positioned at any angle and stay there without applying power to hold it). Without mechanical gravity compensation, software has to apply additional power to hold the arm in position. If the end-effector is heavy, this could cause over current applying to the motor and may eventually burnout the motor.
* **Pan And Tilt**: It is sometimes desirable to mount an end-effector on a pan-and-tilt gimbal. Pan and Tilt are actually two motor actuators:
  * **Turret**: This is the panning mechanism that allows the end-effector to rotate around horizontally aiming at different directions.
  * **Tilter**: This is the tilting mechanism that allows the end-effector to rotation vertically aiming up and down. It is basically the same as an arm.

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
* The Arm class above is referencing a lot of constants from RobotParams.java. We need to define all those variables. At the end of the RobotParam.java class, add the Arm subsystem section like below:
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
