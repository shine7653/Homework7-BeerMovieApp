
//slider
    const slider = document.querySelector('.slider');
    M.Slider.init(slider, {
        indicators: false,
        height: 400,
        transition: 500,
        interval:4000
    });

    $(document).ready(function() {  
            


        $('audio#pop')[1,0].play();      

        var foodButton= [];
        var beerYear= [];

    //1. When a user put a name, the buttons with the names of the food are generated.

        function arrayButtons() {
            console.log(1);
            console.log(beerYear)
            $("#buttonView").empty();

            for (var i= 0; i < foodButton.length; i++) {

                var button = $("<button>");

                button.addClass("food-btn");
                button.attr("data-name", foodButton[i]);      
                button.attr("data-year", beerYear[i]);            
                button.text(foodButton[i]);

                $("#buttonView").prepend(button);
            }
        } 

    //2. The user press enter, the food name is stored in 'newFood' and added in the 'foodButton' array.
       
        $("#food-input").keypress(function(event){ 

        // $("#search").on("click", function(event) {             
           
            if(event.which === 13){
                var newFood = $("#food-input").val().trim();
                    // if(newFood) {
                        // addFood(newFood);
                        foodButton.push(newFood);
                    // }
                newFood.val = "";                
            }
            
            // newFood 를 블러야 실행이 되는 것인데 실행시키지 않았었던 것
            // --> It executes only when I call getBeerData(newFood), but I didn't
            // newFood 버튼을 설정하고, 부르고, api 기능으로 실행시키는 것
            // --> Set the newFood button, Call it, execute with API
            getBeerData(newFood);            
        });

    //3. All the food name buttons will do a certain function,
    //   when the user click any food button, the 'data-name' is stored in 'newFood'
    //   and it will call the getting beer data and getting movie data.

        // $(document).on("click", ".food-btn", getBeerData);
        $(document).on("click", ".food-btn", function(){
            // console.log(3);
            
            var newFood= ($(this).attr("data-name")); 
            console.log($(this).attr("data-year"));
            getBeerData(newFood);
            getMovieData(year);
        });

    //4. The user gets the beer data with the user's food input
    //   and when getting the beer data, the year of the beer is selected, stored and added the 'beerYear' array

        function getBeerData(newFood) {
            
            // var APIKey = "472257543d9345308ea5ac03e502def3";  
            var userInput = newFood;
            var queryURL = "https://api.punkapi.com/v2/beers/?food=" + userInput;
            
            $.ajax({
                url: queryURL,
                method: "GET"          

            }).then(function(response) {
                // console.log("4");
                console.log(response);

                var random = Math.floor(Math.random()*response.length);
                var year = response[random].first_brewed.slice(3);               

                // console.log(response[0].first_brewed.slice(3));
                beerYear.push(year);

                arrayButtons();  // year 를 받기 전에 콜을 불렀기 때문에 아무것도 안나왔던것.
                                 // --> I didn't get anything, because I call arrayButtons(), before I get the year data
                                 // --> Now I get the year data, because I call arrayButton after I get the year data from API 
                showBeerData(response, random);
                getMovieData(year);
                //  $("#beerOutput").text(JSON.stringify(response));                
            });
        }

    //5. With the random choose in the beer data, now its data is populating to the '#beerView' in the HTML.

        function showBeerData(response, random) {
            // console.log("random");            

            // $("#beerView").empty();

            var beerDiv = $("<div class= 'beerData'>");

            var name = response[random].name;            
            var firstBrewed = response[random].first_brewed.slice(3);            
            var description = response[random].description;
            var foodPairing = response[random].food_pairing;
            
            var pOne = $("<h5>").html("BeerName :  " + name);
            var pTwo = $("<h6>").html("FirstBrewed :  " + firstBrewed);                      
            var pThree = $("<h6>").html("Description : " +  '<br>' + description);
            var pFour = $("<h6>").html("Food_paring : " +  '<br>' + foodPairing);

            var imageURL = response[random].image_url;
            var img = $("<img>").attr("src", imageURL);
            img.attr("style", 'height:300px; margin:0 auto;');
            beerDiv.append(img);

            beerDiv.append(pOne);
            beerDiv.append(pTwo);               
            beerDiv.append(pThree);
            beerDiv.append(pFour);

            $("#beerView").append(beerDiv);
            
            beerDiv.attr("style", 'width:500px;height:630px;border-radius:30px;display:inline-block;vertical-align:top;background-image: linear-gradient(to bottom right, rgb(250, 209, 209), rgb(252, 249, 249), rgb(252, 231, 185));margin: 10px;padding:10px;');
        }        

    //6. Finally, we're getting the movie data with the year which is randomly selected ans stored above.

        function getMovieData(year) {            
            
            // var movie = $(this).attr("data-name");
            // var year = firstBrewed;
            var queryURL = "http://www.omdbapi.com/?apikey=3f779744&t=beer&y=" + year;
                  
            $.ajax({
              url: queryURL,
              method: "GET",
            }).then(function(response) {             
                // console.log("6");
                // console.log(response);

                // showFoodData(response);
                showMovieData(response);
            });
        }

     //7. The movie data is populating on the '#movieView' in the HTML
     
        function showMovieData(response) {
            // console.log("7");

            // $("#moviesView").empty();

            var movieDiv = $("<div class='movie'>");          
            
            var title = response.Title;
            var plot = response.Plot;
            var director = response.Director;
            var actors = response.Actors;           
            var country = response.Country;

            var pOne = $("<p>").text("Title: " + title);
            var pTwo = $("<p>").text("Plot: " + plot);
            var pThree = $("<p>").text("Director: " + director);
            var pFour = $("<p>").text("Actors: " + actors);            
            var pFive = $("<p>").text("Country: " + country);                  
                
            var imgURL = response.Poster;
            var image = $("<img>").attr("src", imgURL);
            image.attr("style", 'height:300px; margin:0 auto;');           
            movieDiv.append(image);
            
            movieDiv.append(pOne);
            movieDiv.append(pTwo);
            movieDiv.append(pThree);
            movieDiv.append(pFour);
            movieDiv.append(pFive);

            $("#moviesView").append(movieDiv);

            movieDiv.attr("style", 'width:500px;height:630px;border-radius:30px;display:inline-block;vertical-align:top;background-image: linear-gradient(to bottom right, rgb(250, 209, 209), rgb(252, 249, 249), rgb(252, 231, 185));margin: 10px;padding:10px;');

        }      

    arrayButtons();
        
    });

    

