---
layout: page
title: Timer
parent: TRC Lib Framework
nav_order: 4
---

### Timers

The Timer Manager (`TrcTimer`) manages multiple simultaneous timers. When a timer expires, you have the option of signaling an event or performing an event callback.  

For example, if you want to spin a motor for 3 seconds and turn it off afterward, you can arm a timer that expires in 3 seconds and execute an event callback to turn the motor off. This type of operation is sometimes called **“fire and forget.”**