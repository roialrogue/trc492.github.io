---
layout: page
title: Vision
parent: TRC Lib Framework
nav_order: 15
---

### **Vision**  
Vision plays a crucial role in tasks such as navigating the robot to specific locations or shooting game elements at targets. Our library supports multiple vision libraries to handle different levels of complexity:  

- **Supported Libraries**: TensorFlow, AprilTag, OpenCV, and more.  
- **Asynchronous Processing**: We wrap these libraries with easy-to-use interfaces that support asynchronous image processing, ensuring the main robot thread remains free for other tasks.  
- **Vision Complexity**: From **color blob detection** to **machine learning object recognition**, the library supports a wide range of vision tasks.  

By offloading the heavy lifting to industrial libraries and enabling asynchronous processing, we ensure smooth performance during vision-based operations.