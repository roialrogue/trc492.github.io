# Installing

Before you can start coding, you need to install the required software on your computer. In this section, we will talk about installing Source Control Software as well as the reqiured IDE.

## Source Control Software

We use [GitHub](https://en.wikipedia.org/wiki/GitHub) Desktop as our [source control](https://en.wikipedia.org/wiki/Source_Code_Control_System) software that stores our source code on the Internet at GitHub.com (GitHub repositories). Follow these instructions to set up and install software to access our GitHub repositories.

1. Log in to GitHub or create an account if you do not already have one ([link here](https://GitHub.com)).
2. Navigate [to FtcTemplate](https://github.com/trc492/FtcTemplate) and click the "Fork" button.
<p style="text-align: center;">
  <img src="/images/GitHubFtcTemplateForkHighlight.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p>
3. You are now on the "Create a new fork" page. You need to fill in a title (e.g., `3830-IntoTheDeep2025`) and a description if you would like. After you finish, click "Create fork".
<p style="text-align: center;">
  <img src="/images/GitHubCreateFork.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p>

::: warning
If you have already cloned FtcTemplate, you will first need to disconnect your current fork before reforking. To do this, navigate to your current forked repo, go to *Settings->Danger Zone->Leave* fork network (the Danger Zone is located at the bottom of the main settings page). Follow the verification steps to disconnect the fork, and you're all set — now follow the directions as before.
:::

4. Download and install GitHub Desktop from [here](https://desktop.github.com).
5. Start GitHub Desktop, then click *File->Clone repository...*
<p style="text-align: center;">
  <img src="/images/GitHubDesktopFileClone.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p>

6. Under the "GitHub.com" tab, find the repository you just forked and click on it. Please note that Windows may suggest cloning into your OneDrive folder. Unless you pay for large storage on OneDrive, we recommend changing the location to your local hard drive. For example:

```
 C:\Users\<You>\Document\GitHub
```
<p style="text-align: center;">
  <img src="/images/GitHubFtcTemplateClone.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p>

7. Click the Clone button. Congratulations! You have now successfully cloned the FtcTemplate repository. To open your project in Android Studio, use the section labeled "Open the repository in your external editor." Use the Options button to select Android Studio, then click "Open in Android Studio."

::: note
If GitHub Desktop asks you "How are you planning to use this fork?" select "For my own purposes" and click Continue.
:::

##  Android Studio

To download and install Android Studio, go to this [website](https://developer.android.com/studio). Click the download Android Studio button and agree to their terms and conditions. Once the installer is downloaded, open it to start the installation. Generally, you can take all the default options it suggested unless you know what you are doing and want to customize the installation. Click “Finish” to start Android Studio. In the “Welcome to Android Studio” window, click the “Open” button and select the FtcTemplate folder where you cloned the GitHub repository.
