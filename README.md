# user-registration-system
User Registration System created with Vue and Vuetify by Eric Joseph P. Flores for Appetiser Apps

### Heroku URL ### 
The web app is deployed at https://u-reg.herokuapp.com/

### Project setup
1. Run ```npm install``` to install the dependencies for the frontend vue app
2. Run ```npm run start``` to fire up the app (default port is 8080)
3. To create build files, run ```npm run build```

### Features Implemented
1. Login and Saving of user session via localStorage 
2. Registration of new users
3. Verification of new users
4. Deletion of user account
5. User logout
6. Retrieving of user details on Home page

### Project Description
U-Reg is a user registration system created with Vue by Eric Joseph P. Flores for Appetiser Apps. Vue is the main front-end framework used with Vuetify CSS framework to achieve the material design look. Vuex was used for state management and Vue Router was used for navigation and authentication. The app contains 4 pages: Login, Register, Verify, and Home. New users should signup and input the required details in the Register Page. They will be redirected to the Verify page if successful. The verification code "00000" was hard-coded to make the verification feature functional. The user will be redirected to the Home page displaying a success message to indicate that user has logged in and verified his/her account. The user can choose to logout and will be returned to the login page. There is also a delete account feature present in the home page. The user can delete his/her account by clicking the "Delete Account" button which will show a dialog box where the user should input his/her password to be verified for deletion. After deletion, the user is redirected back to the login page. The app uses local storage to keep track of user session. If a session is still active, users will be redirected to the home page if they visit the Login or Register page. Verified users will be redirected to the Home page. Returning users who haven't verified their account will be redirected to the Verify page. A 404 page will be displayed once the user visits an unregistered route in the app.


