# Complete Guide to Serverless Web App Development on AWS
This is the repository for the LinkedIn Learning course `Complete Guide to Serverless Web App Development on AWS`. The full course is available from [LinkedIn Learning][lil-course-url].

![lil-thumbnail-url]

## Course Description
**Build and Deploy Serverless Web Applications on AWS**
Learn how to build modern web applications without managing servers. This course covers AWS services like Lambda, API Gateway, Amplify, Cognito, App Runner, and Lambda container images to help you create scalable and cost-effective serverless apps.

You’ll learn to:
- Host static websites
- Create RESTful and GraphQL APIs
- Add user authentication with Cognito
- Deploy serverless containers using Lambda container images and App Runner
- Migrate existing apps to a serverless architecture
- All with Infrastructure as code

Through hands-on projects and real-world examples, you’ll gain the practical skills to build, deploy, and manage production-ready web applications using AWS serverless technologies.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing
1. To use these exercise files, you must have the following installed:
- Create an AWS account, if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
- AWS CLI installed and configured
- GitHub account and Git Installed
- NodeJS installed
- Docker installed

    All the requirements are listed in the introduction section of this course.


2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.

## Instructor

**Marcia Villalba** Principal Developer Advocate, Amazon Web Services

Developer and content creator passionate about cloud computing and serverless. She has been helping developers build scalable and distributed applications with technical content crafted to empower them. Find the resources you need to learn and stay ahead in modern cloud computing on this site.


[Instructor Website](marcia.dev)

[Other courses by the instructor](https://www.linkedin.com/learning/instructors/marcia-villalba)

[GitHub profile](https://github.com/mavi888)
                            

[0]: # (Replace these placeholder URLs with actual course URLs)

[lil-course-url]: https://www.linkedin.com/learning/
[lil-thumbnail-url]: https://media.licdn.com/dms/image/v2/D4E0DAQG0eDHsyOSqTA/learning-public-crop_675_1200/B4EZVdqqdwHUAY-/0/1741033220778?e=2147483647&v=beta&t=FxUDo6FA8W8CiFROwqfZKL_mzQhYx9loYLfjN-LNjgA

