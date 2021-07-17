import 'regenerator-runtime/runtime';

let movies = [
	"The Witcher",
	"Batman",
	"Mother",
	"World War Z",
	"dad",
	"Daredevil",
	"Guardians of the Galaxy Vol. 2",
	"Narcos",
	"Jessica Jones",
	"Lucifer",
	"You",
	"The Crown",
	"The Rain",
	
];

function createmovies(){
	getMovie(movies[0], 1);
	for (let i = 0; i < movies.length; i++) {
		getMovie(movies[i]);
	}
}

async function getMovie(movieName, isShow = 0) {
	const API = `http://www.omdbapi.com/?i=tt3896198&apikey=2ab9763c&t=${movieName}`;
  
  let result = await fetch(API)
	  .then((response) => response.json())
	  .then((response) => response)
	  .catch(erorr => console.log("Error"));

	if(isShow){
		showMovie(result);
	}else {
		createMovie(result);
	}
}

function showMovie(movie){
	document.querySelector("[movieTitle]").innerHTML = movie.Title;
	document.querySelector("[movieType]").innerHTML = movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1);;
	document.querySelector("[movieGenre]").innerHTML = movie.Genre;
	document.querySelector("[moviePlot]").innerHTML = movie.Plot;
	document.querySelector("[showMovieImg]").src = `${movie.Poster}`;
	calcRating(movie.imdbRating);
}

function calcRating(rating){
	let stars = document.querySelectorAll("[star]");
	let checkStars = Math.round(Number(rating) / 2);
	stars.forEach(star => {
		star.classList = "openMovie__star";
	});
	for (let i = 0; i < checkStars; ++i) {
		stars[i].classList.add("openMovie__star--checked");
	}
}

function createMovie(movie){
	let element = document.querySelector("[movies]");
	let div = document.createElement("div");
	let img = document.createElement("img");
	let name = document.createElement("h4");
	img.src = `${movie.Poster}`;
	img.alt = "movieFoto"
	name.innerHTML = `${movie.Title}`;
	div.classList = "movie";
	img.classList = "movie__img";
	name.classList = "movie__name";
	div.appendChild(img);
	div.appendChild(name);
	element.appendChild(div);
	div.setAttribute("onclick", `clickedMovie("${movie.Title}")`);
}

window.clickedMovie = function clickedMovie(movie) {
	getMovie(movie, 1);
}
/* search */ 
window.searchFun = function searchFun(){
	let search = document.getElementById("search").value;
	document.getElementById("search").value = "";
	searchMovie(search);
}

async function searchMovie(movieName) {
	const API = `http://www.omdbapi.com/?i=tt3896198&apikey=2ab9763c&s=${movieName}`;
  
  let result = await fetch(API)
	  .then((response) => response.json())
	  .then((response) => response)
	  .catch(erorr => console.log("Error"));

	if(result.Response === "True"){
		resultSearch(result.Search)
	} else {
		alert("No Results!!\nTry Again....");;
	}
}

function resultSearch(result){
	let element = document.querySelector("[movies]");
	element.innerHTML = "";
    getMovie(result[0].Title, 1);
	result.forEach(createMovie);
}
/* end search */ 
createmovies();