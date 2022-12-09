document.addEventListener('DOMContentLoaded', () => {
    getMovies();
})
function getMovies() {
    fetch('http://localhost:3000/movies').then(resp =>resp.json()).then(movies => movies.forEach(movie=>displayMovies(movie)))
}
function displayMovies(movie) {
    
    let container = document.querySelector('.main-content-movie-container');
    let card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
    <div class="card-img-container">
        <img src="${movie.poster}" alt="${movie.title}">
        <h5>${movie.title}</h5>
    </div>
    // <div class="overlayDet seen">
    //     <p>${movie.description}</p>
    //     <button>More Info</button>
    // </div>`
    container.append(card);

    // sort display hover
    // let imgContainer = document.querySelector('.card .card-img-container');
    // container.addEventListener('mouseenter', (event) => {
    //     console.log('hey')
    //     console.log(event.target)
    // })
}
