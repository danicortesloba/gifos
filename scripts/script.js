const apiKey= "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA"
let offset = 0;
let counter = 12;
let popId = 1;
let stream
let recorder

const seemoreArea = document.getElementById('see-more-area')
seemoreArea.innerHTML = ""
const createGifoSection = document.getElementById("crear-gifos")
createGifoSection.style.display = "none"
const trendingSection = document.getElementById("trending")
trendingSection.style.display ="grid"

const input = document.getElementById("searchInput")
if(input.value.length !== 0){
    input.addEventListener("click", () => search())
}else{
    counter = 12
    input.addEventListener("click",() => clear() )
}

input.addEventListener("keydown", event => keyCheck(event))

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
    let place = "trending-carrousel"
    const trending = document.getElementById("trending-carrousel")
   trending.innerHTML="";
    offset += 3;
    url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
    fetch(url)
    .then(response => response.json())
    .then(response => response.data.forEach(gif => render(gif, place)))
}

const carrouselLeft = () => {
    let place = "trending-carrousel"
    offset -= 3;
    const trending = document.getElementById("trending-carrousel")
    trending.innerHTML="";
    url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
    fetch(url)
    .then(response => response.json())
    .then(response => response.data.forEach(gif => render(gif, place)))
}

const getTrendingGifs = () => {
 let place = "trending-carrousel"
 url= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`
 fetch(url)
 .then(response => response.json())
 .then(response => response.data.forEach(gif => render(gif, place)))
}

const getTrendingTerms = () => {
    url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`
    fetch(url)
    .then(response => response.json())
    .then(response => response.data.splice(0,5))
    .then(response => response.forEach(term => renderTrendingTerms(term)))
}

const renderTrendingTerms = (term)=> {
const termsSection = document.getElementById("trending-topics")
const p = document.createElement("p")
p.innerText = term
termsSection.appendChild(p)
p.style.marginRight = "10px"
p.addEventListener("click",() => searchForSuggestion(term) )
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

const showResults = (response) => {
    const input = document.getElementById("searchInput")
    const seeMore = document.getElementById('see-more-area')
    seeMore.innerHTML = ""
    if(response.data.length == 0 && input.value.length !==0 ){
          renderNoResults() 
        
    } else{
        clear()
        let place = "search-results"
        response.data.forEach(gif => render(gif, place))
    } 
}

const renderNoResults = () => {
    const seeMore = document.getElementById('see-more-area')
    seeMore.innerHTML = ''
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
}

const render = (gif, place) => {
    return new Promise((resolve, reject) => {
        const searchResults = document.getElementById(`${place}`)
        const div = document.createElement('div')
        const image = document.createElement('p')
        const icons = document.createElement('div')
        const favourite = document.createElement('p')
        const download = document.createElement('p')
        const maximize = document.createElement('p') 
        const popup = document.createElement('div')
        const overlay = document.createElement('div')
        overlay.className = "overlay"
        icons.className="icons"
        div.className="trending-y"
        if(gif.active == true){
            favourite.innerHTML=`<img src= "images/icon-fav-active.svg" alt="favourite" class="favourite-active"/>`
        }else{
            favourite.innerHTML=`<img src= "images/icon-fav-hover.svg" alt="favourite" class="favourite"/>`
        }
        download.innerHTML = `<img src="images/icon-download-hover.svg" alt="download" class="download" />`
        image.innerHTML = `<img src=${gif.images.downsized.url} class="trending-gif" alt="gif" >`  
        popup.innerHTML = `<div class="popup-wrapper" id="popup-wrapper${popId}">
                                <div class="popup">
                                    <div class="popup-close" id="popup-close${popId}">x</div> 
                                    <div class="popup-content" id="popup-content">
                                        <img src=${gif.images.downsized.url} class="pop-up-image" alt="gif" ></img>
                                        <div class="popup-footer">
                                            <div class= "pop-up-data">
                                                <p>${gif.username}</p>
                                                <p>${gif.title}</p>
                                            </div>
                                            <div class="pop-up-icons">
                                                ${favourite.innerHTML}
                                                ${download.innerHTML}
                                            <div>
                                        <div>
                                    </div>
                                </div>
                            </div>`
        maximize.innerHTML = `<img src ="images/icon-max-hover.svg" alt="maximize" class="max" />`
        searchResults.appendChild(div)
        div.appendChild(popup)
        div.appendChild(image)
        div.appendChild(icons)
        div.appendChild(overlay)
        icons.appendChild(favourite)
        icons.appendChild(download)
        icons.appendChild(maximize)
        const id=popId
        image.addEventListener("click", () => maximizeImage(id))
        maximize.addEventListener("click", () => maximizeImage(id))
        download.addEventListener("click", () => downloadImage(gif))
        image.addEventListener("mouseover", () => icons.style.display = "flex")
        image.addEventListener("mouseover", () => overlay.style.display = "flex")
        image.addEventListener("mouseleave", () => overlay.style.display = "none")
        favourite.addEventListener("click", () => favouriteImage(gif, favourite))
        image.addEventListener("click", () => maximizeImage(id))
            
    })
        .then(popId += 1)
        
}

const seeMore = () => {
    const seeMoreArea = document.getElementById('see-more-area')
    seeMoreArea.innerHTML = ""
    const img = document.createElement('img')
    img.src = "images/CTA-ver-mas.svg"
    img.id = "see-more"
    img.className = "see-more"
    seeMoreArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        search()
    })
    img.addEventListener("mouseover", () => img.src = "images/CTA-ver-mas-hover.svg")
    img.addEventListener("mouseout", () => img.src = "images/CTA-ver-mas.svg")
}

