# projectOne
“CHEF NOW” – REQUIREMENTS, SPECIFICATIONS & DESIGN

Project Title: Chef Now

Team Members: Group 5!
•	Seth Griggs
•	Dennis Markham
•	Joseph Riviera
•	Venkat Venkataraman

Team Responsibility: Frontend: Seth & Joseph / Backend: Dennis & Venkat.

Project description: This app takes in user response of what ingredients they would like to cook with and/or is available to them. The EDAMAM API takes in ingredients and shows a list of recipes that would work for said ingredients and in a particular type of cuisine if possible. Then once you select a recipe, the API provides info on how to prepare (through a recipe link), other ingredients needed, and a picture of the preparation. A google maps API shows where the ingredients may be purchased.

Product Sketch: Coming Soon.

Front-end User Interface Requirements:

•	User sign-up and authentication for access to certain features

•	List of ingredients

•	User preferences:
    o	Peanut free
    o	Vegetarian
    o	Low-fat
    o	Gluten-free?

•	Card design for each recipe  
o	Main Card
    o	Recipe Image
    o	Recipe Link
    o	“Like” Button
    o	Access to list of ingredients for preparing recipe
o	Back card:
    o   List of ingredients for preparing recipe

•	Google maps interface for showing where recipe ingredients may be purchased


Back-end (Database) Requirements:
•	Firebase needs to store “liked” recipes, by user name for retrieval.
•	Firebase should authenticate the user for saving and retrieving “liked”           recipes.

EDAMAM API Query:
•	10 recipe retrievals for each request
    o	Name of recipe
    o	URL to website with recipe 
    o	Image
    o	Ingredients

Variables and Buttons for front-end & back-end (Firebase) database handshake

    Variables:
    •	recipeName
    •	recipeImage
    •	recipeIngredients
    •	recipeLink

    Buttons:
    •	Login/SignUp/Logout – for authentication with Firebase
    •	Saved Recipes – to retrieve “liked” recipes
    •	Save Liked Recipe – to save a recipe to Firebase

    Coding Requirements & Current Fit:
    •	Must use at least two APIs – Yes, EDAMAM API and Google Maps
    •	Must use AJAX to pull data - Yes
    •	Must utilize at least one new library or technology that we haven’t           discussed
    •	Must have a polished frontend / UI - Yes
    •	Must meet good quality coding standards (indentation, scoping, naming) -      Yes
    •	Must NOT use alerts, confirms, or prompts (look into modals!) – Yes,          using modals!
    •	Must have some sort of repeating element (table, columns, etc) – Yes,         recipe cards
    •	Must use Bootstrap or Alternative CSS Framework – Yes, Materializecss
    •	Must be Deployed (Heroku or Firebase) – Yes, Firebase and GitHub
    •	Must have User Input Validation – Yes, like valid e-mail

    Coding (Nice to haves) & Current Fit:
    •	Utilize Firebase for Persistent Data Storage (Consider this basically a       requirement) - Yes
    •	Mobile Responsive - ?Need to check
    •	Use an alternative CSS framework like Materialize – Yes, Materialize

Future Enhancement Possibilities:
•	Other potential items but decided not to include for now:
        o	X Calorie ranges
        o	X Health Labels
        o	X Cuisine?
•	Get ingredients from user and store them (in Firebase – i.e., it is persistent across sessions).
•	Get cuisine(s) preference from user.
•	Get the time the user has to spend on preparing the dish.
•	Narrow the search results from EDAMAM and rank them:
    o	based on available ingredient list.
    o	based on selected cuisine.
•	Pull up videos of recipes from YouTube (if they are not available on EDAMAM).

Sample EDAMAM API Search Response Format Documentation: 
See  https://developer.edamam.com/edamam-docs-recipe-api
