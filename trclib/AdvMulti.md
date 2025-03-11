---
layout: page
title: Advanced Multitasking
parent: TRC Lib Framework
nav_order: 5
---

### Advanced Multi-Tasking

In addition to cooperative multi-tasking, our Framework Library also supports **multi-threaded tasks**. The Library provides several standard threads, including:

- **Main Robot Thread** – Runs the `FtcOpMode`, where the scheduler performs cooperative multi-tasking.  
- **IO Thread** – Handles all input tasks (e.g., reading sensors and odometry) and output tasks (e.g., motor and actuator control, including PID control and pathing).  

For specialized needs, such as high-frequency processing that cannot tolerate latency or long-running tasks that could block the main thread, the Library enables the creation of **standalone tasks** with their own threads. All tasks and threads are managed by the **Task Manager (`TrcTaskMgr`)**.  

### Multi-Threading Considerations

While all built-in Library components are thread-safe, caution is required when writing multi-threaded code. Avoid common pitfalls like:  

- **Shared resource contention** – Ensure proper synchronization when accessing shared resources.  
- **Task synchronization** – Prevent race conditions and deadlocks by properly managing task dependencies.  

If you're unfamiliar with multi-threaded programming, it's best to **stick with cooperative multi-tasking**. Even then, follow these best practices:  

- **Do not block the main robot thread.** Avoid busy-wait loops and sleep statements. Instead, start an operation and exit immediately.  
- **Use asynchronous operations.** Most Library functions are non-blocking and provide mechanisms to signal or notify task completion.  
- **Leverage state machines.** Your state machine should handle waiting for operations to complete, ensuring smooth cooperative multi-tasking.  

By following these principles, your tasks will efficiently share processing time, enabling a well-coordinated and responsive robot system.