const getSearchSuggestions = () => {
    clear()
    const searchSuggestions = document.getElementById("search-suggestions")
    const input = document.getElementById("searchInput")
    const query = input.value
    url= `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${query}&limit=5`
    fetch(url)
    .then(response => response.json())
    .then(topics => topics.data.forEach(renderSearchSuggestion))
    searchSuggestions.innerHTML=''
}

const renderSearchSuggestion = (topic) => {
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
    const seeMoreArea = document.getElementById('see-more-area')
    seeMoreArea.innerHTML = ""
    const img = document.createElement('img')
    img.src = "images/CTA-ver-mas.svg"
    img.id = "see-more"
    img.className = "see-more"
    seeMoreArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        searchForSuggestion(query)
    })

    img.addEventListener("mouseover", () => img.src = "images/CTA-ver-mas-hover.svg")
    img.addEventListener("mouseout", () => img.src = "images/CTA-ver-mas.svg")
}

const maximizeImage = (id) => {
    const popupWrapper = document.getElementById(`popup-wrapper${id}`)
    popupWrapper.style.display = 'block'
    const popupClose = document.getElementById(`popup-close${id}`)
    popupClose.addEventListener("click", () => popupWrapper.style.display ="none")
}

const downloadImage = async (item) => {
    const a = document.createElement("a")
    let response = await fetch(item.images.original.url)
    let file = await response.blob();
    a.download = item.title
    a.href = window.URL.createObjectURL(file)
    a.dataset.downloadurl = ["application/octect-stream", a.download, a.href].join(":")
    a.click()
}

const favouriteImage = (gif, favourite) => {
    const favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || []
    if(!gif.active && !favouriteList.includes(gif)){
        gif.active = true
        localStorage.setItem("favoriteList", JSON.stringify(favouriteList.concat(gif)))
        favourite.innerHTML=`<img src= "images/icon-fav-active.svg" alt="favourite" class="favourite-active"/>`
       console.log(localStorage)
    }else{
        localStorage.setItem("favoriteList", JSON.stringify(favouriteList.filter(item => item.title !== gif.title)))
        gif.active = false
        favourite.innerHTML=`<img src= "images/icon-fav-hover.svg" alt="favourite" class="favourite"/>`
    }
}


const renderFavourites = () =>{
    favouritesSection = document.getElementById("favorites-section")
    favouritesSection.style.display="flex"
    searchSection = document.getElementById("search-section")
    searchSection.style.display = "none"
    const carrousel = document.getElementById('favourites-carrousel')
    carrousel.innerHTML = ''
    if(window.localStorage.length == 0){
        const emptyfav = document.getElementById("empty-fav")
        emptyfav.innerHTML= ''
       const emptyicon = document.createElement("p")
       emptyicon.innerHTML = `<img src ="images/icon-fav-sin-contenido.svg" alt="No hay favoritos" class="empty-favorites" />`
       const emptyfaveMessage = document.createElement("p")
       emptyfaveMessage.className="empty-message"
       emptyfaveMessage.innerHTML="¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"
       emptyfav.appendChild(emptyicon)
       emptyfav.appendChild(emptyfaveMessage)
    }
    else{
       
        place ="favourites-carrousel"
        const arrayOfValues = JSON.parse(localStorage.getItem("favoriteList")) || []
        arrayOfValues.forEach(value => render(value, place)) 
        
    }
}



const crearGifo = () => {
    const favouritesSection = document.getElementById("favorites-section")
    favouritesSection.style.display="none"
    const searchSection = document.getElementById("search-section")
    searchSection.style.display = "none"
    const trendingSection = document.getElementById("trending")
    trendingSection.style.display = "none"
    const createGifoSection = document.getElementById("crear-gifos")
    createGifoSection.style.display = "flex"
    const screenTexts = document.getElementById("textos-pantalla")
    screenTexts.style.display = "flex"
    const botonGrabar = document.getElementById("boton-grabar")
    botonGrabar.style.display="none"
    const botonFinalizar = document.getElementById("boton-finalizar")
    botonFinalizar.style.display="none"
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="none"
}

