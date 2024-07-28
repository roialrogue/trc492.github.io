# PID Control With Feed Forward
PID Control is a popular control strategy used in robotics. **PID** stands for: **Proportional**, **Integral** and **Derivative**. This section will summarize what it is and how we apply it in robot control. You can also read more details about it [here](https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller).

## PID Control
PID is a popular control strategy utilizing sensor feedback (close-loop control) where you set a control target and in conjunction with some feedback sensors monitoring the progress towards the target, it will calculate the output force applying to the system to go towards the target. For example, in a robot drive base, we may set a target for the robot going forward 10 feet. The encoders on the drive wheels will monitor the distance travelled. When the robot is still far away from the target, the robot may go full speed towards the target. But if you stop the robot only when it reaches the target, the robot will not stop instantly because of its inertia. It will pass the target. Therefore, we need feedback sensors to tell us how far we are away from the target and when the robot is getting close to the target, it will slow down and finally stop right on target. PID Control is to take the feedback sensor readings and calculate the *distance to target* or we call it *error*. From that, it will calculate appropriate output power to the motors so that it may slow down using the following algorithm. The overall output is the sum of all three terms (P_Term + I_Term + D_Term).
```
output = Kp * error + Ki * integral_error + Kd * derivative_error
P_Term: Kp * error
I_Term: Ki * integral_error
D_Term : Kd * derivative_error
```
 ![image name](/images/PIDControl.jpg)

### Proportional Term (P_Term)
In plain English, P_Term means the output force is proportional to how big the error is. In other words, if the target is still far away (large error), the output is proportionally large. When it is close to the target (small error), the output is proportionally smaller. If the error is zero (right on target), the output is zero.

 ![image name](/images/PID_varyingP.jpg)

### Integral Term (I_Term)
One problem with P_Term alone is that if the error is becoming very small, the output will become so small that it will not have enough force to overcome static friction. Therefore, it will stop short of the target and will never reach it. The remaining distance to target is called *steady state error*. I_Term is introduced to remedy this problem. Simply put, I_Term is integrating past errors (area under the curve). The longer you have an error, the area will grow larger and therefore an increasing I_Term. In plain English, when the robot stops short with a *steady state error*, the longer it stays there, the larger the I_Term will grow. Essentially, it is winding up power. Eventually, the power will become large enough to overcome static friction and the robot will spring forward. However, this may cause instability to the system. The robot will spring forward passing the target. Once you pass the target, the error becomes negative which causes the P_Term to go negative and the robot will reverse direction back towards the target. This behavior may go back and forth forever. We call it oscillation. Oscillation is very common when introducing the I_Term. One problem is because we are integrating error indiscriminately. When the robot is far away from target, we are still integrating. It means we are integrating a much larger error which is not necessary. We only care about integrating steady state error. Therefore, we introduce the concept of I_Zone. It means we only integrate when the error is within the I_Zone which is set larger than the *steady state error*. Once the error is beyond I_Zone, I_Term will be cleared to zero. In other words, I_Term doesn't come into play unless the error is within I_Zone. I_Zone makes I_Term less susceptible to causing oscillation.

 ![image name](/images/Change_with_Ki.png)

### Derivative Term (D_Term)
With the I_Term integrating past errors, there is a point when the windup power is about to overcome static friction. This will cause the robot to spring forward at abrupt velocity. To combat this problem, we introduce the D_Term. D_Term calculates the derivative of the error (aka error change rate - the inverse slope of the curve). If the robot springs forward, the error will decrease at a high rate. In other words, the D_Term will calculate a negative value. The higher rate of the decreasing error, the larger the negative value. In essence, the D_Term is suppressing the output power, in effect slowing the robot down and therefore making the spring forward gentler.

 ![image name](/images/Change_with_Kd.png)

### Tuning PID

### PID Control Limitations

### PID Power Compensation

## Feed Forward

### KS

### KV (KF)

### KA

## Putting It All Together


