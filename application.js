// my javascript for giphy app

// on page load...
$(document).ready(function() {

// use this variable to create and add buttons...
	var searchGifs = {

		existingButtons: ["dogs", "cats", "lol", "nope", "wtf", "dance", "cute", "wut"],
		createButtons: function() {
			for (var i = 0; i < searchGifs.existingButtons.length; i++) {
				var newButton = $("<button>");
				newButton.attr("data-search", searchGifs.existingButtons[i]);
				newButton.addClass("btn btn-default");
				newButton.addClass("searchButtons");
				newButton.text(searchGifs.existingButtons[i]);
				$("#buttonsContainer").append(newButton);
			}
		},

		addButtons: function(event) {
			event.preventDefault();

			var userTerm = $("#giphyForm").val();

			if (searchGifs.existingButtons.indexOf(userTerm) < 0 && userTerm.length > 0) {
				searchGifs.existingButtons.push(userTerm);
				var newButton = $("<button>");
				newButton.attr("data-search", userTerm);
				newButton.addClass("btn btn-default");
				newButton.addClass("searchButtons");
				newButton.text(userTerm);
				$("#buttonsContainer").append(newButton);

			}
		},
// use searchGifs variable and AJAX to display results
		displayResults: function(event) {
			$("#showGifs").empty();
			event.preventDefault();

			var userQuery = $(this).data("search");
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userQuery + "&limit=10&api_key=dc6zaTOxFJmzC";
        	// console.log(queryURL);
        	$.ajax({
        		url: queryURL,
        		method: "GET"
        	}).done(function(response) {

        		for (var i = 0; i < response.data.length; i++) {
        			// adding paragraph for img and rating
        			var p = $("<p>");
        			p.addClass("gifContainer");

        			var rating = response.data[i].rating;
        			// console.log(rating);
        			p.text(" (rating: " + rating + ")");
        			// adding variables for animated & still versions of response gifs
        			var animateURL = response.data[i].images["fixed_height"].url;
        			var stillURL = response.data[i].images["fixed_height_still"].url;
        			// addting the gifts themselves
        			var gifURL = response.data[i].images.fixed_height.url;
        			var newImg = $("<img>");
        			newImg.attr("src", stillURL);
        			newImg.attr("data-animate", animateURL);
        			newImg.attr("data-still", stillURL);
        			newImg.attr("data-state", "still");
        			newImg.addClass("gif");
        			p.prepend(newImg);

        			$("#showGifs").append(p);
        		}
// this click event function plays and pauses the gifs
        	$(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });


        });

	},

	}
// this calls the createButtons function
	searchGifs.createButtons();

// this calls the addButtons & displayResults functions (on click)
	$("#submitButton").click(searchGifs.addButtons);
	$(document).on("click", ".searchButtons", searchGifs.displayResults);
});