const pasoUno = () => {
    const screenTexts = document.getElementById("textos-pantalla")
    screenTexts.style.display = "none"
    const uno = document.getElementById("uno")
    uno.src="images/paso-a-paso-hover1.svg"
    const botonComenzar = document.getElementById("boton-crear")
    botonComenzar.style.display="none"
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="flex"
    stream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: { max: 450 }
        }
     })
     .then(function(stream) {
        const screen = document.getElementById("pantalla")
        screen.srcObject = stream
        screen.play()
     })

     .then(pasoDos()) 
}
const pasoDos = () =>{
    const botonGrabar = document.getElementById("boton-grabar")
    botonGrabar.style.display="block"
    const uno = document.getElementById("uno")
    uno.src="images/paso-a-paso1.svg"
    const dos = document.getElementById("dos")
    dos.src="images/paso-a-paso-hover2.svg"
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="none"
    const screen = document.getElementById("pantalla")
    screen.style.display="block"
    botonGrabar.addEventListener("click",() => grabar())
}

const grabar = () => {
    console.log(stream.then())
    const test = stream.then()
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="none"
    const botonGrabar = document.getElementById("boton-grabar")
    botonGrabar.style.display="none"
    const botonFinalizar = document.getElementById("boton-finalizar")
    botonFinalizar.style.display="block"
    botonFinalizar.addEventListener("click", () => finalizar())
    const screen = document.getElementById("pantalla")
    
    // recorder = RecordRTC(stream, {
    //     type: 'gif',
    //     frameRate: 1,
    //     quality: 10,
    //     width: 360,
    //     hidden: 240,
    //     onGifRecordingStarted: function() {
    //      console.log('started')
    //    },
    //   });
    //   recorder.startRecording()    
}

const finalizar = () => {
    const botonFinalizar = document.getElementById("boton-finalizar")
    botonFinalizar.style.display="none"
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="block"
    const screen = document.getElementById("pantalla")
    const stream = screen.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop()
    })
    screen.addEventListener("click", () => playVideo())
    botonSubir.addEventListener("click", () => subirGifo())
}

const playVideo = () => {
    const screen = document.getElementById("pantalla")
    screen.play()
}

const subirGifo = () => {
    console.log("Gifo subido")
}

const keyCheck = (event) => {
    const input = document.getElementById("searchInput")
    input.style.backgroundImage = "url('images/close.svg')";

    if(event.keyCode == 8 || event.keyCode == 46){
        const searchResults = document.getElementById("search-results")
        const seeMoreArea = document.getElementById('see-more-area')
        seeMoreArea.innerHTML = ""
        const searchSuggestions = document.getElementById("search-suggestions")
        searchSuggestions.innerHTML = ''
        searchResults.innerHTML = ''
        counter = 12
    }

    if(event.keyCode == 13){
        search()
    }
}

const clear = () => {
    const createGifoSection = document.getElementById("crear-gifos")
    createGifoSection.style.display = "none"
    const trendingHeader = document.getElementById('trending-topics-header')
    const trendingTopics = document.getElementById('trending-topics')
    const searchResults = document.getElementById('search-results')
    const seeMore = document.getElementById('see-more-area')
    trendingHeader.innerHTML = ''
    trendingTopics.innerHTML = ''
    searchResults.innerHTML = ''
    createGifoSection.innerHTML=''
    seeMore.innerHTML = ''
}

const clearResults = (event) => {
    const searchSuggestions = document.getElementById("search-suggestions")
    searchSuggestions.innerHTML = ''
    const input = document.getElementById("searchInput")
    input.value = ''
    input.style.backgroundImage = "url('images/icon-search.svg')";
    const seeMore = document.getElementById('see-more-area')
    seeMore.innerHTML = ''
}

const clearSeeMore = () => {
    const searchResults = document.getElementById("search-results")
    if(!searchResults.hasChildNodes()){
        const seeMoreArea = document.getElementById('see-more-area')
        seeMoreArea.innerHTML = ""
    }   
}

const showHome = () => {
    const searchSection = document.getElementById("search-section")
    const searchResults = document.getElementById("search-results")
    const seeMoreArea = document.getElementById("see-more-area")
    const trendingSection = document.getElementById("trending")
    trendingSection.style.display ="grid"
    searchSection.style.display = "flex"
    searchResults.innerHTML = ''
    seeMoreArea.innerHTML = ''
    const favouritesSection = document.getElementById("favorites-section")
    favouritesSection.style.display = "none"
    const createGifoSection = document.getElementById("crear-gifos")
    createGifoSection.style.display = "none"
    getTrendingTerms()
    counter = 12
}

const facebook = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
const instagram = document.getElementById("instagram");
const favoritosLink = document.getElementById("favoritos-link")
const createGifo = document.getElementById("boton-crear")



facebook.addEventListener("mouseover", () => facebook.src = "images/icon_facebook_hover.svg")
facebook.addEventListener("mouseout", () => facebook.src = "images/icon_facebook.svg")
twitter.addEventListener("mouseover", () => twitter.src = "images/icon-twitter-hover.svg")
twitter.addEventListener("mouseout", () => twitter.src = "images/icon-twitter.svg")
instagram.addEventListener("mouseover", () => instagram.src = "images/icon_instagram-hover.svg")
instagram.addEventListener("mouseout", () => instagram.src = "images/icon_instagram.svg")
favoritosLink.addEventListener("click", () => renderFavourites())
createGifo.addEventListener("click", () => pasoUno())


getTrendingGifs();
getTrendingTerms();