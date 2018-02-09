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
var databaseLocation = "https://console.firebase.google.com/project/chefnow-80b6b/database/chefnow-80b6b/data";
function favRecipeExistsCallback(userName, likedRecipeTitle, exists) {
  if (exists) {
    // console.log("User " + userName + ("'s ") + likedRecipeTitle + " already exists in saved data!");
  }
}
// Tests to see if userName has any data. 
function checkIfFavRecipeExists(userName,userFavRecipe, likedRecipeTitle) {
  // var usersRef = new firebase(databaseLocation);
  console.log("userNAme");
  console.log(userName);
  console.log("likedRecipeTitle");
  console.log(likedRecipeTitle);
  console.log("checifFav function fired");
  database.ref().child(userName).once("value", function(snapshot) {
    var recipeAlreadyExists = false;
    console.log("snapshot  value");
    console.log(snapshot.val());
    var currentSnap = snapshot.val();
    for (var key in currentSnap) {
      console.log("key")
      console.log(key);
      console.log("key");
      console.log("snapshot[key]");
      console.log(currentSnap[key].recipeName);
      console.log("snapshot[key]");
      if (currentSnap[key].recipeName === likedRecipeTitle) {
        recipeAlreadyExists = true;
      }
    
  }
  if (recipeAlreadyExists === false) {
    var recipeRef = database.ref().child(userName);
    recipeRef.push(userFavRecipe);
    
  } else {
  // alert("This recipe already exists in yoru database, please pick a recipe that is not already in your database");
}
    // var exists = (snapshot.val() !== null);
    // favRecipeExistsCallback(userName, likedRecipeTitle, exists);
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
  // //TODO: Look for and Delete any existing database items under userName
  // // database.ref().child(userName).remove();
  var userFavRecipe = {
     recipeName: likedRecipeTitle,
     recipeImage: likedRecipeImageLink,
     recipeLink: likedRecipeLink,
     recipeIngredients: likedRecipeIngredients
  };
  // Save userFavRecipe to the firebase database if it does not exist already
  checkIfFavRecipeExists(userName,userFavRecipe, likedRecipeTitle);
  // var recipeRef = database.ref().child(userName);
  // recipeRef.push(userFavRecipe);
});

// database.ref().on("child_added", function(childSnapshot, prevChildKey){

//   var recipeName = childSnapshot.val().userFavRecipe.recipeName;
//   var recipeImage = childSnapshot.val().userFavRecipe.recipeImage;
//   var recipeLink = childSnapshot.val().userFavRecipe.recipeLink;
//   var recipeIngredients = childSnapshot.val().userFavRecipe.recipeIngredients;
//   console.log(recipeName);
//   console.log(recipeImage);
//   console.log(recipeLink);
//   console.log(recipeIngredients);

//   $("#savedRecipe").on("click", function (){

//       var newCard = $("<div>").attr("id", "card" +i);
//       newCard.addClass("card");
//       newCard.addClass("small");
//       newCard.addClass("col s12 m5");
//       newCard.addClass("z-depth-4");

//       var cardDesign = $("<div>");
//       cardDesign.addClass("card-image");
//       cardDesign.addClass("waves-effect");
//       cardDesign.addClass("waves-block");
//       cardDesign.addClass("waves-light");

//       var image = $("<img>").attr("id", "image");
//       image.attr("src", results[i].recipe.image);
//       // image.addClass("activator");
//       image.width(623.625);
//       image.height(415);  

//       var newCardContent = $("<div>").attr("id", "newCardContent");
//       newCardContent.addClass("card-content");
//       newCardContent.addClass("blue lighten-5")

//       var recipeTitle = $("<span>").attr("id", "span");
//       recipeTitle.text(recipeName);
//       recipeTitle.addClass("card-title");
//       // recipeTitle.addClass("activator");
//       recipeTitle.addClass("teal-text");
//       recipeTitle.addClass("text-darken-4");

//     })

