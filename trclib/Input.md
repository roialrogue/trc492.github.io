---
layout: page
title: Inputs
parent: TRC Lib Framework
nav_order: 6
---

### Inputs

The Framework Library supports a variety of input devices, including **gamepad controllers, sensors, and the driver station dashboard**.

#### Gamepad Controller  
The Framework Library monitors all gamepad buttons for state changes. Any button press or release triggers an **event callback** to your button event handler, significantly simplifying your TeleOp code.

#### Sensors  
The Framework Library supports numerous sensor types, including:  
- **Digital sensors**  
- **Analog sensors**  
- **I2C sensors**  
- **Android built-in sensors**  

Popular sensors include ultrasonic sensors, color sensors, distance sensors (e.g., LiDAR), gyros, accelerometers, touch sensors, IR seekers, and Pixy cameras. The Library also supports multiple communication protocols (**I2C, Serial, SPI, etc.**), enabling you to develop custom sensor drivers for devices not natively supported.

#### Driver Station Dashboard  
The Framework Library provides **easy access to the driver station** as an input device. It allows you to create:  
- **Choice Menus (`FtcChoiceMenu`)** – Used for selecting predefined options.  
- **Value Menus (`FtcValueMenus`)** – Used for inputting numerical values.  

These menus enable pre-match configurations, such as:  
- Selecting **RED or BLUE Alliance**.  
- Choosing a **starting position**.  
- Setting a **delayed autonomous start** to avoid collisions.  
- Enabling or skipping specific **autonomous tasks**.  

The Choice and Value menus form a **decision tree**, allowing users to make selections using the gamepad buttons before a match starts.