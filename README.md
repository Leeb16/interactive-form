# interactive-form
Module 3 Project

This application uses javascript to enhance an interactive registration form for a fictional Full Stack conference. It contains code that validates any errors in the name and email fields in real time and displays an error message when triggered.

Extra Credit Features:


Real time error message

see js/script.js line 140
added a listener for input in the "Name" field
when 'nameField' constant is detected its run the validator function 'nameValidation' and applies the error notifcation.

see js/script.js line 157
added a listener for input in the "Email" field
when 'emailField' constant is detected its run the validator function 'emailValidation' and applies the error notifcation.


Conditional error message

see js/script.js line 233
error message for "Email" field (index.html line 35) set by function
function is called inside the email validation helper function on line 126
function tests if the text content of the email input field is blank and sets error text accordingly
