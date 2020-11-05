const apiKey= "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA"
let offset = 0;
let counter = 12;
let popId = 1;
let stream
let recorder
let blob
let countdown
let folder ="images"
let mode = true

const seemoreArea = document.getElementById('see-more-area')
seemoreArea.innerHTML = ""
const createGifoSection = document.getElementById("crear-gifos")
createGifoSection.style.display = "none"
const trendingSection = document.getElementById("trending")
trendingSection.style.display ="grid"
const myGifos = document.getElementById("myGifos-section")
myGifos.style.display = "none"
const favoritesSection = document.getElementById("favorites-section")
favoritesSection.style.display = "none"
const button = document.getElementById("crear")
button.src = `${folder}/CTA-crear-gifo.svg`
const contar = document.getElementById("contador")
contar.addEventListener("click", pasoDos)
const botonGrabar = document.getElementById("boton-grabar")
botonGrabar.addEventListener("click",() => grabar())
const botonFinalizar = document.getElementById("boton-finalizar")
botonFinalizar.addEventListener("click", () => finalizar())
const botonSubir = document.getElementById("boton-subir")
botonSubir.addEventListener("click", () => subirGifo()) 
const input = document.getElementById("searchInput")
input.addEventListener("click", () => counter = 12)

if(input.value.length !== 0){
    input.addEventListener("click", () => search())
}else{
    counter = 12
    input.addEventListener("click",() => clear() )
}

input.addEventListener("keydown", event => keyCheck(event))

const hoverCreate = () => {
    const image = document.getElementById("crear")
    image.src=`${folder}/CTA-crear-gifo-hover.svg`
}

const offCreate = () =>{
    const image = document.getElementById("crear")
    image.src=`${folder}/CTA-crear-gifo.svg`    
}

const leftHover = () => {
    const image = document.getElementById("left")
    image.src=`${folder}/button-slider-left-hover.svg`
}

const leftOff = () => {
    const image = document.getElementById("left")
    image.src=`${folder}/button-slider-left.svg`
}

const rightHover = () => {
    const image = document.getElementById("right")
    image.src=`${folder}/button-slider-right-hover.svg`
}

const rightOff = () => {
    const image = document.getElementById("right")
    image.src=`${folder}/button-slider-right.svg`
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
    p2.innerHTML = `<img src="${folder}/icon-busqueda-sin-resultado.svg" class="no-results-image" ></img>`
    p3.innerText = "Intenta con otra búsqueda"
    p3.className = "no-results-text"
    searchResults.appendChild(div)
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
}

