# interactive-form
## Module 3 Project

This application uses javascript to enhance an interactive registration form for a fictional Full Stack conference. It contains code that validates any errors in the name and email fields in real time and displays an error message when triggered.

### Extra Credit Features:

Real time error messages

See js/script.js line 140
Added a listener for input in the "Name" field
When 'nameField' constant is detected it runs the validator function 'nameValidation' and applies the error notifcation.

See js/script.js line 164
Added a listener for input in the "Email" field
When 'emailField' constant is detected it runs the validator function 'emailValidation' and applies the error notifcation.


Conditional error message

See js/script.js line 144
Function created to give two different error messages in the email field.
The function detects whether the email field is empty and when the email is incorrectly formatted. Displaying different messages for each error.
