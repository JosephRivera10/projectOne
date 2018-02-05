  
//adds ingredients to ingredient field as a new chip
  $(document).on("click", '#add', function(event) {
    event.preventDefault();
    var newIngredient = $("#ingredients").val().trim();
    console.log(newIngredient);
    
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




