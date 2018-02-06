  
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
// var ingredientsSearch = $(".chip").data("name");
console.log(ingredientsSearchArray);

 var queryURL = "https://api.edamam.com/search?q=" + ingredientsSearchArray + "&app_id=5148c2dc&app_key=1a2daaf08f5a479ca7f99584442c2dbd&from=0&to=10";
 console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .then(function(response) {
    
    var results = response.hits;
    console.log(results);

    for (var i = 0; i < response.hits.length; i++) {

      // var image = "";
      // var recipeTitle = ""; 
      // var link = "";
      var newCard = $("<div>");
      newCard.addClass("card");

      var cardDesign = $("<div>");
      cardDesign.addClass("card-image");
      cardDesign.addClass("waves-effect");
      cardDesign.addClass("waves-block");
      cardDesign.addClass("waves-light");

      var image = $("<img>");
      image.attr("src", results[i].recipe.image);
      image.addClass("activator");
      image.width(300);
      image.height(300);
      console.log(image);

      var newCardContent = $("<div>");
      newCardContent.addClass("card-content");

      var recipeTitle = $("<span>");
      recipeTitle.text(results[i].recipe.label);
      recipeTitle.addClass("card-title");
      recipeTitle.addClass("activator");
      recipeTitle.addClass("grey-text");
      recipeTitle.addClass("text-darken-4");
      console.log(recipeTitle);

      var showIngredients = $("<i>");
      showIngredients.addClass("material-icons");
      showIngredients.addClass("right");
      showIngredients.text("Ingredients");

      var link = $("<a>");
      link.attr("href", results[i].recipe.url);
      link.text("Recipe Link");
      // link.target("_blank");
      console.log(link);

      // for (var j = 0; j < results[i].recipe.ingredientLines.length; j++) {
      //         $("#recipeIngredientsDiv"+k).append('<li>' + results[i].recipe.ingredientLines[j] + '</li>');

      var revealCard = $("<div>");
      revealCard.addClass("card-reveal");

      var hideIngredients = $("<i>");
      hideIngredients.addClass("material-icons");
      hideIngredients.addClass("right");
      hideIngredients.text("Hide Ingredients");

      var ingredientList = $("<span>");
      ingredientList.text(results[i].recipe.ingredientLines);
      ingredientList.addClass("card-title");
      ingredientList.addClass("activator");
      ingredientList.addClass("grey-text");
      ingredientList.addClass("text-darken-4");


      $("#cardArea").append(newCard);
      newCard.append(cardDesign);
      cardDesign.append(image);
      newCard.append(newCardContent);
      newCardContent.append(recipeTitle);
      recipeTitle.append(link);
      recipeTitle.append(showIngredients);
      newCard.append(revealCard);
      revealCard.append(ingredientList);
      ingredientList.append(hideIngredients);
    }

    });

  });
