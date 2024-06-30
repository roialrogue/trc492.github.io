# FTC Programming Software Installation
In this section, we will talk about installing Source Control Software as well as FTC Software Components.

## Source Control Software
We use GitHub Desktop as our [source control](https://en.wikipedia.org/wiki/Source_Code_Control_System) software that stores our source code on the Internet at GitHub.com (GitHub repositories). Follow these instructions to set up and install software to access our GitHub repositories.
* Create a GitHub account if you do not already have one [link here](https://GitHub.com).
* Download and install the GitHub Desktop software from [here](https://desktop.github.com).
* Start GitHub Desktop, click *File->Clone repository...*
 ![image name](/images/GitHubDesktopFileClone.jpg)
* Select the URL tab and enter the repository URL: *https://github.com/trc492/FtcTemplate.git*
* Enter the local path to clone the repository into. Please note that Windows may suggest cloning into your OneDrive folder. Unless you pay for huge storage on OneDrive, we recommend you change it to your local hard drive. For example:
```
 C:\Users\<You>\Document\GitHub
```

 ![image name](/images/GitHubDesktopCloneRepoFtc.jpg)
* Click the Clone button.

Congratulations! You have now successfully cloned the FtcTemplate repository.

## FTC Software Components
To develop code for an FTC robot, you need to install the following software components:
1. Android Studio: [Integrated Development Environment](https://en.wikipedia.org/wiki/Integrated_development_environment) (IDE)
2. Git Command Line Tools: Git command line tools (plug-in for Android Studio)

### Android Studio
To download and install Android Studio, go to this [website](https://developer.android.com/studio). Click the download Android Studio button and agree to their terms and conditions. Once the installer is downloaded, open it to start the installation. Generally, you can take all the default options it suggested unless you know what you are doing and want to customize the installation. Click “Finish” to start Android Studio. In the “Welcome to Android Studio” window, click the “Open” button and select the FtcTemplate folder where you cloned the GitHub repository.

### Git Command Line Tools
Git command line tools allow you to perform Git operations within Android Studio. You can download and install them from [here](https://git-scm.com/downloads). During the installation, it will ask you to select a lot of choices, just take all the defaults unless you know what you are doing.
