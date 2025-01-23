---
layout: page
title: State Machine
parent: TRC Lib Framework
nav_order: 2
---

### State Machine
The state machine infrastructure forms the core of multi-tasking by tracking task states. It allows `FtcOpMode` to switch between tasks, maintaining their states when resumed from a suspended state.

### Task Synchronization
The Framework Library supports task synchronization for dependencies between tasks through:
- **Events (`TrcEvent`)**: Signal task completion.
- **Callbacks (`TrcEvent.Callback`)**: Perform additional work upon task completion.




### FtcOpMode
{:toc}

FtcOpMode is our custom opmode extending `LinearOpMode` while providing an interface similar to `OpMode` where you write your code in a loop method. It functions as a cooperative multi-tasking scheduler, enabling multiple subsystems to operate simultaneously. This is essential for the FTC 30-second autonomous period, allowing tasks without dependencies to run concurrently.

**Key features include:**
- Cooperative and multi-threaded true multi-tasking.
- Simplified execution of multiple autonomous tasks.
- Integration with state machines for task management.