const render = (gif, place) => {
    return new Promise((resolve, reject) => {
        const currentSection = document.getElementById(`${place}`)
        const div = document.createElement('div')
        const icons = document.createElement('div')
        const popupWrapper = document.createElement('div')
        const overlay = document.createElement('div')
        const favourite = document.createElement('img')
        const image = document.createElement('img')
        const download = document.createElement('img')
        const maximize = document.createElement('img') 
        
        overlay.className = "overlay"
        icons.className="icons"
        div.className="trending-y"
        div.id="trending-y"
        const favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || []
        if(favouriteList.every(item => gif.id !== item.id)){
            favourite.src= `${folder}/icon-fav-hover.svg` 
            favourite.alt="favourite" 
            favourite.className="favourite"
        }else{
            favourite.src= `${folder}/icon-fav-active.svg` 
            favourite.alt="favourite" 
            favourite.className="favourite-active"     
        }
        maximize.src = `${folder}/icon-max-hover.svg` 
        maximize.alt="maximize" 
        maximize.className="max"
        download.src=`${folder}/icon-download-hover.svg` 
        download.alt="download" 
        download.className="download"
        image.src = gif.images.downsized.url
        image.className="trending-gif" 
        image.alt="gif"  
        popupWrapper.className="popup-wrapper"
        popupWrapper.id=`popup-wrapper${popId}`
        const popup = document.createElement("div")
        popup.className ="popup"
        const popupClose = document.createElement('div')
        popupClose.className="popup-close"
        popupClose.id=`popup-close${popId}`
        popupClose.innerHTML="X"
        const popupContent = document.createElement('div')
        popupContent.className = "popup-content"
        popupContent.id = "popup-content"
        const popupImage = document.createElement('img')
        popupImage.src = gif.images.downsized.url
        popupImage.className = "pop-up-image"
        popupImage.alt = "gif"
        const popupFooter = document.createElement('div')
        popupFooter.className="popup-footer"
        const popupData = document.createElement('div')
        popupData.className = "pop-up-data"            
        const username = document.createElement('p')
        username.innerHTML=gif.username
        const title = document.createElement('p')
        title.innerHTML = gif.title            
        const popupIcons = document.createElement('div')
        popupIcons.className = "pop-up-icons"
        popupWrapper.appendChild(popup)
        popup.appendChild(popupClose)
        popup.appendChild(popupContent)
        popupContent.appendChild(popupImage)
        popupContent.appendChild(popupFooter)
        popupFooter.appendChild(popupData)
        popupFooter.appendChild(popupIcons)
        const fav2 = document.createElement('img')
        if(favouriteList.every(item => gif.id !== item.id)){
            fav2.src= `${folder}/icon-fav-hover.svg` 
            fav2.alt="favourite" 
            fav2.className="favourite"
        }else{
            fav2.src= `${folder}/icon-fav-active.svg` 
            fav2.alt="favourite" 
            fav2.className="favourite-active"     
        }
        popupIcons.appendChild(fav2)
        const down2 = document.createElement('img')
        down2.src=`${folder}/icon-download-hover.svg` 
        down2.alt="download" 
        down2.className="download"
        popupIcons.appendChild(down2)
        popupData.appendChild(username)
        popupData.appendChild(title)
        
        currentSection.appendChild(div)
        div.appendChild(popupWrapper)
        div.appendChild(image)
        div.appendChild(overlay)
        div.appendChild(icons)
        icons.appendChild(favourite)
        icons.appendChild(download)
        icons.appendChild(maximize)
        const id=popId
        image.addEventListener("click", () => maximizeImage(id))
        maximize.addEventListener("click", () => maximizeImage(id))
        download.addEventListener("click", () => downloadImage(gif))
        down2.addEventListener("click", () => downloadImage(gif))
        image.addEventListener("mouseenter", () => overlay.style.display = "flex")
        image.addEventListener("mouseleave", () => overlay.style.display = "none")
       
        image.addEventListener("click", () => maximizeImage(id))
        favourite.addEventListener("click", () => favouriteImage(gif))
        fav2.addEventListener("click", () => favouriteImage(gif))
        fav2.addEventListener("click", () => changeHeart(fav2))
        favourite.addEventListener("click", () => changeHeart(favourite))
        image.addEventListener("click", () => maximizeImage(id))      
    })
        .then(popId += 1)
        
}

const seeMore = () => {
    const seeMoreArea = document.getElementById('see-more-area')
    seeMoreArea.innerHTML = ""
    const img = document.createElement('img')
    img.src = `${folder}/CTA-ver-mas.svg`
    img.id = "see-more"
    img.className = "see-more"
    seeMoreArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        search()
    })
    img.addEventListener("mouseover", () => img.src = `${folder}/CTA-ver-mas-hover.svg`)
    img.addEventListener("mouseout", () => img.src = `${folder}/CTA-ver-mas.svg`)
}

