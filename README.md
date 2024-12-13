# Eat n Split

## Project Introduction

React app to split bills, track shared expenses in a group of friends easily and find out "Who owes whom and how much?" with a transaction minimisation algorithm.

### Executive Summary 
The invention of a secure web-based Application is important in protecting user data and ensuring a resilient online presence. This project focuses on building a secure web application that supports CRUD functions, with multiple users of different privileges and implementing security features. An online bill splitting application was developed for this project, this online bill splitting application helps when people go out together as friends to have a meal and in a case one doesn’t have the money to pay for their meal it can be easily paid by the other persons which they were accompanied by, the bill will be uploaded into the web application and it automatically generates the cost of what they owe one another equally with all transparency, The additions of note made to this application includes   implementation of the of security features, adding a structured query language database, parameterized queries to mitigate SQL injection, Password encryption through hashing and rate limiting against Brute force attack from unauthorized users .This application will come in very handy especially in the modern day to day life where people often go out as a group to eat and instead of making individual payments the payment could be done by just a person to save time of everyone and the bill will be split automatically and would be accessible to all users to login and see what they owe and who they owe effectively.   The application consists of the admin and user, giving the admin the ability to view and make change to the bill while the user is able to login, upload the bill and get it split amongst friends involved. Technologies such as Node JS and React were used in the development and implementation of this online bill splitting application.

The project enhancement was from an already existing public repository on GitHub, which allowed the authentication and authorization of users to be able to manage the eat and split bill web application paulthadev/eat-n-split: React app to split bills with your friends easily and find out "Who owes whom and how much? The notable contributions made to this project includes scanning the code for vulnerabilities, creating a safe architecture, implementing security features and carrying out tests, this modifications helped to improve the code.

## Features and Security Objectives 
This project has the following functionalities:
- The signUp page
- The login Page
- The Admin page
- The user page

  
The main security features implemented are as follows;
- Input Validation
- Data encryption via Hashed Passwords
- JWT Authentication
- Access control

## Project Structure 
they are 3 main folders in this project that contain necessary codes for running the application:
App.js: which is the root application where components are put together 
apiDatabase.js: This is the endpoint of the application
AdminViewPage.jsx: The details of the admin page 

## Setup and Installation instructions 

To get started with project just simply fork this repo or download locally on your System.

To get a local copy up and running follow these simple example steps.

### Prerequisites

Start with the latest version of NPM to avoid any errors:

- npm
  ```sh
  npm install npm@latest -g
  ```
  ### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/fadayopaul/sharefact.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

   ##  Security improvement
   parameterized queries to mitigate SQL injection, Password encryption through hashing, JWT tokens were generated for session management control and rate limiting against Brute force attack from unauthorized users

##  Testing
Testing is the method of determining whether a device or the functionality of its components meets the specified requirement and identifying any gaps, flaws, or requirements that are missing in order to produce an application.The functionality of the software was carried out using black box testing method.
The following tests were carried out :
1. Unit Testing: This is a low level test which is called component testing, the test is carried out to test if the source code of each component works normally. All units of the application had its individual test. 
2. Integrity Testing: This is the process to check the interaction between the front and backend to confirm that they work together properly
3. SAST test
   I made us of the bearer CLI tool found in the lecture note to conduct my SAST test and below is the result of the test                                                                                                                
┌──(daniel㉿kali)-[~]
└─$ bearer scan daniel-eat-and-split
Analyzing codebase
⠋  (33579/-) [0s] 
Loading rules
Scanning target daniel-eat-and-split
 └ 100% [===============] (24/24) [32s]      
Running Detectors                            
Generating dataflow
Evaluating rules
 └ 100% [===============] (237/237) [2s]   


Security Report

=====================================

Rules: 
https://docs.bearer.com/reference/rules [v0.46.5]

Language    Default Rules  Custom Rules  Files  
JavaScript  87             0             10     


CRITICAL: Usage of hard-coded secret [CWE-798]
https://docs.bearer.com/reference/rules/javascript_express_hardcoded_secret
To ignore this finding, run: bearer ignore add 81ef2b1dbfb72f13bad301c6c00958ea_0

