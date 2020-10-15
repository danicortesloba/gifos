const apiKey= "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA"
let offset = 0;
let counter = 12;
let popId = 1;

const searchArea = document.getElementById('see-more-area')
searchArea.innerHTML = ""

const getTrending = () => {
 url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
 fetch(url)
 .then(response => response.json())
 .then(response => response.data.forEach(renderTrending))
}

const renderTrending = (gif) => {
    console.log(gif)
return new Promise((resolve, reject) => {
    const trending = document.getElementById("trending-carrousel")
    const image = document.createElement('p')
    const favourite = document.createElement('p')
    const download = document.createElement('p')
    const maximize = document.createElement('p') 
    const popup = document.createElement('div')
    image.innerHTML = `<img src=${gif.images.downsized.url} class="trending-gif" alt="gif" >`  
    popup.innerHTML = `<div class="popup-wrapper" id="popup-wrapper${popId}"><div class="popup"><div class="popup-close" id="popup-close${popId}">x</div> <div class="popup-content" id="popup-content"><img src=${gif.images.downsized.url} class="pop-up-image" alt="gif" ></img></div></div></div>`
    favourite.innerHTML = `<img src= "images/icon-fav-hover.svg" alt="favourite" class="favourite"/>`
    download.innerHTML = `<img src="images/icon-download-hover.svg" alt="download" class="download" />`
    maximize.innerHTML = `<img src ="images/icon-max-hover.svg" alt="maximize" class="max" />`
    trending.appendChild(popup)
    trending.appendChild(image)
    trending.appendChild(favourite)
    trending.appendChild(download)
    trending.appendChild(maximize)
    const id=popId
    maximize.addEventListener("click", () => maximizeImage(id))
        
})
    .then(popId += 1)
    
}


const maximizeImage = (id) => {
    (console.log(id))
    const popupWrapper = document.getElementById(`popup-wrapper${id}`)
    popupWrapper.style.display = 'block'
    const popupClose = document.getElementById(`popup-close${id}`)
    popupClose.addEventListener("click", () => popupWrapper.style.display ="none")
}

const hoverCreate = () => {
    const image = document.getElementById("crear")
    image.src="images/CTA-crear-gifo-hover.svg"
}

const offCreate = () =>{
    const image = document.getElementById("crear")
    image.src="images/button-crear-gifo.svg"
}

const leftHover = () => {
    const image = document.getElementById("left")
    image.src="images/button-slider-left-hover.svg"
}

const leftOff = () => {
    const image = document.getElementById("left")
    image.src="images/button-slider-left.svg"
}

const rightHover = () => {
    const image = document.getElementById("right")
    image.src="images/button-slider-right-hover.svg"
}

const rightOff = () => {
    const image = document.getElementById("right")
    image.src="images/button-slider-right.svg"
}

const carrouselRight = () => {
    const trending = document.getElementById("trending-carrousel")
   trending.innerHTML="";
    offset += 3;
    url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
    fetch(url)
    .then(response => response.json())
    .then(response => response.data.forEach(renderTrending))
}

const carrouselLeft = () => {
    offset -= 3;
    const trending = document.getElementById("trending-carrousel")
    trending.innerHTML="";
    url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
    fetch(url)
    .then(response => response.json())
    .then(response => response.data.forEach(renderTrending))
}

const clear = () => {
    const trendingHeader = document.getElementById('trending-topics-header')
    const trendingTopics = document.getElementById('trending-topics')
    const searchResults = document.getElementById('search-results')
    const seeMore = document.getElementById('see-more-area')
    trendingHeader.innerHTML = ''
    trendingTopics.innerHTML = ''
    searchResults.innerHTML = ''
    seeMore.innerHTML = ''
}
const input = document.getElementById("searchInput")
if(input.value.length !== 0){
    input.addEventListener("click", () => search())
}


