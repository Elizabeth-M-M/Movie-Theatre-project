# Flatdango
#### Flatiron Movie Theater
### Owner
Program by Elizabeth Mwende Muthusi
### Date
10/12/2022.

### About the program
This is a mini web app that shows the movies being shown in the Flatdango theatre at a particular moment in time. A user clicks to view the details, and if interested books a ticket. There is a menu of all movies on the left side of the page. On clicking an item in the menu, the  movie's details, including its poster, title, runtime, showtime, and available tickets are displayed on its right side.

After clicking the "Buy Ticket" button, the number of available tickets decreases on the frontend. One is also not able to buy a ticket if the showing is sold out.

### Set up
#### DB.JSON
This project required a set up of a local server to store our movie house data. You need to run the server to access the data, so I created a .json file and added data to it.
Once the page loads, the web page fetches data from the local server and displays a list.

#### HTML
The `index.html` structure was built out and divided into two sections, a nav and a header section.
- The nav section houses the title and the logo of the theatre house.
The header section houses the main component of the project, two parts, the list and the showing content page. The list is on the left side of the page while the content on the right side.

#### CSS
Using `style.css`, I built out the design of the page.

#### JavaScript
Using `script`, I built out the functionality of the app.

- Once the DOM loads, data is first fetched from the server and called in the function `displayMovies(movie)`. Here, we display the movie titles by first creating an `li` element with the inner HTML being the movie title. The list is then appended to the target `ul` on the HTML and as a result, the list is finally displayed on the left side of the page.

- Using the list item, I targeted individual movies by adding a click event listener to the list items `li`. If the list name and movie title match, the contents of the movie are displayed using the `displayMovieChange(selectedMovie)` function.

- Buying tickets involved adding a click event listener to the `Buy Now` button. The number of available tickets is gotten from subtracting the number of `tickets_sold` from the theater's `capacity`. My assumption is that the theatre has a constant of 30 seats available in the theatre.

- Once the user clicks on the `Buy Now` button, the number of tickets available reduce by one. The new figure is stored in the db.json using a PATCH fetch request in the `updateServerOnTicketsAvail(movie)` function.
- If the number of available tickets is 0, the button turns red displaying a `Sold Out` message and the subtracting ceases.