---
layout: page
title: Drive Base
parent: TRC Lib Framework
nav_order: 9
---

### Drive Base  

The **Framework Library** supports **three types of drive bases**:

1. **Simple Differential Drive Base (`TrcSimpleDriveBase`)**  
2. **Mecanum Drive Base (`TrcMecanumDriveBase`)**  
3. **Swerve Drive Base (`TrcSwerveDriveBase`)**  

All drive bases include built-in **kinematics, odometry, and localization**. This means the library can utilize **wheel encoders and a gyro sensor** to track the robot’s **absolute field location**, combining sensor readings for precise movement control.  

The library also supports **passive-wheel odometry (dead-wheel odometry)**, allowing **2-4 passive omniwheels with encoders** to track the robot’s absolute position. All odometry data is **scaled to real-world units** (e.g., inches instead of encoder counts).  

#### **Advanced Drive Features**
- **Stall Detection:** Detects when the drive base is stuck (e.g., hitting an obstacle or a field wall). This can be used to **relocalize** the robot by resetting its position.  
- **Multiple Drive Strategies:** Supports `tankDrive`, `arcadeDrive`, and `curveDrive`.  
- **Holonomic Drive Support:** Available for Mecanum and Swerve drive bases (`holonomicDrive`).  
- **Field-Oriented Driving:** Allows the robot to move in **any direction, independent of heading**.  
- **Gyro-Assist Driving:** Uses a **gyro sensor** to maintain a straight path, compensating for weight imbalances or uneven wheel friction.

### **Drive Base Types**
#### **1. Simple Differential Drive Base (`TrcSimpleDriveBase`)**  
- Supports **2 to 6 motors** (left and right sides, each with 1-3 motors).  
- **No strafing** ability (i.e., no `holonomicDrive` support).  
- Suitable for traditional tank-drive robots.  

#### **2. Mecanum Drive Base (`TrcMecanumDriveBase`)**  
- Utilizes **4 mecanum wheels**, each with its own motor.  
- Supports **holonomic drive**, allowing **strafing** in any direction.  

#### **3. Swerve Drive Base (`TrcSwerveDriveBase`)**  
- Uses **4 swerve wheel modules**, each consisting of:  
  - **1 drive motor**  
  - **1 steering motor** (can be a DC motor or continuous servo).  
- Each **swerve module can be independently steered**, enabling movement in **any direction**, even while **maintaining a different heading**.

---
The **Framework Library’s drive base support** provides **powerful motion control**, enabling precise, efficient, and flexible robot movement.