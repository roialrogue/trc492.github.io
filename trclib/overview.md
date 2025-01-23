---
layout: page
title: TRC Lib Framework
description: >-
    
---

1. TOC
{:toc}

## Overview
{: .no_toc}

## Titan Robotics Framework Library
{: .no_toc}

<!-- 

### Timers
`TrcTimer` manages multiple simultaneous timers, offering:
- Event signaling.
- Event callback functionality.

### Advanced Multi-tasking
Supports cooperative and multi-threaded tasks using:
- Main robot thread (scheduler for cooperative tasks).
- IO thread (sensor inputs, actuator outputs, PID control, etc.).
- Standalone threads for high-frequency or long-running tasks.

**Note:** Multi-threading requires caution to avoid shared resource contention and synchronization issues.

### Inputs
The Framework Library supports various input devices:
- **Gamepad Controllers**: Monitors button state changes and triggers callbacks.
- **Sensors**: Supports a range of sensors (e.g., ultrasonic, color, gyros) and communication protocols (I2C, Serial, SPI).
- **Driver Station Dashboard**: Provides choice and value menus for pre-competition configuration.

### Data Filters and Processors
To handle noisy sensor data, the library includes:
- Filters (e.g., IIR, Kalman, Spurious).
- Data converters (e.g., integrators for gyro data).
- Contiguous value converters for non-contiguous sensor readings.

### Outputs
The Framework Library supports diverse output devices:
- **Motors**: Enhancements include PID control, motor synchronization, stall protection, and voltage compensation.
- **Servos**: Includes features like logical-to-physical position translation, speed control, and multi-servo synchronization.
- **Lights**: Supports LED control, priority schemes, and LED matrix panels.
- **Sound**: Enables tone generation and text-to-speech for driver feedback.

### Drive Base
Provides support for:
- **Simple Differential Drive Base**: For 2-6 motors, supports basic driving strategies.
- **Mecanum Drive Base**: Enables holonomic and field-oriented driving.
- **Swerve Drive Base**: Advanced kinematics and localization.

**Features include:**
- Stall detection and event signaling.
- Gyro-assisted driving for straight motion.
- Odometry and localization using encoder and gyro data.

### Exclusive Subsystem
- Prevents conflicts between human and auto-assist operations by requiring exclusive ownership of subsystems.

### PIDF Control
- Provides advanced software PIDF controllers with features like iZone, target tolerance, and stall detection.

### Motor and Drive Base Odometry
- Tracks motor and drive base positions in real-world units.
- Optimized for performance with bulk caching and performance monitors.

### Path Following
- Supports Pure Pursuit Drive for pre-planned and dynamic paths.

### Vision
- Simplifies integration with industrial libraries like TensorFlow, AprilTag, and OpenCV.
- Provides asynchronous support to prevent blocking the main robot thread.

### Utility
- Trace Logging: Logs information at configurable levels (VERBOSE, DEBUG, INFO, WARNING, ERROR, FATAL) for debugging and performance analysis. -->

---

The TRC Library is packed with powerful features designed to simplify and enhance your robotics programming experience. The following subpages provide an overview of some of the key capabilities and tools included in the library:
