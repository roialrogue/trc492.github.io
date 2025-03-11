---
layout: page
title: PIDF Control
parent: TRC Lib Framework
nav_order: 11
---

### **PIDF Control**  
In addition to supporting **native motor close-loop control**, our framework library also provides **software PIDF control** with several advanced features:  

- **PIDF Components**: Supports **Proportional (P)**, **Integral (I)**, **Derivative (D)**, and **Feedforward (F)** components.  
- **iZone**: Adds a zone where the integral component is disabled to prevent integral windup.  
- **Target Tolerance**: Understands target tolerance and handles steady-state error (e.g., stalling).  
- **Absolute vs. Relative Target**: Supports both absolute and relative setpoints for flexibility.  
- **Oscillation Prevention**: Prevents overshooting by stopping once the controller exceeds tolerance.  
- **Ramp Rate**: Allows control over the ramp rate of close-loop control.  
- **Stall Detection**: Detects stalls due to steady-state error and aborts control to avoid infinite loops.  
- **Power Limits**: Supports setting maximum power limits for close-loop control.  

These advanced features make PIDF control suitable for handling complex robotic subsystems, ensuring smooth and efficient operation.