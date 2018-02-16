


$("#map").hide();
$("#hideMap").hide();


          $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    }
  );

$("#closeModal").on("click", function() {
   $("#modal1").hide();
   $("#txtPassword").val("");
   $("#txtEmail").val("");
})
var myInput = document.getElementById("txtPassword");
// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
    document.getElementById("message2").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
    document.getElementById("message2").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
document.getElementById("message2").style.display = "none";
}


// $('#txtPassword').on('input', function() {
// });
// $('#txtPassword').on('input', function() {
//   var input=$(this);
//   var is_name=input.val();
//   if(is_name){input.removeClass("invalid").addClass("valid");}
//   else{input.removeClass("valid").addClass("invalid");}
// });


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
    newI.text("close")
    
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
      newCard.addClass("col s11 m5");
      newCard.addClass("z-depth-4");

      var cardDesign = $("<div>");
      cardDesign.addClass("card-image");
      cardDesign.addClass("waves-effect");
      cardDesign.addClass("waves-block");
      cardDesign.addClass("waves-light");

      var image = $("<img>").attr("id", "image");
      image.attr("src", results[i].recipe.image);
      // image.addClass("activator");
      // image.width(623.625);
      // image.height(415);

      var newCardContent = $("<div>").attr("id", "newCardContent");
      newCardContent.addClass("card-content");
      newCardContent.addClass("blue lighten-5");

      var recipeTitle = $("<span>").attr("id", "span");
      recipeTitle.text(results[i].recipe.label);
      recipeTitle.addClass("card-title");
      // recipeTitle.addClass("activator");
      recipeTitle.addClass("teal-text");
      recipeTitle.addClass("text-darken-4");

      var showIngredients = $("<i>").attr("id", "i");
      showIngredients.addClass("material-icons");
      showIngredients.addClass("right");
      showIngredients.addClass("activator");
      showIngredients.addClass("teal-text text-darken-4")
      showIngredients.text("more_vert")

      var recipeLikeButton = $("<i>");
      recipeLikeButton = $("<a>").attr("href", "#").attr("id", "saveLikedRecipe");
      recipeLikeButton.addClass("material-icons");
      recipeLikeButton.addClass("right");
      // recipeLikeButton.addClass("cursor");
      // recipeLikeButton.addClass("blue-text")
      recipeLikeButton.text("thumb_up");

      
      var space = $("<p>");

      var link = $("<a>").attr("id", "a");
      link.attr("href", results[i].recipe.url);
      link.attr("target", "_blank");
      link.addClass("red-text text-lighten-1");
      link.text("Recipe Link");
      // link.target("_blank");

      
      var revealCard = $("<div>").attr("id", "revealCard");
      revealCard.addClass("card-reveal");
      revealCard.addClass("white");
      revealCard.addClass("blue lighten-5");



      var hideIngredients = $("<i>").attr("id", "i2");
      hideIngredients.addClass("material-icons");
      hideIngredients.addClass("right");
      hideIngredients.addClass("activator");
      hideIngredients.addClass("red-text");
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
      initMap();
//        navigator.geolocation.getCurrentPosition(function(position){ 
//   var lat = position.coords.latitude;
//   var lng = position.coords.longitude;
//   console.log(lat);
//   console.log(lng);
//   initMap(lat, lng);
// });
      })
      $("#hideMap").on("click", function () {
        $("#map").hide();
        $("#hideMap").hide();
      })

// AIzaSyCLC-T_zVNA5zD_iiAoQOH1-SjI5QyuNG0


// https://maps.googleapis.com/maps/api/place/nearbysearch/json
//   ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=YOUR_API_KEY

      var map;
      var infowindow;

      function initMap() {
        var city = {lat: 30.2672, lng: -97.7431};

        map = new google.maps.Map(document.getElementById('map'), {
          center: city,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: city,
          radius: 2000,
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

//       var map;
// var infoWindow;
// var service;

// function initMap(lat, lng ) {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: parseFloat(lat), lng: parseFloat(lng)},
//     zoom: 15,
//     styles: [{
//       stylers: [{ visibility: 'simplified' }]
//     }, {
//       elementType: 'labels',
//       stylers: [{ visibility: 'off' }]
//     }]
//   });

//   infoWindow = new google.maps.InfoWindow();
//   service = new google.maps.places.PlacesService(map);

//   // The idle event is a debounced event, so we can query & listen without
//   // throwing too many requests at the server.
//   map.addListener('idle', performSearch);
// }

// function performSearch() {
//   var request = {
//     bounds: map.getBounds(),
//     keyword: 'best view'
//   };
//   service.radarSearch(request, callback);
// }

// function callback(results, status) {
//   if (status !== google.maps.places.PlacesServiceStatus.OK) {
//     console.error(status);
//     return;
//   }
//   for (var i = 0, result; result = results[i]; i++) {
//     addMarker(result);
//   }
// }

// function addMarker(place) {
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     icon: {
//       url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
//       anchor: new google.maps.Point(10, 10),
//       scaledSize: new google.maps.Size(10, 17)
//     }
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     service.getDetails(place, function(result, status) {
//       if (status !== google.maps.places.PlacesServiceStatus.OK) {
//         console.error(status);
//         return;
//       }
//       infoWindow.setContent(result.name);
//       infoWindow.open(map, marker);
//     });
//   });
// }
    