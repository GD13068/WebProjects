## Introduction

The purpose of this exercise is to introduce you to the styling libraries, specifically Bootstrap but also other styling libraries that exist on the internet.

For this exercise, you may be asked to answer questions and/or write some code.  Provide complete answers to all written questions:  When asked for examples, be specific.  Submit your answers in a document separate from code.

Work on the assignment is to be done with ***your assigned group***.  You are welcome to collaborate with class members, but the submitted assignment must be the work of only your group.

## Background and References

While writing our own CSS style for all elements in our web applications can be fun and allows us to put our own 'mark' on our art work.  Each individual CSS statement and styling can get rather tedious.  As such, developers have created styling libraries that consist of CSS and/or JavaScript to create styling along with 'Components' with behaviors beyond what is provided through HTML structure alone.

Bootstrap is web application toolkit for creating 'responsive' web pages.  It consists of:

- CSS for styling elements including fonts, spacing, colors, etc. though CSS classes
- Components - elements created through CSS and JavaScript to provide user interface items beyond what is available in HTML
- Utilities - CSS classes and JavaScript functions for managing layout, validation, animation, among others.

The full documentation for Bootstrap can be found on their website: [https://getbootstrap.com/](https://getbootstrap.com/).

In this activity you will experiment with different components and formatting options available in the Bootstrap library along with another of your choice.

## Installation and setup

The Bootstrap library can either be used by direct download or imported via a content delivery network (CDN).  A CDN is a way to provide external libraries to web applications without requiring the application to download and host the library itself.

Importing from a CDN requires adding a couple lines to our HTML header.  The following HTML imports the Bootstrap CDN.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Bootstrap Exercise</title>

        <!-- Include the Bootstrap library -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </head>
</html>
```

Bootstrap consists of two files so make sure you have them both listed:

- Bootstrap CSS - styling for the Bootstrap components
- Bootstrap JavaScript - code to manage the behavior of the components

## Content Delivery Networks

Content delivery networks (CDN)s can be a useful tool for web developers as it allows the deployed web application to be small and not include copies of third party libraries.  However, when using anything directly from the web (via an external link/url) raises security concerns. 

- Research CDNs from a general sense.  What are some (at least 2) security concerns that you have in regard to using CDNs?
- Research the ```link``` and ```script``` HTML tags
  - Describe the ```integrity``` attribute and the ```crossorigin``` attribute used to include the Bootstrap library via CDN.
  - What security concern(s) to these attributes attempt to fix?  Explain how this works.

## W3Schools Tutorial and Exercises

Complete the following Bootstrap exercise sections and read through their corresponding tutorials from W3Schools [https://www.w3schools.com/bootstrap5/exercise.php](https://www.w3schools.com/bootstrap5/exercise.php):

- BS5 Typography
    - [https://www.w3schools.com/bootstrap5/bootstrap_typography.php](https://www.w3schools.com/bootstrap5/bootstrap_typography.php)
    - [https://getbootstrap.com/docs/5.2/content/typography/](https://getbootstrap.com/docs/5.2/content/typography/)
- BS5 Tables
    - [https://www.w3schools.com/bootstrap5/bootstrap_tables.php](https://www.w3schools.com/bootstrap5/bootstrap_tables.php)
    - [https://getbootstrap.com/docs/5.2/content/tables/](https://getbootstrap.com/docs/5.2/content/tables/)
- BS5 Buttons
    - [https://www.w3schools.com/bootstrap5/bootstrap_buttons.php](https://www.w3schools.com/bootstrap5/bootstrap_buttons.php)
    - [https://getbootstrap.com/docs/5.2/components/buttons/](https://getbootstrap.com/docs/5.2/components/buttons/)
- Choose and complete **5** other exercise sections that you find interesting.

Create a screen capture showing that you have completed the W3Schools exercises.  Include this screen capture in your submission.

## Bootstrap Forms

Getting input from a user is a common requirement in a web application.  Often this is done via input forms.  Boostrap provides multiple form components as well as logic for performing form validation.

Read through the W3Schools tutorial on Bootstrap forms: [https://www.w3schools.com/bootstrap5/bootstrap_forms.php](https://www.w3schools.com/bootstrap5/bootstrap_forms.php).

Make sure you read through all the subsections:

- BS5 Forms
- BS5 Select Menus
- BS5 Checks and Radios
- BS5 Range
- BS5 Input Groups
- BS5 Floating Labels
- BS5 Form Validation

Full documentation on Bootstrap forms can be found on the Bootstrap documentation website: [https://getbootstrap.com/docs/5.3/forms/overview/](https://getbootstrap.com/docs/5.3/forms/overview/)

Using what you learned from the tutorial, official documentation, and previous labs, create a Bootstrap form that asks for user information.  The form must contain the following fields:

- First name - text, required
- Last name - text, required
- Email - email, required
- Date of Birth - date, required
- Favorite Element of Web Development - radio selector, must include the following options
    - HTML
    - CSS
    - JavaScript
- Submit Button

Use ```form-control```, ```form-group```, ```form-label```, and other Bootstrap classes as appropriate.

The submit button must be formatted as a Bootstrap button (choose any Bootstrap button style).  When the user clicks on the button, the form must be validated and errors shown using the Bootstrap formatting.  Bootstrap has validation built in so this may or may not require an additional JavaScript file depending on how you implement your form.  You are welcome to create a separate JavaScript file if you'd like, but this is not required if you can perform all input validation directly with Bootstrap.

The specific positioning of elements is up to you, just make sure you include all the required components and behavior.  Additional styling via custom CSS is optional.  If you do choose to use additional styling, make sure you include this in a separate ```.css``` file.

***CHALLENGE:*** Looking for a challenge?  Try laying out your form components using a Bootstrap grid.  You can find information on using forms with a grid in the Bootstrap documentation: [https://getbootstrap.com/docs/5.3/forms/layout/](https://getbootstrap.com/docs/5.3/forms/layout/)

Include your HTML, JavaScript (if using), and CSS file(s) (if using) in the submission.

### Getting Started

The following files have been provided for you in your repository:

- [src/bootstrap_forms.html](src/bootstrap_forms.html) - HTML file that includes the Bootstrap library.  Use this as a starter for your forms page.

***NOTE:*** Include additional JS and CSS file(s) if needed.  At the top of ***EACH SOURCE FILE*** include a comment block with your name, assignment name, and section number.

## Other Styling Libraries

While Bootstrap is arguably one of the more popular styling and component libraries on the web, there are others that are building in popularity.  Here are some:

- Tailwind - [https://tailwindcss.com/](https://tailwindcss.com/)
- Animate.css - [https://animate.style/](https://animate.style/)
- Semantic UI - [https://semantic-ui.com/](https://semantic-ui.com/)
- Skeleton - [http://getskeleton.com/](http://getskeleton.com/)
- Milligram - [https://milligram.io/](https://milligram.io/)

Research CSS styling libraries and find one that interests you

- Describe how to install the library (CDN or direct download)
  - NOTE: several third party libraries utilize a tool called ```npm``` (the Node.js Package Manager).  We will learn about that later in the term.
  - For now, use only CDN or direct download
- Research and learn about the components and/or other styling the library provides
  - Find *5* separate components that you find interesting and describe how to use them the library you chose
  - Create a web application (HTML, CSS, and anything else needed by the library) that uses all *5* components

Include your research, descriptions, and created web application in your submission.

## Deliverables

When you are ready to submit your assignment prepare your repository:

- Make sure your name, assignment name, and section number are in comments on ALL HTML, CSS, and JS file(s).
- Make sure you have completed all activities and answered all questions.
- Make sure you cite your sources for all research.
- Make sure your assignment code is commented thoroughly.
- Include in your submission, a set of suggestions for improvement and/or what you enjoyed about this assignment.
- Make sure all files are committed and pushed to the main branch of your repository.

***NOTE***: Do not forget to 'add', 'commit', and 'push' all new files and changes to your repository before submitting.

### Additional Submission Notes

If/when using resources from material outside what was presented in class (e.g., Google search, Stack Overflow, etc.) document the resource used in your submission.  Include exact URLs for web pages where appropriate.

NOTE: Sources that are not original research and/or unreliable sources are not to be used.  For example:

- Wikipedia is not a reliable source, nor does it present original research: [https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_is_not_a_reliable_source](https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_is_not_a_reliable_source)
- ChatGPT is not a reliable source: [https://thecodebytes.com/is-chatgpt-reliable-heres-why-its-not/](https://thecodebytes.com/is-chatgpt-reliable-heres-why-its-not/)

For more information, please see the [MSOE CS Code of Conduct](https://msoe.s3.amazonaws.com/files/resources/swecsc-computing-code-of-conduct.pdf).

To submit, copy the URL for your repository and submit the link to Canvas.

## Grading Criteria

- (5 Points) Submitted files follow submission guidelines
  - Only the requested files were submitted
  - Files are contain name, assignment, section
  - Sources outside of course material are cited
- (5 Points) Suggestions
  - List of suggestions for improvement and/or what you enjoyed about this assignment
- (10 Points) Code Structure
  - Readable code/file structure
  - Code is well documented
  - Code passes the HTML validator without errors
  - Code passes the CSS validator without errors
- (15 Points) Content Delivery Networks Exercise
- (15 Points) BootStrap W3Schools Exercises
- (30 Points) BootStrap Forms Exercises
  - Forms are properly formatted
  - Validation of form data is correct
- (20 Points) Other Styling Libraries Exercise
