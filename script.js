var author = ""; //becomes authors name encoded for Wiki linking

var wikiURL = "https://en.wikipedia.org/wiki/"; //Wiki link base

var url = 'url("https://source.unsplash.com/1920x1080/?'; //image source url. 

//image filtering keywords
var keyWords = ["landscape","technology","outdoor", "cool", "sky", "water","dog","cat", 
"wallpaper","nature","team", "space", "coffee","eruption", "smoke", "mountain", "storm", 
"crater", "ravine","formation", "weather", "whirlwind", "galaxy", "star", "milkyway",
"vsco", "tree","fog","sand","desert","sunset","hill", "ice","snow","slope","chalet",
"cold","frozen","frost","sea","glacier"];



function nQ() { //New Quote function. Also pulls new picture

	var num = Math.floor(Math.random()* keyWords.length); //picks random keyword
		
	$('.view').css("background" , url + keyWords[num] +'")'); //sets CSS image to new URL
			
		$.get("https://talaikis.com/api/quotes/random", function(data) { //request new quote
			
			$('.quote').remove(); //remove old quote while retrieving new
			$('.author').remove();
			
			$('.content').prepend("<div class='quote animated fadeIn lead'>" + data.quote + "</div>"); //puts quotes&author in html
			$('.content').prepend("<div class='author animated fadeIn h1-responsive'>~" + data.author + "</div>");
		});
		
};



function postTweet(quote, author) {
	window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" ' + author));

	console.log('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '"' + author));
};


$(document).ready(function() {
	nQ(); //Loads first quote/image

	//Pulls new quote when "New Quote" button is clicked
	$('#newQuote').on('click', nQ);
		
	//Combines "author" and Wiki base URL into a complete URL
	$('#search').on('click', function() {
		author = $('.author').html().substr(1).replace(/ /g,"_");
		
		newUrl = wikiURL + author;
		
		window.open(newUrl); 
	});
	
	//Enables twitter-posting
	$('#twitter').on('click', function() {
		quote = $('.quote').html();
		author = $('.author').html();
		postTweet(quote, author);
	});
	
});
