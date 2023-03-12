const global = {
  currentPage: window.location.pathname,
  search:{
    term:'',
    type:'',
    page:1,
    totalPages:1,
    totalResults:0
  },
  api:{
    apiKey:'6e24d641b14f53e559c6bc6710b05362',
    apiURL:'https://api.themoviedb.org/3/'
  }
};

// Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

function showAlert(message,className){
  const alertElement= document.createElement('div')
  
  alertElement.classList.add('alert',className)
  alertElement.appendChild(document.createTextNode(message))
  document.getElementById('alert').appendChild(alertElement)
  setTimeout(()=>{alertElement.remove()},3000)
}

// Display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
      .map((company) => `<span>${company.name}</span><br>`)
      .join('')} 
  </div>
</div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}

// Display Show Details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
      show.last_episode_to_air.name
    }</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${show.production_companies
      .map((company) => `<span>${company.name}</span><br>`)
      .join(' ')}
  </div>
</div>
  `;

  document.querySelector('#show-details').appendChild(div);
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // Register your key at https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. You should store your key and make requests from a server
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}
async function searchAPIData(){
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}
async function search(){

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  
  console.log(urlParams.get('type'));
  global.search.term = urlParams.get('search-term')
  global.search.type = urlParams.get('type')
  if(global.search.term!='' && global.search.term!=null)
  {  const {results,total_pages,page,total_results}= await searchAPIData()
     global.search.page=page
     global.search.totalResults=total_results
     global.search.totalPages=total_pages
     console.log(results);
     displayResults(results)
    
     
  }
  else{
    showAlert('Search something!')
  }
}
function displayResults(results){

document.querySelector('#pagination').innerHTML=''
document.querySelector('#search-results').innerHTML=''

results.forEach((result) => {
 
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w300/${result.poster_path}"
              class="card-img-top"
              alt="${global.search.type=='movie' ? result.title : result.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${global.search.type=='movie' ? result.title : result.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type=='movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${global.search.type=='movie' ? result.release_date: result.first_air_date}</small>
            </p>
          </div>
        `;
     
    document.querySelector('#search-results-heading').innerHTML=`
    <h3>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h3>`    
    document.querySelector('#search-results').appendChild(div);
    
  });
  displayPagination()
}
function displayPagination(){
const pagination=document.createElement('div')
pagination.classList.add('pagination')
pagination.innerHTML=`
<button class="btn btn-primary" id="prev">Prev</button>
<button class="btn btn-primary" id="next">Next</button>
<div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`

document.querySelector('#pagination').appendChild(pagination)
if(global.search.page==1)
document.querySelector('#prev').disabled=true
if(global.search.page==global.search.totalPages)
document.querySelector('#next').disabled=true
document.querySelector('#next').addEventListener('click',async ()=>{
  global.search.page++
  const {results,total_pages} = await searchAPIData()
 
  displayResults(results)
})

document.querySelector('#prev').addEventListener('click',async ()=>{
  global.search.page--
  const {results,total_pages} = await searchAPIData()
 
  displayResults(results)
})
}


function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
async function displaySlider(){
 const {results}= await fetchAPIData('movie/now_playing');
 results.forEach(movie=>{
  const div = document.createElement('div')
  div.classList.add('swiper-slide')
  div.innerHTML=`<a href="movie-details.html?id=${movie.id}">
           <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            alt="${movie.title}" />
                </a>
         <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${addCommasToNumber(movie.vote_average)}/ 10
         </h4> `;
  document.querySelector('.swiper-wrapper').appendChild(div)
  initSwiper()       
 })
}
function initSwiper(){

  const swiper = new Swiper('.swiper',{
    slidesPerView:3,
    spaceBetween:10,
    freeMode:true,
    loop:true,
    autoplay:{
      delay:3000,
      disableOnInteraction:false
    },
    breakpoints:{
      500:{
        slidesPerView:4
      },
      700:{
        slidesPerView:5
      },
      1200:{
        slidersPerView:6
      },
    }
  })
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      displaySlider()
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
    //console.log('Search');
    search()
      break;
  }
  
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
