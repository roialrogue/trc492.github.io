---
layout: page
title: FtcOpMode
parent: TRC Lib Framework
nav_order: 1

---

### FtcOpMode

FtcOpMode is our custom opmode extending `LinearOpMode` while providing an interface similar to `OpMode` where you write your code in a loop method. It functions as a cooperative multi-tasking scheduler, enabling multiple subsystems to operate simultaneously. This is essential for the FTC 30-second autonomous period, allowing tasks without dependencies to run concurrently.

**Key features include:**
- Cooperative and multi-threaded true multi-tasking.
- Simplified execution of multiple autonomous tasks.
- Integration with state machines for task management.
