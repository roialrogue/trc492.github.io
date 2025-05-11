# Github Basics

In this section, we will show you how to use basic GitHub operations to help you manage your code effectively. It will also direct you on how to use github to debugging and pulling updates for newer versions of the support libraries. While this section covers the basics, if you have some experience with GitHub, you should still skim through it to ensure you understand everything mentioned.

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


## Commit

## Push

## Pull

## Resolving Conflicts

## Updating Support Librarys 

## Debugging with Github 