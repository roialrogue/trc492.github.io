# Servo Actuator
Servo Actuator is implemented in the **TrcServo** class in the Framework Library. It abstracts a superset of functionalities of what a servo can do. Some functionalities are supported by the servo natively and others are simulated in software by **TrcServo**. Note that our Framework Library considers a Continuous Rotation Servo the same as a DC motors and not a servo, therefore, Servo Actuator only supports servos configured as regular servos (refer to *[Motor Actuator](https://trc492.github.io/pages/MotorActuator.html)* for Continuous Rotation Servos). Since our Framework Library is shared between FTC and FRC, **TrcServo** is platform independent and provides generic servo functionalities for both FTC and FRC. This allows our subsystem code to work in both FTC and FRC environment. In order for **TrcServo** to support both FTC and FRC platforms, corresponding FTC and FRC subclasses must extend **TrcServo** and will provide platform specific accesses to the corresponding servo hardware. For example, *FtcServo* class in FTC and *FrcServo* class in FRC. To make it even easier to use, the Framework Library also provide wrapper classes *FtcServoActuator* and *FrcServoActuator* that contain code to instantiate and configure the servo hardware for the corresponding platform.

## Subsystem Parameters
* **setServoInverted**: Sets the servo direction.
* **setHasFollowerServo**: Specifies if you have a follower servo (2-servo driven mechanism) and also sets its direction so that it agrees with the primary servo.
* **setLogicalPosRange**: Sets the logical position range of the servo. This is useful to limit the range to be within the max range of 0.0 and 1.0. If this is not set, the default range is 0.0 to 1.0.
* **setPhysicalPosRange**: Sets the physical position range of the servo in physical real world unit. The physical range should correspond to the logical range. For example, if the Logical Range is set to 0.2 to 0.85 which corresponds to 15 to 95 degrees, then the logical range should be set to 15.0 and 95.0 correspondingly. If this is not set, the default physical range is 0.0 to 1.0. In most common scenarios, we don't really care about using physical position values, therefore, we generally do not set physical range nor logical range and just leave them at their default ranges.
* **setMaxStepRate**: Sets the maximum stepping rate of the servo. This enables *setPower* to speed control the servo. Generally, servos do not support speed control. If you set the servo to a certain position, it will go there at its own time. You cannot slow it down. However, it is sometimes useful to be able to speed control a servo. For example, using a joystick to control how fast the servo moves. Or, the servo is too fast and you simply want it to go slower. **TrcServo** provides software simulation of speed controlling a servo by specifying the maximum stepping rate of the servo in physical units per second. It performs speed controlling the servo by moving the servo to its target position in steps. It calculates the step size by multiplying a percentage of *maxStepRate* with time. Therefore, if we are moving the servo at maximum power, it will calculate a maximum step size. To slow down the movement, it will calculate a percentage of the maximum step size.
* **setPositionPresets**: Sets up an array of preset positions in physical units. This is optional. Only if you wish to use two gamepad buttons (e.g. DPad Up/Down) to command the mechanism to go up/down to the next preset position. Note that the preset position array must be sorted in ascending order.

## Subsystem Methods
* **Constructor**: Creates an instance of the mechanism with the specified parameters.
* **getActuator**: Returns the **FtcServo** or **FrcServo** object created for the mechanism.

The following are the most commonly called methods provided by **TrcServo** which is the object returned by the *getActuator* method:
* **cancel**: Cancels a previous servo operation if there is one.
* **getPosition**: Returns the physical position value of the servo. Generally, servo do not provide real time position feedback. Therefore, this will only return the position set by the last *setPosition* call.
* **setPosition**: Sets the servo position. By default, the servo maps its physical position the same as its logical position [0.0, 1.0]. However, if setPhysicalPosRange was called, it could map a real world physical range (e.g. [0.0, 180.0] degrees) to the logical range of [0.0, 1.0]. Servo operates on logical position. On a 180-degree servo, 0.0 is at 0-degree and 1.0 is at 180-degree. For a 90-degree servo, 0 -> 0-deg, 1 -> 90-deg. If servo direction is inverted, then 0.0 is at 180-deg and 1.0 is at 0-deg. Optionally, you can specify a delay before running the servo to the specified position. Also optionally, if you specify a stepping rate, it will speed control the servo with the specified speed.
* **setPower**: Speed controls the servo with stepping. Optionally, you can specify a delay before running the servo with the specified percentage speed.
* **getPower**: Returns the last set power value.
* **presetPositionUp**: Sets the servo to the next preset position up from the current position.
* **presetPositionDown**: Sets the servo to the next preset position down from the current position.

## Example: Create a Wrist Subsystem for FTC
* Create a Java class in the subsystems folder (e.g. Wrist.java).
```
    public class Wrist
    {
        private final FtcServo wristServo;
    
        /**
         * Constructor: Creates an instance of the object.
         */
        public Wrist()
        {
            FtcServoActuator.Params wristParams = new FtcServoActuator.Params()
                .setServoInverted(RobotParams.WRIST_SERVO_INVERTED)
                .setHasFollowerServo(RobotParams.WRIST_HAS_FOLLOWER_SERVO, RobotParams.WRIST_FOLLOWER_SERVO_INVERTED)
                .setLogicalPosRange(RobotParams.WRIST_SERVO_LOGICAL_MIN, RobotParams.WRIST_SERVO_LOGICAL_MAX)
                .setPhysicalPosRange(RobotParams.WRIST_SERVO_PHYSICAL_MIN, RobotParams.WRIST_SERVO_PHYSICAL_MAX)
                .setMaxStepRate(WRIST_SERVO_MAX_STEPRATE)
                .setPositionPresets(RobotParams.WRIST_PRESET_TOLERANCE, RobotParams.WRIST_PRESETS);
            wristServo = new FtcServoActuator(RobotParams.HWNAME_WRIST, wristParams).getActuator();
        }
    
        public FtcServo getWristServo()
        {
            return wristServo;
        }
    }
```
* Instantiate the Wrist subsystem in the constructor of Robot.java.
```
    ...
    public FtcServo wrist;
    ...
    public Robot(TrcRobot.RunMode runMode)
    {
        ...
        if (RobotParams.Preferences.useSubsystems)
        {
            ...
            if (RobotParams.Preferences.useWrist)
            {
                wrist = new Wrist().getWristServo();
                wrist.setPosition(RobotParams.WRIST_DOWN_POS);
            }
            ...
        }
        ...
    }
```
* The code above is referencing a lot of constants from RobotParams.java. We need to define all those constants. In RobotParams.Preferences, add a switch so that we can enable/disable the subsystem. This is very useful during development because the subsystem may not exist yet. At the end of the RobotParam.java class, add the Wrist subsystem section like below.

  The wrist consists of two 5-turn servos mounted facing each other. That means the follower servo is inverted from the primary servo. Because of gear ratio, one turn of the wrist requires three turns of the servo. Since the servo is a 5-turn servo, it means one turn of the wrist would only require 3/5 of the logical range. Therefore, we limit our logical range to 0.0 and 0.6 and map it to a physical range of 0.0 to 360.0 degrees.
```
    public static class Preferences
    {
        ...
        // Subsystems
        public static boolean useSubsystems = true;
        public static boolean useWrist = true;
        ...
    }
    ...
    //
    // Wrist subsystem: All values below are just an example implementation, you need to change them to fit your subsystem.
    //
    public static final String HWNAME_WRIST                     = "wrist";
    // Actuator parameters.
    public static final boolean WRIST_SERVO_INVERTED            = false;
    public static final boolean WRIST_HAS_FOLLOWER_SERVO        = true;
    public static final boolean WRIST FOLLOWER_SERVO_INVERTED   = true;
    public static final double WRIST_GEAR_RATIO                 = 90.0 / 30.0;  // 3:1
    // goBilda 5-turn servo: https://www.gobilda.com/2000-series-5-turn-dual-mode-servo-25-3-speed/
    // Wrist rotates 1 turn, servo rotates 3 turns => 3/5 of the servo range.
    public static final double WRIST_SERVO_LOGICAL_MIN          = 0.0;
    public static final double WRIST_SERVO_LOGICAL_MAX          = WRIST_GEAR_RATIO / 5.0 ;
    public static final double WRIST_SERVO_PHYSICAL_MIN         = 0.0;
    public static final double WRIST_SERVO_PHYSICAL_MAX         = 360.0;        // in degrees
    public static final double WRIST_SERVO_MAX_STEPRATE         = 115.0 * 360.0 / 60.0 / WRIST_GEAR_RATIO;  // in degrees/sec
    public static final double WRIST_DOWN_POS                   = 0.0;
    // Preset positions.
    public static final double WRIST_PRESET_TOLERANCE           = 1.0;          // in deg
    // Presets array must be sorted in ascending order in the unit of deg
    public static final double[] WRIST_PRESETS                  = new double[] {
        0.0, 60.0, 120.0, 180.0, 240.0, 300.0
    };
```
