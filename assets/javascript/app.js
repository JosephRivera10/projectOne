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

var userEmail="";

document.addEventListener("DOMContentLoaded",function(event){

    (function() {

      // // Initialize Firebase
      //   var config = {
      //   apiKey: "AIzaSyATkmHnsV-NtL1Ug0S8T28olh_TXJvHyDg",
      //   authDomain: "chefnow-d3971.firebaseapp.com",
      //   databaseURL: "https://chefnow-d3971.firebaseio.com",
      //   projectId: "chefnow-d3971",
      //   storageBucket: "chefnow-d3971.appspot.com",
      //   messagingSenderId: "407427873927"
      // };
      // firebase.initializeApp(config);
      //
      // var database = firebase.database();

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
        promise.catch(e => console.log(e.message));
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
  userEmail = firebase.auth().currentUser.email;
  // // var userName = userEmail.split("@")[0];
  // console.log(userName);
  // //TODO: Look for and Delete any existing database items under userEmail
  // // database.ref().child(emailID).remove(userEmail);
  var userFavRecipe = {
     emailID: userEmail,
     recipeName: likedRecipeTitle,
     recipeImage: likedRecipeImageLink,
     recipeLink: likedRecipeLink,
     recipeIngredients: likedRecipeIngredients
  };
  // Save ingredientslist  to the firebase database
  database.ref().push(userFavRecipe);
});
// $(document).on("click", '#saveLikedRecipe', function(event) {
//   event.preventDefault();
//   console.log($(this).parent().parent());
//   console.log($(this).parent());
//   var likedRecipeTitle = $(this).parent().parent()[0].childNodes[1].childNodes[0].childNodes[0].data;
//   var likedRecipeImageLink = $(this).parent().parent()[0].childNodes[0].childNodes[0].currentSrc;
//   var likedRecipeLink = $(this).parent().parent()[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].href;
//   var likedRecipeIngredients = [];
//   for (let index = 0; index < ($(this).parent().parent()[0].children[2].childNodes).length; index++) {
//     likedRecipeIngredients[index]=$(this).parent().parent()[0].children[2].childNodes[index].innerText;
//   };
//   console.log(likedRecipeTitle, likedRecipeImageLink,likedRecipeLink, likedRecipeIngredients);
//   userEmail = firebase.auth().currentUser.email;
//   // // var userName = userEmail.split("@")[0];
//   // console.log(userName);
//   // //TODO: Look for and Delete any existing database items under userEmail
//   // // database.ref().child(emailID).remove(userEmail);
//   var userFavRecipe = {
//      emailID: userEmail,
//      recipeName: likedRecipeTitle,
//      recipeImage: likedRecipeImageLink,
//      recipeLink: likedRecipeLink,
//      recipeIngredients: likedRecipeIngredients
//   };
//   // Save ingredientslist  to the firebase database
//   database.ref().push(userFavRecipe);
// });

$(".dropdown-button").dropdown({ hover: false });

$("#map").hide();
$("#hideMap").hide();
var queryURL;

//adds ingredients to ingredient field as a new chip
  $(document).on("click", '#add', function(event) {
    event.preventDefault();
    var newIngredient = $("#ingredients").val().trim();
    
    var newDiv = $("<div>", );
    newDiv.addClass("chip");
    newDiv.attr("data-name", newIngredient);
    newDiv.text(newIngredient);
    
    var newI = $("<i>");
    newI.addClass("close material-icons");
    newI.text("X")
    
    $("#ingredientField").append(newDiv);
    newDiv.append(newI);

    $("#ingredients").val("");
  });

$(document).on("click", '#search', function() {
$("#cardArea").empty();

var ingredientsSearchArray = [];
$(".chip").each(function () {
  ingredientsSearchArray.push($(this).data("name"));
});
    
    // var gluten = $("#test4:checked").val();
   var lowFat = $("#test3:checked").val();
    var vegetarian = $("#test2:checked").val();
    var peanut = $("#test1:checked").val();
    if(peanut == undefined && vegetarian == undefined && lowFat == undefined) {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10";
      runsearch(queryURL);   
    }
    else if (vegetarian == "vegetarian" && peanut == "peanut-free" && lowFat == "low-fat") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + peanut + "&health=" + vegetarian + "&diet=" + lowFat + "";
      runsearch(queryURL);
    }
    else if (vegetarian == "vegetarian" && peanut == "peanut-free") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + vegetarian + "&health=" + peanut + "";
      runsearch(queryURL);
    }
    else if (vegetarian == "vegetarian" && lowFat == "low-fat") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + vegetarian + "&diet=" + lowFat + "";
      runsearch(queryURL);
    }
    else if (peanut == "peanut-free" && lowFat == "low-fat") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + peanut + "&diet=" + lowFat + "";
      runsearch(queryURL);
    }
    else if (peanut == "peanut-free") {
      //run peanut query
       queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + peanut + "";
      runsearch(queryURL);
    }
    else if (vegetarian == "vegetarian") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&health=" + vegetarian + "";
      runsearch(queryURL);
    }
    else if (lowFat == "low-fat") {
      queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10&diet=" + lowFat + "";
      runsearch(queryURL);
    }
      
  });
    
    function runsearch(){
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .then(function(response) {
      console.log(queryURL)
    
    var results = response.hits;

    for (var i = 0; i < response.hits.length; i++) {

      // var image = "";
      // var recipeTitle = ""; 
      // var link = "";
      var newCard = $("<div>").attr("id", "card" +i);
      newCard.addClass("card");
      newCard.addClass("small");
      newCard.addClass("col s12 m5");
      newCard.addClass("z-depth-4");

      var cardDesign = $("<div>");
      cardDesign.addClass("card-image");
      cardDesign.addClass("waves-effect");
      cardDesign.addClass("waves-block");
      cardDesign.addClass("waves-light");

      var image = $("<img>").attr("id", "image");
      image.attr("src", results[i].recipe.image);
      // image.addClass("activator");
      image.width(623.625);
      image.height(415);

      var newCardContent = $("<div>");
      newCardContent.addClass("card-content");

      var recipeTitle = $("<span>").attr("id", "span");
      recipeTitle.text(results[i].recipe.label);
      recipeTitle.addClass("card-title");
      recipeTitle.addClass("activator");
      recipeTitle.addClass("teal-text");
      recipeTitle.addClass("text-darken-4");

      var showIngredients = $("<i>").attr("id", "i");
      showIngredients.addClass("material-icons");
      showIngredients.addClass("right");
      showIngredients.addClass("activator");
      showIngredients.addClass("teal-text text-darken-4")
      showIngredients.text("more_vert")

      var recipeLikeButton = $("<i>").attr("id", "saveLikedRecipe");
      recipeLikeButton.addClass("material-icons");
      recipeLikeButton.addClass("right");
      recipeLikeButton.addClass("blue-text")
      recipeLikeButton.text("thumb_up")
      
      var space = $("<p>");

      var link = $("<a>").attr("id", "a");
      link.attr("href", results[i].recipe.url);
      link.addClass("red-text text-lighten-1");
      link.text("Recipe Link");
      // link.target("_blank");

      
      var revealCard = $("<div>");
      revealCard.addClass("card-reveal");
      revealCard.addClass("white");


      var hideIngredients = $("<i>").attr("id", "i2");
      hideIngredients.addClass("material-icons");
      hideIngredients.addClass("right");
      hideIngredients.addClass("activator");
      hideIngredients.addClass("red-text")
      hideIngredients.text("close");


    var list = $("<ul>").attr("id", "list");

      for (var j = 0; j < results[i].recipe.ingredientLines.length; j++) {
      //         $("#recipeIngredientsDiv"+k).append('<li>' + results[i].recipe.ingredientLines[j] + '</li>');
      // var newLine = $("<p>");

      var ingredientList = $("<li>").attr("id", "spanIngredients");
      ingredientList.text(results[i].recipe.ingredientLines[j]);
      ingredientList.addClass("card-title");
      // ingredientList.addClass("activator");
      ingredientList.addClass("teal-text");
      ingredientList.addClass("text-darken-3");
    
    // $(revealCard).append(newLine);
    // newLine.append(ingredientList);
    list.append(ingredientList);
    }

    // var list = $("<ul>").attr("id", "list");
    revealCard.append(list);

    // var google = $("<div>").attr("id", "map");

      $("#cardArea").append(newCard);
      newCard.append(cardDesign);
      cardDesign.append(image);
      newCard.append(newCardContent);
      newCardContent.append(recipeTitle);
      recipeTitle.append(space);
      space.append(link);
      space.append(showIngredients);
      showIngredients.append(recipeLikeButton);
      newCard.append(revealCard);
      // revealCard.append(newLine);
      // newLine.append(ingredientList);
      ingredientList.append(hideIngredients);
      // revealCard.append(google);
    }

    });

  };
/////null child error
//get this to fire after the code above
//or creat div and append somewhere in the code below
      $("#googleMap").on("click", function (){
      $("#map").show();
      $("#hideMap").show();
       navigator.geolocation.getCurrentPosition(function(position){ 
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  console.log(lat);
  console.log(lng);
  initMap(lat, lng);
});
      })
      $("#hideMap").on("click", function () {
        $("#map").hide();
        $("#hideMap").hide();
      })


      var map;
      var infowindow;

      function initMap(lat, lng) {
        var city = {lat: parseFloat(lat), lng: parseFloat(lng)};

        map = new google.maps.Map(document.getElementById('map'), {
          center: city,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: city,
          radius: 600,
          type: ['grocery_or_supermarket']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
    
    