File: daniel-eat-and-split/helpers/apiDatabase.js:142

 142     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
 143       expiresIn: "1h",
 144     });

CRITICAL: Leakage of hard-coded secret in JWT [CWE-798]
https://docs.bearer.com/reference/rules/javascript_lang_jwt_hardcoded_secret
To ignore this finding, run: bearer ignore add 372a20e31c334bba720df47b03d0d298_0
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:142
                                                                                                                   
 142     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
 143       expiresIn: "1h",
 144     });

HIGH: Unsanitized user input in format string [CWE-134]
https://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input
To ignore this finding, run: bearer ignore add 3e66fb0ddc4718d2a555e0602d731f04_0                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:132
                                                                                                                   
 132     console.log(password, user.password)

HIGH: Unsanitized user input in format string [CWE-134]
https://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input
To ignore this finding, run: bearer ignore add 3e66fb0ddc4718d2a555e0602d731f04_1                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:133
                                                                                                                   
 133     console.log(bcrypt.compare(password, user.password))

HIGH: Unsanitized user input in format string [CWE-134]
https://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input
To ignore this finding, run: bearer ignore add 3e66fb0ddc4718d2a555e0602d731f04_2                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:136
                                                                                                                   
 136     console.log(isPasswordValid)

HIGH: Leakage of sensitive data in JWT [CWE-312]
https://docs.bearer.com/reference/rules/javascript_lang_jwt
To ignore this finding, run: bearer ignore add e5ffb71d1efc856e0188a1d229bb090c_0                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:142
                                                                                                                   
 142     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
 143       expiresIn: "1h",
 144     });

MEDIUM: Missing Helmet configuration on HTTP headers [CWE-693]
https://docs.bearer.com/reference/rules/javascript_express_helmet_missing
To ignore this finding, run: bearer ignore add c014617cad560720dccfaa3036e650eb_0                                  
                                                                                                                   
File: daniel-eat-and-split/authentication/login.js:2
                                                                                                                   
 2 const app = express();

MEDIUM: Missing Helmet configuration on HTTP headers [CWE-693]
https://docs.bearer.com/reference/rules/javascript_express_helmet_missing
To ignore this finding, run: bearer ignore add a16d592d8c580521829f896c45522ca9_0                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:6
                                                                                                                   
 6 const app = express();

MEDIUM: Missing server configuration to reduce server fingerprinting [CWE-693]
https://docs.bearer.com/reference/rules/javascript_express_reduce_fingerprint
To ignore this finding, run: bearer ignore add e251c87d7b3bf8e5a5066279ef7229e5_0                                  
                                                                                                                   
File: daniel-eat-and-split/authentication/login.js:2
                                                                                                                   
 2 const app = express();

MEDIUM: Missing server configuration to reduce server fingerprinting [CWE-693]
https://docs.bearer.com/reference/rules/javascript_express_reduce_fingerprint
To ignore this finding, run: bearer ignore add d643a32db3b1761cf6249d4cd90d5d03_0                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:6
                                                                                                                   
 6 const app = express();

MEDIUM: Leakage of sensitive information in logger message [CWE-532]
https://docs.bearer.com/reference/rules/javascript_lang_logger
To ignore this finding, run: bearer ignore add 17f8c870b00fac3ca4c59075109e1874_0                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:132
                                                                                                                   
 132     console.log(password, user.password)

MEDIUM: Leakage of sensitive information in logger message [CWE-532]
https://docs.bearer.com/reference/rules/javascript_lang_logger
To ignore this finding, run: bearer ignore add 17f8c870b00fac3ca4c59075109e1874_1                                  
                                                                                                                   
File: daniel-eat-and-split/helpers/apiDatabase.js:133
                                                                                                                   
 133     console.log(bcrypt.compare(password, user.password))

## Contributions and References 
I made significant changes to this link https://github.com/paulthadev/eat-n-split/tree/main of an already exisiting Public GitHub Repository 

External libraries:
- [NPM](https://www.npmjs.com/)

The Frameworks used for this Project are React js for the root page, Node js for the endpoint and SQLite is used for the Database.