const getSearchSuggestions = () => {
    clear()
    const searchSuggestions = document.getElementById("search-suggestions")
    searchSuggestions.addEventListener("click", () => counter = 12)
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
    p.innerHTML = `<img src="${folder}/icon-search.svg" alt="search"/>${topic.name}`
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
    img.src = `${folder}/CTA-ver-mas.svg`
    img.id = "see-more"
    img.className = "see-more"
    seeMoreArea.appendChild(img)
    img.addEventListener("click", () => {
        counter += 12
        searchForSuggestion(query)
    })

    img.addEventListener("mouseover", () => img.src = `${folder}/CTA-ver-mas-hover.svg`)
    img.addEventListener("mouseout", () => img.src = `${folder}/CTA-ver-mas.svg`)
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

const changeHeart = (favourite, gif) => {
    if(favourite.src==`${folder}/icon-fav-hover.svg`){
        favourite.src=`${folder}/icon-fav-active.svg` 
        favourite.alt="favourite" 
        favourite.class="favourite-active"
        window.location.reload()
        
    }
    if(favourite.src=`${folder}/icon-fav-active.svg`){
        favourite.src=`${folder}/icon-fav-hover.svg` 
        favourite.alt="favourite" 
        favourite.className="favourite"
        window.location.reload()
    }
}

const favouriteImage = (gif) => {
    const favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || []
    if(favouriteList.every(item => gif.id !== item.id)){
        localStorage.setItem("favoriteList", JSON.stringify(favouriteList.concat(gif)))
       console.log(localStorage)
    }else{
        localStorage.setItem("favoriteList", JSON.stringify(favouriteList.filter(item => item.title !== gif.title))) 
        renderFavourites() 
    }
}


const renderFavourites = () =>{
    const favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || []
    favouritesSection = document.getElementById("favorites-section")
    favouritesSection.style.display="flex"
    const myGifos = document.getElementById("myGifos-section")
    myGifos.style.display = "none"
    searchSection = document.getElementById("search-section")
    searchSection.style.display = "none"
    const carrousel = document.getElementById('favourites-carrousel')
    carrousel.innerHTML = ''
    if(favouriteList.length == 0){
        const emptyfav = document.getElementById("empty-fav")
        emptyfav.innerHTML= ''
       const emptyicon = document.createElement("p")
       emptyicon.innerHTML = `<img src ="${folder}/icon-fav-sin-contenido.svg" alt="No hay favoritos" class="empty-favorites" />`
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
    const button = document.getElementById("crear")
    button.src = `${folder}/CTA-crear-gifo-active.svg`
    const myGifos = document.getElementById("myGifos-section")
    myGifos.style.display = "none"
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
    const screen = document.getElementById("pantalla")
    screen.style.display="none"
    const previewImage = document.getElementById("preview-image")
    previewImage.style.display = "none"
    const purpleOverlay = document.getElementById("purple-overlay")
    purpleOverlay.style.display = "none"
    const loading = document.getElementById("loading")
    loading.style.display = "none"
    const loadingText = document.getElementById("loading-text")
    loadingText.style.display = "none"
}

const pasoUno = () => {
    const screenTexts = document.getElementById("textos-pantalla")
    screenTexts.style.display = "none"
    const uno = document.getElementById("uno")
    uno.src=`${folder}/paso-a-paso-hover1.svg`
    const botonComenzar = document.getElementById("boton-crear")
    botonComenzar.style.display="none"
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="none"
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="flex"
    stream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: { max: 450 }
        }
     })
     .then(function(mediaStream) {
        const screen = document.getElementById("pantalla")
        screen.srcObject = mediaStream
        screen.play()
        stream = mediaStream
     })

     .then(pasoDos()) 
}

function pasoDos (){
    const previewImage = document.getElementById("preview-image")
    previewImage.style.display = "none"
    const contador = document.getElementById("contador")
    contador.style.display ="block"
    botonGrabar.style.display="block"
    const uno = document.getElementById("uno")
    uno.src=`${folder}/paso-a-paso1.svg`
    const dos = document.getElementById("dos")
    dos.src=`${folder}/paso-a-paso-hover2.svg`
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="none"
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="none"
    const screen = document.getElementById("pantalla")
    screen.style.display="block"
  
}

function grabar() {
    const screenTexts2 = document.getElementById("textos-pantalla-2")
    screenTexts2.style.display="none"
    const botonGrabar = document.getElementById("boton-grabar")
    botonGrabar.style.display="none"
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="none"
    botonFinalizar.style.display="block"
   
    contador() 
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        height: 370,
        width: 430,
        hidden: 240,
        onGifRecordingStarted: function() {
         console.log('started')
       },
      });
      recorder.startRecording()        
}

const contador = () => {
    let sec = 0
    let min = 0
    let hour = 0
    countdown = setInterval(function (){
        const counter = document.getElementById("contador")
        counter.innerHTML = `${hour}:${min}:${sec}`
        sec++
        if(sec == 60) {
            sec = 0
            min++
            if(min == 60){
                min = 0
                hour++
            }
        }
    }, 1000)
}

