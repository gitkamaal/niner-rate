# Niner Rate

## Table of Contents:

1. [Niner Rate](#niner-rate)
2. [Screenshots Overview](#screenshots-overview)
3. [Project Overview](#project-overview)
4. [Key Features](#key-features)
5. [UML Behavioral Diagrams](#uml-behavioral-diagrams)
   - [Behavioral Diagram](#behavioral-diagram)
   - [Use Case Diagram](#use-case-diagram)
6. [Design Documentation](#design-documentation)
   - [Architectural Overview](#architectural-overview)
   - [Subsystem Architecture](#subsystem-architecture)
   - [Deployment Architecture](#deployment-architecture)
   - [Persistent Data Storage](#persistent-data-storage)
   - [Global Control Flow](#global-control-flow)
   - [Time Dependency](#time-dependency)
   - [Concurrency](#concurrency)
   - [Detailed System Design Static View](#detailed-system-design-static-view)
   - [Detailed System Design Dynamic View](#detailed-system-design-dynamic-view)
7. [Developed Using](#developed-using)
8. [Deployment](#deployment)
9. [Contributors](#contributors)

## Screenshots Overview:

| Home Page                                                                                                      |
| -------------------------------------------------------------------------------------------------------------- |
| [![Home Page](src/assets/readme-imgs/apps-imgs/home-page.JPG)](src/assets/readme-imgs/apps-imgs/home-page.JPG) |

| Home Page Search                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------- |
| [![Home Page Search](src/assets/readme-imgs/apps-imgs/home-page-search.JPG)](src/assets/readme-imgs/apps-imgs/home-page-search.JPG) |

| Nav Bar Search                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------- |
| [![Nav Bar Search](src/assets/readme-imgs/apps-imgs/nav-bar-search.JPG)](src/assets/readme-imgs/apps-imgs/nav-bar-search.JPG) |

| Courses                                                                                                  |
| -------------------------------------------------------------------------------------------------------- |
| [![Courses](src/assets/readme-imgs/apps-imgs/courses.JPG)](src/assets/readme-imgs/apps-imgs/courses.JPG) |

| Course Datail                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------- |
| [![Course Detail](src/assets/readme-imgs/apps-imgs/course-detail.JPG)](src/assets/readme-imgs/apps-imgs/course-detail.JPG) |

| Login                                                                                              |
| -------------------------------------------------------------------------------------------------- |
| [![Login](src/assets/readme-imgs/apps-imgs/login.JPG)](src/assets/readme-imgs/apps-imgs/login.JPG) |

| Profile                                                                                                  |
| -------------------------------------------------------------------------------------------------------- |
| [![Profile](src/assets/readme-imgs/apps-imgs/profile.JPG)](src/assets/readme-imgs/apps-imgs/profile.JPG) |

| Instructors                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- |
| [![Review](src/assets/readme-imgs/apps-imgs/instructors.JPG)](src/assets/readme-imgs/apps-imgs/instructors.JPG) |

| Review                                                                                                |
| ----------------------------------------------------------------------------------------------------- |
| [![Review](src/assets/readme-imgs/apps-imgs/review.JPG)](src/assets/readme-imgs/apps-imgs/review.JPG) |

## Project Overview:

Niner Rate is a fullstack web application designed as a sophisticated course rating system specifically for UNC Charlotte students. The platform's primary goal is to empower students with insightful information by allowing them to rate and review courses based on various criteria. Students can provide detailed feedback on course materials, teaching methodologies, and class structures. By promoting transparency in teaching styles, the application equips students with essential knowledge to navigate their academic journey effectively and prepare for their professional careers. It addresses the common issue of students enrolling in courses without a clear understanding of what to expect, thereby helping them avoid potential regrets.

Through Niner Rate, students can create, modify, and delete their reviews as needed, ensuring that feedback remains relevant and up-to-date. Additionally, the platform offers a comprehensive overview of ratings for courses offered by the College of Computing and Informatics (CCI), providing valuable insights into the educational landscape within the CCI domain. Ultimately, Niner Rate serves as a valuable resource for students seeking to make informed decisions and optimize their learning experiences.

This application stands as the capstone project for the ITSC 4155 Software Development Projects course at UNC Charlotte.

## Key Features:

`Course Rating System`: Users can rate courses based on various criteria such as course materials, teaching methodologies, and class structures. This feature provides valuable insights into the quality of courses offered at UNC Charlotte.

`Instructor Rating System`: Students can rate instructors based on their teaching effectiveness, communication skills, and overall engagement. This feature helps students make informed decisions when selecting courses.

`User Reviews`: Users can write detailed reviews sharing their experiences with specific courses and instructors. These reviews contribute to a transparent and informative platform for students.

`Dynamic Content`: The app provides real-time updates on course and instructor ratings, ensuring that users have access to the latest information.

`User Authentication`: Integration with Google Auth API allows only UNC Charlotte students to sign in and use the app, ensuring the authenticity of user-generated content.

`Customizable Profiles`: Users can customize their profiles, editing their first and last name.

`Search and Filter`: Users can search for courses by course code and name. Advanced filtering options help users find relevant information quickly.

`Modular Architecture`: The app is built using Component-Based Architecture (CBA), ensuring modularity, scalability, and maintainability for future development and enhancements.

`Continuous Deployment`: Deployment on AWS Amplify enables continuous integration and deployment, allowing for quick and seamless updates to the app without downtime.

## UML Behavioral Diagrams:

#### Behavioral Diagram:

<div align="center">
    <img src="/src/assets/readme-imgs/diagrams-imgs/behavioral-diagram.JPG" alt="Behavioral Diagram" width="400" height="auto">
</div>

#### Use Case Diagram:

<div align="center">
    <img src="/src/assets/readme-imgs/diagrams-imgs/use-case-diagram.JPG" alt="Use Case Diagram" width="600">
</div>

## Design Documentation:

#### Architectural Overview:

Niner Rate, being a Next.js application, was purposefully designed using Component-Based Architecture (CBA). This architectural approach offers several advantages, including heightened modularity, scalability, flexibility, maintainability, and developer productivity, all of which are crucial for building a robust and adaptable Next.js application like Niner Rate. By leveraging CBA, we aimed to ensure that our application architecture aligns with Next.js best practices while also facilitating seamless development and maintenance workflows. Additionally, our decision to adopt CBA reflects our commitment to exploring and mastering modern development methodologies within the context of Next.js applications. Thus, as a team, we unanimously selected CBA as the architectural foundation for Niner Rate to optimize its performance, extensibility, and long-term viability.

#### Subsystem Architecture:

[![Subsystem-Architecture](src/assets/readme-imgs/architecture-design-imgs/subsystem-architecture.jpg)](src/assets/readme-imgs/architecture-design-imgs/subsystem-architecture.jpg)

#### Deployment Architecture:

- Frontend Hosting on AWS Amplify:

  - AWS Amplify hosts the frontend of your Next.js app, serving static src/assets such as CSS (including Tailwind CSS), JavaScript (including TypeScript), and media files to users.
  - Continuous Deployment: Amplify automatically builds and deploys changes to the frontend triggered by commits to your repository, ensuring seamless updates.

- Backend Functions (Serverless) on AWS Amplify:

  - Amplify provides serverless backend functions for handling dynamic logic and interacting with MongoDB Atlas.
  - Backend functions are written in TypeScript and executed on-demand in response to API requests from the frontend.

- API Gateway Integration:

  - AWS Amplify integrates with Amazon API Gateway to manage RESTful APIs and expose backend functions securely to the frontend.
  - API Gateway routes incoming requests to the corresponding backend functions, enabling CRUD operations on class courses, professors, and course reviews.

- Database Integration with MongoDB Atlas:

  - MongoDB Atlas serves as the cloud-based database for storing class courses, professor details, and course reviews.
  - Amplify backend functions connect securely to MongoDB Atlas using credentials and interact with the database using the MongoDB Node.js driver.

- Authentication with Google Auth API:

  - Google Auth API is used for authentication and authorization.
  - UNCC students authenticate using their Google accounts, ensuring only authorized users can access the app.
  - Upon successful authentication, users receive a token allowing access to protected routes and resources.

- Authorization and User Management:

  - Amplify functions verify tokens issued by Google Auth API to authorize access to protected routes and resources.
  - User management, including role-based access control (if needed), can be handled within the application logic.

#### Persistent Data Storage:

For persistent data storage in our project, we utilize MongoDB Atlas, a fully managed cloud database service. MongoDB Atlas offers a flexible and scalable solution for storing and querying data in a NoSQL document format.

###### Courses Collection/Table:

[![Courses Collection](src/assets/readme-imgs/db-imgs/courses-collection.png)](src/assets/readme-imgs/db-imgs/courses-collection.png)

- \_id: Unique identifier assigned to the course record in the database.
- code: Course code representing the course, in this case, "ITSC 1212".
- title: Title of the course, which is "Introduction to Computer Science I".
- courseDescription: A brief description of the course content and objectives. In this case, it introduces basic computer literacy, computational thinking, and problem-solving skills.
- unccCatalogID: Catalog ID assigned by UNC Charlotte, which may be used for administrative purposes.
- unccCourseID: Course ID assigned by UNC Charlotte, serving as a unique identifier for the course within the university's system.

###### Instructors Collection/Table:

[![Instructors Collection](src/assets/readme-imgs/db-imgs/instructors-collection.png)](src/assets/readme-imgs/db-imgs/courses-collection.png)

- \_id: Unique identifier for each instructor
- name: Name of the instructor
- title: Title of the instructor
- department: Department of the instructor
- phone: Phone number of the instructor
- email: Email address of the instructor
- office: Office location of the instructor
- rateMyProfessorsId: RateMyProfessors ID for the instructor

###### Reviews Collection/Table:

[![Reviews Collection](src/assets/readme-imgs/db-imgs/reviews-collection.JPG)](src/assets/readme-imgs/db-imgs/reviews-collection.JPG)

- \_id: Unique identifier assigned to the review record in the database.
- courseName: Name and code of the course being reviewed, in this case, "ITCS 3112 Design & Implementation of Object-Oriented System".
- rating: Numeric rating given by the student for the course, where 5 indicates the highest rating.
- studentName: Name of the student who provided the review.
- review: Feedback or comments provided by the student about the course, in this case, "Fun class!".
- createdAt: Timestamp indicating the date and time when the review was created, which is "2024-04-10T11:12:54.888+00:00".

###### Users Collection/Table:

[![Reviews Collection](src/assets/readme-imgs/db-imgs/users-collection.JPG)](src/assets/readme-imgs/db-imgs/users-collection.JPG)

- \_id: Unique identifier assigned to the user record in the database.
- email: Email address associated with the user's account, which is "_____@uncc.edu".
- firstName: First name of the user, in this case, "Bob".
- lastName: Last name of the user, in this case, "Doe".
- image: URL pointing to the user's profile image, which is "https://lh3.googleusercontent.com/a/______________".
- userId: Unique identifier associated with the user's account, which is "**\*\***\_\_**\*\***".
- savedCourses: An array containing the courses saved by the user. In this case, it contains one course: "ITSC 3155".

#### Global Control Flow:

NinerRate operates as an event-driven system, specifically tailored for the unique context of a university course review platform intended for UNC Charlotte students. While it offers a structured navigation path (home page, search, browse, login, review submission), the system does not enforce a linear, procedural workflow on its users. Instead, actions within NinerRate are triggered by user events such as logging in, searching for courses or instructors, and submitting reviews. This event-driven approach ensures a flexible and user-centric experience, accommodating the varied needs and preferences of UNCC students.

#### Time Dependency:

Our system incorporates time-dependent features, albeit not in the strict sense of a real-time system. Time-sensitive operations, such as session timeouts for logged-in users and periodic updates to course ratings based on new reviews, are implemented to enhance usability and data integrity. These operations are not real-time but are designed to execute within acceptable time frames that ensure a seamless user experience and up-to-date information display.

#### Concurrency:

Given the single-processor deployment architecture of NinerRate, our approach to concurrency is managed at the application level rather than through multi-threading at the system level. The Next.js framework, complemented by the MongoDB Atlas database, handles concurrent user actions (e.g., multiple users accessing course reviews, submitting reviews, or browsing instructor profiles simultaneously) efficiently. This is achieved through asynchronous I/O operations and event-loop management inherent in the Node.js environment, ensuring that the application remains responsive and scalable under varying loads.

Through the use of Component-Based Architecture, NinerRate ensures modularity and ease of component reuse, facilitating efficient handling of concurrent user interactions within the constraints of a single-processor system. Components such as user authentication (via NextAuth), course and instructor data retrieval, and review submission are designed to operate independently and seamlessly integrate, providing a robust and efficient user experience.

#### Detailed System Design Static View:

[![Detailed System Design - Static view ](src/assets/readme-imgs/detailed-system-design/static-view.jpg)](src/assets/readme-imgs/detailed-system-design/static-view.jpg)

#### Detailed System Design Dynamic View:

[![Detailed System Design - Dynamic view ](src/assets/readme-imgs/detailed-system-design/dynamic-view.jpg)](src/assets/readme-imgs/detailed-system-design/dynamic-view.jpg)

## Developed Using:

![Next.js]
![NextAuth.js]
![React]
![React DOM]
![React Radix UI]
![react-icons]
![React OAuth Google]
![react-google-button]
![TypeScript]
![JavaScript]
![Node.js]
![Tailwind CSS]
![tailwind-merge]
![tailwindcss-animate]
![PostCSS]
![CSS]
![MongoDB]
![Mongoose]
![Autoprefixer]

## Deployment:

The project has been deployed using [AWS Amplify](https://aws.amazon.com/amplify/) . You can access Niner Rate [here](https://main.d3f94s6am880j3.amplifyapp.com/).

## Contributors:

Oliver Briot, Kamaal Hassan, Willy Xiong, Txuj Yang, Jai Vang

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[NextAuth.js]: https://img.shields.io/badge/-NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[React]: https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React DOM]: https://img.shields.io/badge/-React_DOM-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React Radix UI]: https://img.shields.io/badge/-React_Radix_UI-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React OAuth Google]: https://img.shields.io/badge/-React_OAuth_Google-61DAFB?style=for-the-badge&logo=google&logoColor=white
[react-google-button]: https://img.shields.io/badge/-react_google_button-61DAFB?style=for-the-badge&logo=google&logoColor=white
[react-icons]: https://img.shields.io/badge/-react_icons-61DAFB?style=for-the-badge&logo=react&logoColor=white
[TypeScript]: https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[JavaScript]: https://img.shields.io/badge/-JavaScript-yellow?style=for-the-badge&logo=javascript
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Tailwind CSS]: https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-merge]: https://img.shields.io/badge/-tailwind_merge-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-animate]: https://img.shields.io/badge/-tailwindcss_animate-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[PostCSS]: https://img.shields.io/badge/-PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white
[CSS]: https://img.shields.io/badge/-CSS-blue?style=for-the-badge&logo=css3
[MongoDB]: https://img.shields.io/badge/MongoDB-F5F7FA?style=for-the-badge&logo=mongodb&logoColor=6BA242
[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=FFFFFF
[Autoprefixer]: https://img.shields.io/badge/-Autoprefixer-DD3A0A?style=for-the-badge&logo=autoprefixer&logoColor=white
