document.addEventListener('DOMContentLoaded', () => {
    getMovies();
    
})
function getMovies() {
    fetch('http://localhost:3000/movies').then(resp => resp.json()).then(movies => {
        movies.forEach(movie => displayMovies(movie))
    })
}
// function displayMovies(movie) {
//     console.log(movie)
//     let container = document.querySelector('.container');
//      let containerContents = document.createElement('div');
//     containerContents.className = "container-dits";
//     containerContents.innerHTML = `
//             <div class="container-img">
//                     <img src="${movie.poster}" alt="${movie.title}">
//                 </div>
                
//                 <div class="container-content">
//                     <div class="container-content-header">
//                         <h4>${movie.title}</h4>
//                         <p><span>94</span> min</p>
//                     </div>
//                     <div class="container-content-details">
//                         <p>${movie.description}</p>
//                         <button id="time">${movie.showtime}</button>
//                         <button id="ticketNumber"><span>(${movie.capacity}-${movie.tickets_sold})</span>remaining tickets</button>
//                         <button id="buyTicket">Buy Ticket</button>
//                     </div>
//                     `
//             container.appendChild(containerContents);
    
//    let ul = document.querySelector('#list');
//     let li = document.createElement('li');
//     li.innerHTML = movie.title;
//     ul.appendChild(li);
    
    
  
// }
function displayMovies(movie) {
    
    let ul = document.querySelector('#list');
    let li = document.createElement('li');
    li.innerHTML = movie.title;
    ul.appendChild(li);
    
    
    li.addEventListener('click', (event) => {

        if (event.target.innerHTML === movie.title) {
            console.log(event.target.innerHTML)
            console.log(movie.title)
            displayMovieChange(movie)
        } else {
            // container.classList.add('hide');
        }
    })
}
function displayMovieChange(selectedMovie) {
    console.log(selectedMovie)
    let containerContents = document.querySelector('.container-dits');
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
                        <button id="ticketNumber"><span>(${selectedMovie.capacity}-${selectedMovie.tickets_sold})</span>remaining tickets</button>
                        <button id="buyTicket">Buy Ticket</button>
                    </div>
                    `
   
    
}
// .container
