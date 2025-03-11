---
layout: page
title: Motor Odometry
parent: TRC Lib Framework
nav_order: 12
---

### **Motor Odometry**  
**Motor odometry** tracks motor position and velocity in real-world units (e.g., inches) instead of encoder counts. If the motor does not provide native velocity reports, our library calculates the velocity for you. Key features include:  

- **Performance Optimization**: The library is highly optimized and supports **Lynx Bulk Caching mode**, reading motor odometry only once per robot loop for improved performance.  
- **Built-in Performance Monitors**: These help diagnose and debug any performance issues.
