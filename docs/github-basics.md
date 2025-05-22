# Github Basics

In this section, we will show you how to use basic GitHub operations to help you manage your code effectively. It will also direct you on how to use github to debugging and pulling updates for newer versions of the support libraries. While this section covers the basics, if you have some experience with GitHub, you should still skim through it to ensure you understand everything mentioned.

::: tip
GitHub can have a lot of case-by-case errors and problems. This section explains how to do the basics and covers the best-case scenario (where you don’t do anything wrong and don’t need to use commands to fix issues). If you start getting errors or think you broke something, both [Google](https://www.google.com) and [ChatGPT](https://chat.openai.com) are very knowledgeable about GitHub and can help explain errors and how to fix them.

:::

## Branch Setup & Management

Using branches to manage your code is very powerful, but when not used correctly, they can become a massive headache. In this section, we’ll cover the reasons for using branches and how to use them as effectively as possible.


Why use GitHub branches? Branches allow you to work on new features, bug fixes, and edits without affecting the main codebase. This is powerful because it lets you protect your `main` branch while still implementing new code. In the context of FIRST robotics, branches allow you to develop and test new software (any type of code edits) without risking changes to your main robot codebase.

#### Branch Setup

By default, after cloning the FtcTemplate, you will have a `main` and `SampleCode` branch. You should think of your `main` branch almost like a code vault  you don’t want any code in there that isn’t valuable and working. You should never check in directly to the `main` branch. Instead, you should make `dev` branches. This is where you initially check in your written code. Once your code is FULLY TESTED, has no bugs, and is written to be as efficient as possible, then you can push the code to the `main` branch. You always want your `main` branch to be stable and contain the most reliable version of your code.

::: important 
The number of branches you have will depend on how many programmers you have. If you have multiple programmers working on the same branch, you are bound to run into many [conflict](https://en.wikipedia.org/wiki/Edit_conflict) problems. We recommend having a branch for each programmer writing code, as well as one central `dev` branch where the programmers’ branches are merged first to make sure all the code works together.
:::

1. To set up a branch, navigate to the homepage of your repository on github.com.  
<p style="text-align: center;">
  <img src="/images/GitHubAccessingBranches.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p> 

2. Click the green "New branch" button in the top right. Type in your branch name, leave the source as the default selection (unless you know what you're doing).

3. Then click "Create new branch." You have now created a new branch!

#### Branch Management 

Now you have branches, but how do you actually use them? At this point, most of your code management will be done through Android Studio. While you can still use GitHub to view your code, etc., all the committing, pulling, pushing, and branch management will be done through the Android Studio interface.

Open up Android Studio. In the top left corner is your main menu bar it opens up all your menu items. Under the `Git` section, you will find all your Git actions that can be performed. All the important actions for basic code management will be covered in this section. For now, we are going to cover the branch-specific actions.

###### Branches ``Ctrl+Shift+` ``

In this menu, you will be able to see your branches and select which branch you want to be on.

1. First, scroll down to the bottom of this tab.
2. Under the `Remote Branches in "YourRepoName"`, you will see your branches. The `origin` will show all the branches on your fork, so for every branch you made in the step above, you will see them here. In my case, I just have `main` and `dev`. Most of the time, you will want to ignore the `upstream` folder. The only branch you may want to navigate to there is the `SampleCode` branch. This branch contains sample code for most of the Library (just know that you can’t change anything in that branch because you don’t have permission to push to the main repo a.k.a. the upstream fork).

<p style="text-align: center;">
  <img src="/images/AndroidBranches.png" alt="Centered image" width="412" style="border-radius: 12px;"/>
</p> 

3. To switch to a branch, just click on the branch you want to enter and click the first option, `checkout`. You will know you are in the branch by looking in the top left corner of your screen  the branch name will be listed there. This is also a shortcut to the branches section if you click on it!

<p style="text-align: center;">
  <img src="/images/AndroidBranchesIndicator.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p> 

## Commit

Commits are how you save your code with git. You want to commit **OFTEN** and clearly explain your commits. A [commit](https://en.wikipedia.org/wiki/Commit_(version_control)) takes a snapshot of your code at that specific point and saves it on your local version.

1. Navigate to the `Git` tab and select **Commit**, or use the shortcut `Ctrl+K`. This will open the commit tab.
2. In the top section of the commit tab, you can see which files you have changed and which ones you are going to commit. Use the checkmarks to select or unselect them.
3. In the bottom section, you can explain what changes you made in this commit. This will help you when debugging and also help your teammates understand what you changed.

<p style="text-align: center;">
  <img src="/images/AndroidCommit.png" alt="Centered image" width="612" style="border-radius: 12px;"/>
</p> 

4. Once all of that is done, you can click the **Commit** button!

::: caution 
You **NEVER** want to `commit` or `push` anything to `FtcLib` or `TrcLib`. These are support repositories and are not meant to be changed by the end user. If you ever make changes by accident in one of those sections, go to the commit tab, select the file you changed, and click **Rollback**. 
:::


## Push

Now that you have committed your code, it's time to push it to the public repo on GitHub. The push takes your local source code and uploads it to your remote repository a.k.a. your GitHub.com repo.

1. Use the `Git` menu or the shortcut `Ctrl+Shift+K` access the `push` tab.
2. On the right side of the push tab, you will see the commit you are about to push and what you changed.
3. On the left, you will see where you are about to push it. In this case, I am about to push my last commit to `origin : dev`. If you click on the branch section, you can type out which branch you want to push to.

<p style="text-align: center;">
  <img src="/images/AndroidPush.png" alt="Centered image" width="712" style="border-radius: 12px;"/>
</p> 

4. Then click the **Push** button and you’re done. You will now see the commit on your repo on GitHub.com.


## Pull

## Resolving Conflicts

## Updating Support Librarys 

## Debugging with Github 