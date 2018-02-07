  
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
      var newCard = $("<div>").attr("id", "card");
      newCard.addClass("card");
      newCard.addClass("small");
      newCard.addClass("col s12 m5");

      var cardDesign = $("<div>");
      cardDesign.addClass("card-image");
      cardDesign.addClass("waves-effect");
      cardDesign.addClass("waves-block");
      cardDesign.addClass("waves-light");

      var image = $("<img>").attr("id", "image");
      image.attr("src", results[i].recipe.image);
      image.addClass("activator");
      image.width(280);
      image.height(180);

      var newCardContent = $("<div>");
      newCardContent.addClass("card-content");

      var recipeTitle = $("<span>").attr("id", "span");
      recipeTitle.text(results[i].recipe.label);
      recipeTitle.addClass("card-title");
      recipeTitle.addClass("activator");
      recipeTitle.addClass("teal-text");
      recipeTitle.addClass("text-darken-3");

      var showIngredients = $("<i>").attr("id", "i");
      showIngredients.addClass("material-icons");
      showIngredients.addClass("right");
      showIngredients.addClass("teal-text text-darken-3")
      showIngredients.text("...")

      var space = $("<p>");

      var link = $("<a>").attr("id", "a");
      link.attr("href", results[i].recipe.url);
      link.addClass("orange-text text-darken-3");
      link.text("Recipe Link");
      // link.target("_blank");

      
      var revealCard = $("<div>");
      revealCard.addClass("card-reveal");
      revealCard.addClass("teal lighten-2");


      var hideIngredients = $("<i>").attr("id", "i2");
      hideIngredients.addClass("material-icons");
      hideIngredients.addClass("right");
      hideIngredients.addClass("orange-text text-darken-4")
      hideIngredients.text("...");

      for (var j = 0; j < results[i].recipe.ingredientLines.length; j++) {
      //         $("#recipeIngredientsDiv"+k).append('<li>' + results[i].recipe.ingredientLines[j] + '</li>');
      var newLine = $("<p>");

      var ingredientList = $("<span>").attr("id", "span");
      ingredientList.text(results[i].recipe.ingredientLines[j]);
      ingredientList.addClass("card-title");
      ingredientList.addClass("activator");
      ingredientList.addClass("teal-text");
      ingredientList.addClass("text-darken-3");
    
    $(revealCard).append(newLine);
    newLine.append(ingredientList);
    }



      $("#cardArea").append(newCard);
      newCard.append(cardDesign);
      cardDesign.append(image);
      newCard.append(newCardContent);
      newCardContent.append(recipeTitle);
      recipeTitle.append(space);
      space.append(link);
      space.append(showIngredients);
      newCard.append(revealCard);
      // revealCard.append(newLine);
      // newLine.append(ingredientList);
      ingredientList.append(hideIngredients);
    }

    });

  };
