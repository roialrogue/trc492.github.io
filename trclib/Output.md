---
layout: page
title: Outputs
parent: TRC Lib Framework
nav_order: 8
---

### Outputs  

The Framework Library supports various **output devices**, including **motors, servos, lights, and sound**.

#### Motors  
Motors are fundamental to robot movement. While the **FTC SDK** provides basic motor classes (e.g., `DcMotor`, `DcMotorEx`), the **Framework Library** extends functionality with multiple layers of enhancements:

- **FtcDcMotor (extends TrcMotor)** – Adds support for digital input sensors, automatically resetting motor encoders using limit switches.  
- **Velocity Mode Control & Motor Odometry** – Enhances movement tracking and control.  
- **PID Control Support** – Allows **native motor closed-loop control** (position/velocity PID) or software PID control for motors lacking built-in PID (e.g., continuous servos).  
- **Advanced Safety Features:**  
  - **Limit switches (upper/lower bounds)**
  - **Motor stall protection** – Prevents burnout by cutting power if the motor stalls.  
  - **Motor synchronization** – Supports multi-motor setups with leader-follower configurations.  
  - **Gravity compensation** – Adjusts power output based on arm/elevator positioning.  
  - **Voltage compensation** – Adjusts for battery voltage drops to maintain consistent performance.  

These features make it **easy to implement complex actuators** like swing arms and elevators while ensuring safety and efficiency.

#### Servos  
Servos are crucial actuators, especially given **FTC's motor limit**. The **Framework Library** enhances servo control beyond the FTC SDK:  

- **Logical-to-Physical Position Mapping** – Converts values between **0-1** range to **degrees (0°-180°)**.  
- **Direction Inversion** – Allows reversing servo movement.  
- **Servo Follower Support** – Synchronizes multiple servos.  
- **Continuous Servo Control** – Includes optional encoder support.  
- **Speed Control** – Enables analog joystick control for smooth movement.  

#### Lights (LEDs)  
The Library supports **various LED configurations**, from simple single-color LEDs to **RGB LED strips** and **REV Blinkin controllers**.  

##### Key Features:
- **Robot Status Feedback** – LEDs change colors based on robot state (e.g., vision detection, intake status).  
- **Priority Scheme (TrcPriorityIndicator)** – Prevents LED conflicts by assigning priority levels to different events.  
- **LED Matrix Panel Support** – More common in **FRC**, as FTC power/electronics limitations apply.  

While LEDs **enhance aesthetics**, their primary use is **real-time feedback for drivers**.

#### Sound  
Although **REV Robot Controller Hub** lacks built-in sound, **sound support is redirected to the Driver Station**.  

##### Features:
- **Beep Alerts** – Signals important robot events (e.g., motor stall protection).  
- **Text-to-Speech** – Provides audible status updates to drivers.  

Like LEDs, **sound alerts improve driver awareness**, ensuring quick responses to critical robot states.

---
By supporting **advanced motor control, servo enhancements, LED feedback, and sound alerts**, the **Framework Library** enables **precise and efficient robot operation**.