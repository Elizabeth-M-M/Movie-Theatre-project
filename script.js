document.addEventListener('DOMContentLoaded', () => {
    getMovies();
})

// GET data to display to screen
function getMovies() {
    fetch('http://localhost:3000/movies').then(resp => resp.json()).then(movies => {
        movies.forEach(movie => displayMovies(movie))
    })
}

function displayMovies(movie) {
    // Div containing images on load screen
    let images = document.querySelectorAll(".img-container.img-size");
    // Creating a list containing all the movie titles
    let ul = document.querySelector('#list');
    let li = document.createElement('li');
    li.innerHTML = movie.title;
    ul.appendChild(li);
    // Targeting list items to display items when clicked
    li.addEventListener('click', (event) => {
        if (event.target.innerHTML === movie.title) {
            displayMovieChange(movie)
        }
    })
    // Targeting images on the loaded screen to display movies when clicked
    images.forEach((img) => {
      img.addEventListener("click", (event) => {
        if (event.target.parentElement.id === movie.id) {
          displayMovieChange(movie);
        }
      });
    });
}
// Actual display after one of two events above; image or list item clicked
function displayMovieChange(selectedMovie) {
    // div to embed the html contents on the side
    let containerContents = document.querySelector('.container-dits');
    // Calculating tickets available for sale. assumption is that the movie theatre full capacity is 30 seats
    let ticketsAvail = selectedMovie.capacity - selectedMovie.tickets_sold;
        // Displaying contents
    containerContents.innerHTML = `
            <div class="container-img">
                <img src="${selectedMovie.poster}" alt="${selectedMovie.title}">
            </div>
            <div class="container-content">
                <div class="container-content-header">
                    <h4>${selectedMovie.title}</h4>
                    <p><span>94</span> min</p>
                </div>
                <div class="container-content-details">
                    <p>${selectedMovie.description}</p>
                    <button id="time">${selectedMovie.showtime}</button>
                    <button id="ticketNumber" class="soldOut"><span>${ticketsAvail}</span>remaining tickets</button>
                    <button id="buyTicket" class="buyTicket">Buy Ticket</button>
                </div>
            </div>
                    `;
    // Buying tickets
   let buy = document.querySelector('#buyTicket'); 
    if(ticketsAvail<1){
                buy.innerHTML = "Sold Out";
                buy.classList.add('allout');
            }
    buy.addEventListener('click', (event) => {
        if (ticketsAvail < 1) {
            selectedMovie.tickets_sold = 30;
            
            updateServerOnTicketsAvail(selectedMovie)
        } else {
            parseInt(selectedMovie.tickets_sold, 10)
            selectedMovie.tickets_sold++;
            ticketsAvail = selectedMovie.capacity - selectedMovie.tickets_sold;
            document.querySelector("#ticketNumber span").innerHTML = ticketsAvail;
            if(ticketsAvail<1){
                buy.innerHTML = "Sold Out";
                buy.classList.add('allout');
            }
            // To update our server, we'd call on the PATCH fetch request method
            updateServerOnTicketsAvail(selectedMovie)
             }
        })
    }

// Our fetch request updates on a specific property in the movie
function updateServerOnTicketsAvail(movie) {
    fetch(`http://localhost:3000/movies/${movie.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'tickets_sold':movie.tickets_sold})
    })
        .then(resp => resp.json())
        .then(movies => console.log(movies))
}

