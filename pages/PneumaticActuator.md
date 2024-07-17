# Pneumatic Actuator
Pneumatic Actuator is implemented in the **FrcPneumatic** class in the Framework Library. It supports one or two channel pneumatic cylinders and provides methods to extend/retract the cylinders with optional delay and duration. Since Pneumatic Actuator is a simple subsystem and only for FRC, there is no need to provide any wrapper class for it. To create a Pneumatic Actuator, you just instantiate the **FrcPenumatic** class directly.

## Subsystem Methods
* **Constructor**: Creates an instance of the actuator with one or two pneumatic channels.

The following are the most commonly called methods:
* **isExtended**: Checks if the pneumatic cylinder is extended. It may return null if the state is unknown which could occur if the initial state of the Pneumatic Actuator was not initialized. After the Pneumatic Actuator is instantiated, you should call extend or retract to initialize its state.
* **extend**: Sets the extend channel active with optional delay and duration.
* **retract**: Sets the retract channel active with optional delay and duration.

## Example: Create a Deployer Subsystem for FRC
* Instantiate an **FrcPneumatic** object as the the subsystem in the robotInit method of Robot.java. Deployer is a 2-channel pneumatic cylinder.
```
    ...
    public FrcPneumatic deployer;
    ...
    public void robotInit()
    {
        ...
        if (RobotParams.Preferences.useSubsystems)
        {
            ...
            if (RobotParams.Preferences.useDeployer)
            {
                deployer = new FrcPneumatic(
                    "Deployer", RobotParams.CANID_PCM, PneumaticsModuleType.REVPH,
                    RobotParams.PNEUMATIC_DEPLOYER_EXTEND, RobotParams.PNEUMATIC_RETRACT);
                // Initialize the deployer position.
                deployer.retract();
            }
            ...
        }
        ...
    }
```
* The code above is referencing a few constants from RobotParams.java. We need to define those constants. In RobotParams.Preferences, add a switch so that we can enable/disable the subsystem. This is very useful during development because the subsystem may not exist yet. In the Solenoid section of RobotParam.java, add the constants like below.
```
    public static class Preferences
    {
        ...
        // Subsystems
        public static boolean useSubsystems = true;
        public static boolean useDeployer = true;
        ...
    }
    ...
    //
    // Solenoid channels:
    // All values below are just an example implementation, you need to change them to fit your subsystem.
    //
    public static final int PNEUMATIC_DEPLOYER_EXTEND           = 0;
    public static final int PNEUMATIC_DEPLOYER_RETRACT          = 1;
```
* To display Deployer Subsystem status in Dashboard, add code to the *updateStatus* method of **Robot.java**.
```
    public void updateStatus()
    {
        ...
        if (deployer != null)
        {
            dashboard.displayPrintf(
                ++lineNum,
                "Deployer: extended=" + deployer.isExtended());
        }
        ...
    }
``` 
* Operating the Deployer Subsystem in TeleOp Mode
  * Determine how you want to control the Deployer Subsystem. For example, one way is to assign a button on the Operator Gamepad to extend/retract the Deployer. Pressing the button to deploy and releasing it to retract. There are other ways of using buttons to actuate the Deployer. Please refer to the [Tips and Tricks](https://trc492.github.io/pages/AdvancedRoboticsProgramming.html#different-ways-of-using-gamepad-buttons) section.
```
    protected void operatorControllerButtonEvent(int buttonValue, boolean pressed)
    {
        ...
        switch (button)
        {
            case BUTTON_A:
                if (robot.deployer != null)
                {
                    if (pressed)
                    {
                        robot.deployer.extend();
                    }
                    else
                    {
                        robot.deployer.retract();
                    }
                    robot.globalTracer.traceInfo(moduleName, ">>>>> DeployerExtended=" + pressed);
                }
                break;
            ...
        }
        ...
    }
```
