# FtcTemplate Structure

The goal of this section is to help you get comfortable with the layout of TrcLib. We'll be focusing mainly on the user-side structure. Before we dive in, it's helpful to have a basic understanding of the backend layout so you know how everything is structured. It’s recommended that you’ve completed the [installation](https://trc492.github.io/installing.md) process and have Android Studio open with the FtcTemplate project open.

<img src="/images/TRCLibArchitecture.png" alt="TRC Architecture" style="border-radius: 12px; width: 100%; max-width: 800px;" />

If you look at the image above, you’ll notice that FtcTemplate is supported by two libraries: TrcLib and FtcLib. This structure exists because the TRC Robotics Framework is designed to support both FRC and FTC. To make that possible, there's a shared core library—TrcLib—that handles most of the core logic and software optimizations. However, since FRC and FTC are different platforms with different hardware, each requires platform-specific support. Just as FIRST provides separate SDKs for each, the TRC Framework includes a platform-specific layer like FtcLib to interface with the FTC SDK and support any features unique to FTC that aren’t shared with FRC.

:::files
<div class="files-block-title">FtcTemplate File Structure</div>
<span class="folder">FtcRobotController</span>
<span class="folder">TeamCode</span>
 ├──<span class="folder">manifests</span>
 ├──<span class="folder">java</span>
 │   ├──<span class="folder">ftclib</span>
 │   ├──<span class="folder">teamcode</span>
 │   │   ├──<span class="folder">autocommands</span>
 │   │   ├──<span class="folder">subsystems</span>
 │   │   ├──<span class="folder">tasks</span>
 │   │   ├──<span class="folder">vision</span>
 │   │   ├──<span class="file">Dashboard</span>
 │   │   ├──<span class="file">FtcAuto</span>
 │   │   ├──<span class="file">FtcTeleOp</span>
 │   │   ├──<span class="file">FtcTest</span>
 │   │   ├──<span class="file">LICENSE</span>
 │   │   ├──<span class="file">Robot</span>
 │   │   └──<span class="file">RobotParams</span>
 │   └──<span class="folder">trclib</span>
 └──<span class="folder">res</span>
<span class="folder">Gradle Scripts</span>
:::

:::warning
This file structure is what you’ll see when viewing the project through Android Studios. If you view FtcTemplate on GitHub, it will look slightly different.
:::

## AutoCommands

## AutoTasks

## Subsystems

## FtcAuto.java

## FtcTeleOp.java

## FtcTest.java

## Robot.java

## RobotParams.java 