function finalizar(){
    clearInterval(countdown)
    const counter = document.getElementById("contador")
    counter.innerHTML = ""
    counter.innerHTML = "REPETIR CAPTURA"
    const botonFinalizar = document.getElementById("boton-finalizar")
    botonFinalizar.style.display="none"
   
    botonSubir.style.display="block"
    recorder.stopRecording()
    blob = recorder.getBlob()
    let urlCreator = window.URL || window.webkitURL
    let imageURL = urlCreator.createObjectURL(blob)
    const screen = document.getElementById("pantalla")
    screen.style.display= "none"
    const previewImage = document.getElementById("preview-image")
    previewImage.src = imageURL
    previewImage.style.display = "block"
         
}

function subirGifo (){
    const botonSubir = document.getElementById("boton-subir")
    botonSubir.style.display="none"
    const botonFinalizar = document.getElementById("boton-finalizar")
    botonFinalizar.style.display="none"
    const dos = document.getElementById("dos")
    dos.src=`${folder}/paso-a-paso2.svg`
    const tres = document.getElementById("tres")
    tres.src=`${folder}/paso-a-paso-hover3.svg`
    const form = new FormData()
    form.append("file", blob, "myGif.gif")
    form.append("tags", "gif, person, funny")
    const overlay = document.getElementById("purple-overlay")
    overlay.style.display = "block"
    const loading = document.getElementById("loading")
    const loadingText = document.getElementById("loading-text")
    loading.style.display = "block"
    loadingText.style.display = "block"
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
        method: "POST",
        body: form,
    })
    .then(response =>response.json())
    .then(response => guardarMiGifo(response.data.id))
}

