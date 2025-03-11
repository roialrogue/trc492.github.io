---
layout: page
title: Exclusive Subsystem
parent: TRC Lib Framework
nav_order: 10
---

### **Exclusive Subsystem**  

A **robot consists of multiple subsystems** (e.g., drive base, elevator, shooter, intake, vision). During **TeleOp mode**, most of these can be manually controlled by the human operator. However, some **auto-assist operations** also require access to these subsystems.  

#### **The Problem: Conflicting Controls**  
Consider a **vision-assisted shooter** that:  
1. Stops the drive base.  
2. Captures an image for vision processing.  
3. Calculates the shooting trajectory.  
4. Spins up the shooter to the correct speed.  
5. Adjusts the shooter’s pan and tilt to aim.  
6. Fires at the target.  

Since multiple subsystems are involved, **conflicts can arise** between **auto-assist operations** and **manual TeleOp control**. For example, if a **joystick-controlled tilting mechanism** is also being adjusted by **auto-assist aiming**, both controls **send conflicting commands**, resulting in **jerky movement**.

#### **The Solution: Exclusive Subsystem Control**  
To **prevent conflicts**, a subsystem can be declared as an **Exclusive Subsystem**.  

- Before an **auto-assist operation** begins, it **acquires exclusive ownership** of the subsystem.  
- While owned, **only the auto-assist operation** can control the subsystem—**TeleOp commands are ignored**.  
- Once the **auto-assist operation is complete**, ownership is **released**, allowing TeleOp control to resume.  

This mechanism ensures **smooth, uninterrupted operation** for both **TeleOp and auto-assist modes**, eliminating **interference and unintended behavior**.

---
The **Exclusive Subsystem feature** provides seamless coordination between **manual control and automated operations**, enhancing robot performance.
