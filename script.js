document.addEventListener('DOMContentLoaded', () => {
    getMovies();
    
})
function getMovies() {
    fetch('http://localhost:3000/movies').then(resp => resp.json()).then(movies => {
        movies.forEach(movie => displayMovies(movie))
    })
}

function displayMovies(movie) {
    let ul = document.querySelector('#list');
    let li = document.createElement('li');
    li.innerHTML = movie.title;
    ul.appendChild(li);
    li.addEventListener('click', (event) => {
        if (event.target.innerHTML === movie.title) {
            displayMovieChange(movie)
        }
    })
}
function displayMovieChange(selectedMovie) {
    let containerContents = document.querySelector('.container-dits');
    let ticketsAvail;
    
    if (selectedMovie.tickets_sold===selectedMovie.capacity) {
        ticketsAvail = 0
    } else {
       ticketsAvail = selectedMovie.capacity - selectedMovie.tickets_sold;
    }
    
    
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
                        <button id="ticketNumber"><span>${ticketsAvail}</span>remaining tickets</button>
                        <button id="buyTicket">Buy Ticket</button>
                    </div>
                    `
    let buy = document.querySelector('#buyTicket');
    if (ticketsAvail <= 0) {
        buy.innerHTML = "Sold Out";
        buy.style.backgroundColor = "red"; 
        selectedMovie.tickets_sold = 0;
    } else {
         buy.addEventListener('click', (event) => {
        console.log(selectedMovie.tickets_sold)
       parseInt(selectedMovie.tickets_sold, 10)
       selectedMovie.tickets_sold++
        

        console.log("sold"+selectedMovie.tickets_sold)
        ticketsAvail = selectedMovie.capacity - selectedMovie.tickets_sold;
        document.querySelector("#ticketNumber span").innerHTML = ticketsAvail;
        console.log(typeof selectedMovie.tickets_sold)
       updateServerOnTicketsAvail(selectedMovie)
        
    })
    }
    
    
    
    
    
    
}
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