const guardarMiGifo = (id) => {
    const loading = document.getElementById("loading")
    const loadingText = document.getElementById("loading-text")
    loading.src=`${folder}/check.svg`
    loadingText.innerText="Gifo subido con éxito"
    url = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`
    fetch(url)
    .then(response =>response.json())
    .then(gif => addGifToMyList(gif.data))    
}

const addGifToMyList = (gif) => {
    const myGifoList = JSON.parse(localStorage.getItem("myGifoList")) || []
    localStorage.setItem("myGifoList", JSON.stringify(myGifoList.concat(gif)))
}
const renderMyGifos = () => {
    const trending = document.getElementById("trending")
    trending.style.display = "block"
    const carrousel = document.getElementById('myGifos-carrousel')
    carrousel.innerHTML = ''
    const favouritesSection = document.getElementById("favorites-section")
    favouritesSection.style.display="none"
    const searchSection = document.getElementById("search-section")
    searchSection.style.display = "none"
    const createGifoSection = document.getElementById("crear-gifos")
    createGifoSection.style.display = "none"
    const myGifos = document.getElementById("myGifos-section")
    myGifos.style.display = "flex"
    
    const myGifoList = JSON.parse(localStorage.getItem("myGifoList")) || []
    if(myGifoList.length == 0 || window.localStorage.length == 0){
        const emptyMyGifos = document.getElementById("empty-myGifos")
        emptyMyGifos.style.display = "flex"
        emptyMyGifos.innerHTML= ''
       const emptyicon = document.createElement("p")
       emptyicon.innerHTML = `<img src ="${folder}/icon-mis-gifos-sin-contenido.svg" alt="No hay gifos" class="empty-myGifos" />`
       const emptyfaveMessage = document.createElement("p")
       emptyfaveMessage.className="empty-message"
       emptyfaveMessage.innerHTML="¡Anímate a crear tu primer GIFO!"
       emptyMyGifos.appendChild(emptyicon)
       emptyMyGifos.appendChild(emptyfaveMessage)
    }else{
        place ="myGifos-carrousel"
        const arrayOfValues = JSON.parse(localStorage.getItem("myGifoList")) || []
        console.log(arrayOfValues)
        arrayOfValues.forEach(value => render(value, place)) 
    }
}


const keyCheck = (event) => {
    const input = document.getElementById("searchInput")
    input.style.backgroundImage = `url('${folder}/close.svg')`;

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
    const myGifos = document.getElementById("myGifos-section")
    myGifos.style.display = "none"
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
    input.style.backgroundImage = `url('${folder}/icon-search.svg')`;
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
    const button = document.getElementById("crear")
    button.src = `${folder}/CTA-crear-gifo.svg`
    const myGifos = document.getElementById("myGifos-section")
    myGifos.style.display = "none"
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
    counter = 12
}

const darkmode = () => {
    const head = document.getElementById("head")
    const crearPic = document.getElementById("crear")
    const camaraPic = document.getElementById("camara")
    const luzPic = document.getElementById("luz-camara")
    const cintaPic = document.getElementById("cinta")
    const paso1Pic = document.getElementById("uno")
    const paso2Pic = document.getElementById("dos")
    const paso3Pic = document.getElementById("tres")
    const leftPic = document.getElementById("left")
    const rightPic = document.getElementById("right")
    if(mode){
        const cssLink = document.createElement("link")
        cssLink.href="styles/stylesheet-dark.css"
        cssLink.rel="stylesheet"
        cssLink.type="text/css"
        cssLink.id="cssLink"
        head.appendChild(cssLink)
        const modeLink = document.getElementById("dark-mode")
        modeLink.innerText="Modo Diurno"
        folder = "images-dark"
        mode = false;
        window.location.reload
        crearPic.src = "images-dark/CTA-crear-gifo.svg"
        camaraPic.src="images-dark/camara.svg"
        luzPic.src="images-dark/element-luz-camara.svg"
        cintaPic.src="images-dark/pelicula.svg"
        paso1Pic.src="images-dark/paso-a-paso1.svg"
        paso2Pic.src="images-dark/paso-a-paso2.svg"
        paso3Pic.src="images-dark/paso-a-paso3.svg"
        leftPic.src="images-dark/button-slider-left.svg"
        rightPic.src="images-dark/button-slider-right.svg"
        
        
    }else{
        const ccsLink = document.getElementById("cssLink")
        head.removeChild(cssLink)
        const modeLink = document.getElementById("dark-mode")
        modeLink.innerText="Modo Nocturno"
        crearPic.src = "images/CTA-crear-gifo.svg"
        camaraPic.src="images/camara.svg"
        luzPic.src="images/element-luz-camara.svg"
        cintaPic.src="images/pelicula.svg"
        paso1Pic.src="images/paso-a-paso1.svg"
        paso2Pic.src="images/paso-a-paso2.svg"
        paso3Pic.src="images/paso-a-paso3.svg"
        leftPic.src="images/button-slider-left.svg"
        rightPic.src="images/button-slider-right.svg"
        folder ="images"
        mode = true
        window.location.reload
    }
}



const facebook = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
const instagram = document.getElementById("instagram");
const favoritosLink = document.getElementById("favoritos-link")
const createGifo = document.getElementById("boton-crear")
const darkMode = document.getElementById("dark-mode")
const logo = document.getElementById("logo")
const favoritesLink = document.getElementById("favoritos-link")
const myGifosLink = document.getElementById("myGifos-link")
const crearLink = document.getElementById("crear")
const leftButton = document.getElementById("left")
const rightButton = document.getElementById("right")



facebook.addEventListener("mouseover", () => facebook.src = `${folder}/icon_facebook_hover.svg`)
facebook.addEventListener("mouseout", () => facebook.src = `${folder}/icon_facebook.svg`)
twitter.addEventListener("mouseover", () => twitter.src = `${folder}/icon-twitter-hover.svg`)
twitter.addEventListener("mouseout", () => twitter.src = `${folder}/icon-twitter.svg`)
instagram.addEventListener("mouseover", () => instagram.src = `${folder}/icon_instagram-hover.svg`)
instagram.addEventListener("mouseout", () => instagram.src = `${folder}/icon_instagram.svg`)
favoritosLink.addEventListener("click", () => renderFavourites())
createGifo.addEventListener("click", () => pasoUno())
darkMode.addEventListener("click", () =>darkmode())
logo.addEventListener("click", () => showHome())
favoritesLink.addEventListener("click", () => renderFavourites())
myGifosLink.addEventListener("click", () => renderMyGifos())
crearLink.addEventListener("mouseover", () => hoverCreate())
crearLink.addEventListener("mouseout", () => offCreate())
crearLink.addEventListener("click", () => crearGifo())
leftButton.addEventListener("mouseover", () => leftHover())
leftButton.addEventListener("mouseout", () => leftOff())
leftButton.addEventListener("click", ()=> carrouselLeft())
rightButton.addEventListener("mouseover", () => rightHover())
rightButton.addEventListener("mouseout", () => rightOff())
rightButton.addEventListener("click", ()=> carrouselRight())




getTrendingGifs();
getTrendingTerms();