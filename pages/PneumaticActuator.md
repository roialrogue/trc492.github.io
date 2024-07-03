# Pneumatic Actuator
Pneumatic Actuator is implemented in the **FrcPneumatic** class in the Framework Library. It supports one or two channel pneumatic cylinders and provides methods to extend/retract the cylinders with optional delay and duration. Since Pneumatic Actuator is a simple subsystem and only for FRC, there is no need to provide any wrapper class for it. To create a Pneumatic Actuator, you just instantiate the **FrcPenumatic** class directly.

## Subsystem Methods
* **Constructor**: Creates an instance of the actuator with one or two pneumatic channels.

The following are the most commonly called methods:
* **isExtendActive**: Checks if the extend channel is active.
* **extend**: Sets the extend channel active with optional delay and duration.
* **isRetractActive**: Checks if the retract channel is active.
* **retract**: Sets the retract channel active with optional delay and duration.

## Example: Create a Deployer Subsystem
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
            if (RobotParams.Preferences.useIntake)
            {
                deployer = new FrcPneumatic(
                    "Deployer", RobotParams.CANID_PCM, PneumaticsModuleType.REVPH,
                    RobotParams.PNEUMATIC_DEPLOYER_EXTEND, RobotParams.PNEUMATIC_RETRACT);
                deployer.retract();
            }
            ...
        }
        ...
    }
```
* The deployer object above is referencing a few constants from RobotParams.java. We need to define those constants. In the Solenoid section of RobotParam.java, add the constants like below.
```
    //
    // Solenoid channels:
    // All values below are just an example implementation, you need to change them to fit your subsystem.
    //
    public static final int PNEUMATIC_DEPLOYER_EXTEND           = 0;
    public static final int PNEUMATIC_DEPLOYER_RETRACT          = 1;
```
