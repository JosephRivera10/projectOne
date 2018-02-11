// Initialize Firebase
var config = {
  apiKey: "AIzaSyACIqiC8tclKuUiaLB6cawQdHzYZCqn16E",
  authDomain: "chefnow-80b6b.firebaseapp.com",
  databaseURL: "https://chefnow-80b6b.firebaseio.com",
  projectId: "chefnow-80b6b",
  storageBucket: "",
  messagingSenderId: "224671396675"
};
firebase.initializeApp(config);
var database = firebase.database();
var userName="";

//Firebase Authentication Code STARTS Here
document.addEventListener("DOMContentLoaded",function(event){
    (function() {
      //Get elements
      const txtEmail = document.getElementById("txtEmail");
      const txtPassword = document.getElementById("txtPassword");
      const btnLogin = document.getElementById("btnLogin");
      const btnSignUp = document.getElementById("btnSignUp");
      const btnLogout = document.getElementById("btnLogout");
    //EVENTS BELOW USE THE FOLLOWING (FIREBASE AUTHENTICATION?) FUNCTIONS
      // const auth = firebase.auth();
      // auth.signInWithEmailAndPassword(email, pass);
      // auth.createUserWithEmailAndPassword(email, pass);
      // auth.onAuthStateChanged(firebaseUser => { });
      //Add login event
      btnLogin.addEventListener('click', e => {
        //Get  email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message + " Please sign up!"));
      });
      //Add signup event
      btnSignUp.addEventListener('click', e => {
        //Get  email and pass
        //TO DO: CHECK FOR REAL EMAIL
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
      });
      btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
      });
      //Add a realtime listener
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          btnLogout.classList.remove("hide");
        } else {
          console.log('not logged in');
          btnLogout.classList.add("hide");
        }
      });
    }());
}); 
//Firebase Authentication Code ENDS Here

//Code to Add Favorite Items to the Firebase Database STARTS Here

// Tests to check if user has already added the Recipe to the Database 
function checkIfFavRecipeExistsAndAdd(userName,userFavRecipe, likedRecipeTitle) {
  database.ref().child(userName).once("value", function(snapshot) {
    var recipeAlreadyExists = false;
    console.log("snapshot  value");
    console.log(snapshot.val());
    var currentSnap = snapshot.val();
    for (var key in currentSnap) {
      if (currentSnap[key].recipeName === likedRecipeTitle) {
        recipeAlreadyExists = true;
      }
    }
    if (recipeAlreadyExists === false) {
      var recipeRef = database.ref().child(userName);
      recipeRef.push(userFavRecipe);
    } else {
      console.log("Recipe already exists in the database; please pick another");
    }
  });
}

$(document).on("click", '#saveLikedRecipe', function(event) {
  event.preventDefault();
  console.log($(this).parent().parent().parent().parent().parent());
  var whichCardDiv = $(this).parent().parent().parent().parent().parent();
  var likedRecipeTitle = whichCardDiv[0].childNodes[1].childNodes[0].firstChild.data;
  var likedRecipeImageLink = whichCardDiv[0].childNodes[0].childNodes[0].currentSrc;
  var likedRecipeLink = whichCardDiv[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].href;
  var likedRecipeIngredients = [];
  for (let index = 0; index < (whichCardDiv[0].children[2].childNodes[0].children.length); index++) {
    likedRecipeIngredients[index]=whichCardDiv[0].children[2].childNodes[0].children[index].innerText;
  };
  console.log(likedRecipeTitle, likedRecipeImageLink,likedRecipeLink, likedRecipeIngredients);
  userName = firebase.auth().currentUser.email.split("@")[0];
  console.log(userName);
  var userFavRecipe = {
     recipeName: likedRecipeTitle,
     recipeImage: likedRecipeImageLink,
     recipeLink: likedRecipeLink,
     recipeIngredients: likedRecipeIngredients
  };
  // Save userFavRecipe to the firebase database if it does not exist already
  checkIfFavRecipeExistsAndAdd(userName,userFavRecipe, likedRecipeTitle);
});

//Code to Add Favorite Items to the Firebase Database ENDS Here

//Code to Retrieve Saved Favorite Items from the Firebase Database STARTS Here

function retrieveSavedRecipes (arrayOfSavedRecipes) {
  userName = firebase.auth().currentUser.email.split("@")[0];
  database.ref().child(userName).once("value", function(snapshot) {
      console.log("snapshot  value");
      console.log(snapshot.val());
      // var arrayOfSavedRecipes = [];
      var currentSnap = snapshot.val();
      for (var key in currentSnap) {
        var userFavRecipe = {
          recipeName: "",
          recipeImage: "",
          recipeLink: "",
          recipeIngredients: [],
        };
        userFavRecipe.recipeName = currentSnap[key].recipeName;
        userFavRecipe.recipeImage = currentSnap[key].recipeImage;
        userFavRecipe.recipeLink = currentSnap[key].recipeLink;
        userFavRecipe.recipeIngredients = currentSnap[key].recipeIngredients;
        // console.log(userFavRecipe);
        arrayOfSavedRecipes.push(userFavRecipe);
        console.log(arrayOfSavedRecipes);
      }
      console.log("Full array of saved recipes within function: ");
      console.log(arrayOfSavedRecipes);
      // displayArrayOfSavedRecipes(arrayOfSavedRecipe);
  });
}

//Code to test fire the retrieve function.

$(document).on("click", '#savedRecipe', function(event) {
  event.preventDefault();
  var arrayOfSavedRecipes = [];
  retrieveSavedRecipes (arrayOfSavedRecipes);
  console.log("Return from function: ");
  console.log(arrayOfSavedRecipes);
  // displayArrayOfSavedRecipes(arrayOfSavedRecipe);
});



//Code to Retrieve Saved Favorite Items from the Firebase Database ENDS Here