const search = () => {
    clear()
    const input = document.getElementById("searchInput")
    const query = input.value
    url= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${counter}&offset=0`
    fetch(url)
    .then(response => response.json())
    .then(response => showResults(response))
    .then(response => seeMore(response) )
    .then(response => clearSeeMore())
}    

const clearSeeMore = () => {
    const searchResults = document.getElementById("search-results")
    if(!searchResults.hasChildNodes()){
        const searchArea = document.getElementById('see-more')
        searchArea.innerHTML = ""
    }
    
}

const seeMore = () => {
    const searchArea = document.getElementById('see-more-area')
    searchArea.innerHTML = ""
    const img = document.createElement('img')
    img.src = "images/CTA-ver-mas.svg"
    img.id = "see-more"
    img.className = "see-more"
    searchArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        search()
    })
    img.addEventListener("mouseover", () => img.src = "images/CTA-ver-mas-hover.svg")
    img.addEventListener("mouseout", () => img.src = "images/CTA-ver-mas.svg")
}



const showResults = (response) => {
    const input = document.getElementById("searchInput")
    if(response.data.length == 0 && input.value.length !==0 ){
        const searchResults = document.getElementById("search-results")
        searchResults.innerHTML = ''
        const div = document.createElement('div')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')
        div.className = "no-results"
        p1.innerText = input.value
        p1.className = "no-results-title"
        p2.innerHTML = `<img src="images/icon-busqueda-sin-resultado.svg" class="no-results-image" ></img>`
        p3.innerText = "Intenta con otra búsqueda"
        p3.className = "no-results-text"
        searchResults.appendChild(div)
        div.appendChild(p1)
        div.appendChild(p2)
        div.appendChild(p3)
        
    } else{
        clear()
        response.data.forEach(renderSearch)
    } 
}

const renderSearch = (gif) => {
    return new Promise((resolve, reject) => {
        const searchResults = document.getElementById("search-results")
        const image = document.createElement('p')
        const favourite = document.createElement('p')
        const download = document.createElement('p')
        const maximize = document.createElement('p') 
        const popup = document.createElement('div')
        image.innerHTML = `<img src=${gif.images.downsized.url} class="trending-gif" alt="gif" >`  
        popup.innerHTML = `<div class="popup-wrapper" id="popup-wrapper${popId}"><div class="popup"><div class="popup-close" id="popup-close${popId}">x</div> <div class="popup-content" id="popup-content"><img src=${gif.images.downsized.url} class="pop-up-image" alt="gif" ></img></div></div></div>`
        favourite.innerHTML = `<img src= "images/icon-fav-hover.svg" alt="favourite" class="favourite"/>`
        download.innerHTML = `<img src="images/icon-download-hover.svg" alt="download" class="download" />`
        maximize.innerHTML = `<img src ="images/icon-max-hover.svg" alt="maximize" class="max" />`
        searchResults.appendChild(popup)
        searchResults.appendChild(image)
        searchResults.appendChild(favourite)
        searchResults.appendChild(download)
        searchResults.appendChild(maximize)
        const id=popId
        maximize.addEventListener("click", () => maximizeImage(id))
            
    })
        .then(popId += 1)
        
}

const searchSuggestions = () => {
    clear()
    const searchSuggestions = document.getElementById("search-suggestions")
    const input = document.getElementById("searchInput")
    const query = input.value
    url= `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${query}&limit=5`
    fetch(url)
    .then(response => response.json())
    .then(topics => topics.data.forEach(renderSuggestion))
    searchSuggestions.innerHTML=''
}

const searchForSuggestion = (query) => {
    clear()
    url= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${counter}&offset=0`
    fetch(url)
    .then(response => response.json())
    .then(response => showResults(response))
    .then(response => seeMoreSuggested(query))
    .then(response => clearSeeMore())
}

const seeMoreSuggested = (query) => {
    const searchArea = document.getElementById('see-more-area')
    searchArea.innerHTML = ""
    const img = document.createElement('img')
    img.src = "images/CTA-ver-mas.svg"
    img.id = "see-more"
    img.className = "see-more"
    searchArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        searchForSuggestion(query)
    })

    img.addEventListener("mouseover", () => img.src = "images/CTA-ver-mas-hover.svg")
    img.addEventListener("mouseout", () => img.src = "images/CTA-ver-mas.svg")
}

const renderSuggestion = (topic) => {
    const input = document.getElementById("searchInput")
    const searchSuggestions = document.getElementById("search-suggestions")
    const p = document.createElement('p')
    p.innerHTML = `<img src="images/icon-search.svg" alt="search"/>${topic.name}`
    p.className = "topic"
    searchSuggestions.appendChild(p)
    p.addEventListener('click',() => searchForSuggestion(`${topic.name}`))
    input.addEventListener("keydown", event => keyCheck(event))
    input.addEventListener("click", event => clearResults(event))
}

const keyCheck = (event) => {
    const input = document.getElementById("searchInput")
    input.style.backgroundImage = "url('images/close.svg')";

    if(event.keyCode == 8 || event.keyCode == 46){
        const searchArea = document.getElementById('see-more')
        searchArea.innerHTML = ""
        const searchSuggestions = document.getElementById("search-suggestions")
        searchSuggestions.innerHTML = ''
        const p1 = document.createElement('p')
        p1.innerText = "Trending:"
        p1.className = "trending-topics-header"
        const p2 = document.createElement('p')
        p2.innerHTML = "Reactions, Entertainment, Sports,Stickers, Artists"
        p2.className = "trending-topics"
        searchSuggestions.appendChild(p1)
        searchSuggestions.appendChild(p2)
    }

    if(event.keyCode == 13){
        search()
    }
}

const clearResults = (event) => {
    const searchSuggestions = document.getElementById("search-suggestions")
    searchSuggestions.innerHTML = ''
    const input = document.getElementById("searchInput")
    input.value = ''
    input.style.backgroundImage = "url('images/icon-search.svg')";
    const seeMore = document.getElementById('see-more')
    seeMore.innerHTML = ''
}

const facebook = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
const instagram = document.getElementById("instagram");

facebook.addEventListener("mouseover", () => facebook.src = "images/icon_facebook_hover.svg")
facebook.addEventListener("mouseout", () => facebook.src = "images/icon_facebook.svg")
twitter.addEventListener("mouseover", () => twitter.src = "images/icon-twitter-hover.svg")
twitter.addEventListener("mouseout", () => twitter.src = "images/icon-twitter.svg")
instagram.addEventListener("mouseover", () => instagram.src = "images/icon_instagram-hover.svg")
instagram.addEventListener("mouseout", () => instagram.src = "images/icon_instagram.svg")




getTrending();