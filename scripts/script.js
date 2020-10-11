const apiKey= "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA"
const offset = 0;

const getTrending = () => {
 url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
 fetch(url)
 .then(response => response.json())
 .then(response => response.data.forEach(renderTrending))

}

const renderTrending = (gif) => {
    console.log(gif)
    const trending = document.getElementById("trending-carrousel")
        const p = document.createElement('p')
        p.innerHTML = `<img src=${gif.images.downsized.url} class="trending-gif" ></img>`
        trending.appendChild(p)
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

const search = () => {
    const searchArea = document.getElementById("search-area")
    searchArea.innerHTML = ''
    const input = document.getElementById("searchInput")
    const query = input.value
    url= `https://api.giphy.com/v1/gifs/search?api_key=vWxLs91pSMGABQsCprkgIF3EsXy3WnZA&q=${query}&limit=12&offset=0`
    fetch(url)
    .then(response => response.json())
    .then(gifs => gifs.data.forEach(renderSearch))    
}

const renderSearch = (gif) => {
    const searchResults = document.getElementById("search-results")
    console.log(searchResults)
    // const p = document.createElement('p')
    // p.innerHTML = `<img src=${gif.images.downsized.url} class="searched-gif" ></img>`
    // searchResults.appendChild(p)
}

getTrending();