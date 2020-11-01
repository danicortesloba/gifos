"use strict";

var apiKey = "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA";
var offset = 0;
var counter = 12;
var popId = 1;
var stream;
var recorder;
var blob;
var countdown;
var folder = "images";
var mode = true;
var seemoreArea = document.getElementById('see-more-area');
seemoreArea.innerHTML = "";
var createGifoSection = document.getElementById("crear-gifos");
createGifoSection.style.display = "none";
var trendingSection = document.getElementById("trending");
trendingSection.style.display = "grid";
var myGifos = document.getElementById("myGifos-section");
myGifos.style.display = "none";
var favoritesSection = document.getElementById("favorites-section");
favoritesSection.style.display = "none";
var button = document.getElementById("crear");
button.src = "".concat(folder, "/button-crear-gifo.svg");
var contar = document.getElementById("contador");
contar.addEventListener("click", pasoDos);
var botonGrabar = document.getElementById("boton-grabar");
botonGrabar.addEventListener("click", function () {
  return grabar();
});
var botonFinalizar = document.getElementById("boton-finalizar");
botonFinalizar.addEventListener("click", function () {
  return finalizar();
});
var botonSubir = document.getElementById("boton-subir");
botonSubir.addEventListener("click", function () {
  return subirGifo();
});
var input = document.getElementById("searchInput");

if (input.value.length !== 0) {
  input.addEventListener("click", function () {
    return search();
  });
} else {
  counter = 12;
  input.addEventListener("click", function () {
    return clear();
  });
}

input.addEventListener("keydown", function (event) {
  return keyCheck(event);
});

var hoverCreate = function hoverCreate() {
  var image = document.getElementById("crear");
  image.src = "".concat(folder, "/CTA-crear-gifo-hover.svg");
};

var offCreate = function offCreate() {
  var image = document.getElementById("crear");
  image.src = "".concat(folder, "/button-crear-gifo.svg");
};

var leftHover = function leftHover() {
  var image = document.getElementById("left");
  image.src = "".concat(folder, "/button-slider-left-hover.svg");
};

var leftOff = function leftOff() {
  var image = document.getElementById("left");
  image.src = "".concat(folder, "/button-slider-left.svg");
};

var rightHover = function rightHover() {
  var image = document.getElementById("right");
  image.src = "".concat(folder, "/button-slider-right-hover.svg");
};

var rightOff = function rightOff() {
  var image = document.getElementById("right");
  image.src = "".concat(folder, "/button-slider-right.svg");
};

var carrouselRight = function carrouselRight() {
  var place = "trending-carrousel";
  var trending = document.getElementById("trending-carrousel");
  trending.innerHTML = "";
  offset += 3;
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(function (gif) {
      return render(gif, place);
    });
  });
};

var carrouselLeft = function carrouselLeft() {
  var place = "trending-carrousel";
  offset -= 3;
  var trending = document.getElementById("trending-carrousel");
  trending.innerHTML = "";
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(function (gif) {
      return render(gif, place);
    });
  });
};

var getTrendingGifs = function getTrendingGifs() {
  var place = "trending-carrousel";
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(function (gif) {
      return render(gif, place);
    });
  });
};

var getTrendingTerms = function getTrendingTerms() {
  url = "https://api.giphy.com/v1/trending/searches?api_key=".concat(apiKey);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.splice(0, 5);
  }).then(function (response) {
    return response.forEach(function (term) {
      return renderTrendingTerms(term);
    });
  });
};

var renderTrendingTerms = function renderTrendingTerms(term) {
  var termsSection = document.getElementById("trending-topics");
  var p = document.createElement("p");
  p.innerText = term;
  termsSection.appendChild(p);
  p.style.marginRight = "10px";
  p.addEventListener("click", function () {
    return searchForSuggestion(term);
  });
};

var search = function search() {
  clear();
  var input = document.getElementById("searchInput");
  var query = input.value;
  url = "https://api.giphy.com/v1/gifs/search?api_key=".concat(apiKey, "&q=").concat(query, "&limit=").concat(counter, "&offset=0");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return showResults(response);
  }).then(function (response) {
    return seeMore(response);
  }).then(function (response) {
    return clearSeeMore();
  });
};

var showResults = function showResults(response) {
  var input = document.getElementById("searchInput");
  var seeMore = document.getElementById('see-more-area');
  seeMore.innerHTML = "";

  if (response.data.length == 0 && input.value.length !== 0) {
    renderNoResults();
  } else {
    clear();
    var _place = "search-results";
    response.data.forEach(function (gif) {
      return render(gif, _place);
    });
  }
};

var renderNoResults = function renderNoResults() {
  var seeMore = document.getElementById('see-more-area');
  seeMore.innerHTML = '';
  var searchResults = document.getElementById("search-results");
  searchResults.innerHTML = '';
  var div = document.createElement('div');
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var p3 = document.createElement('p');
  div.className = "no-results";
  p1.innerText = input.value;
  p1.className = "no-results-title";
  p2.innerHTML = "<img src=\"".concat(folder, "/icon-busqueda-sin-resultado.svg\" class=\"no-results-image\" ></img>");
  p3.innerText = "Intenta con otra búsqueda";
  p3.className = "no-results-text";
  searchResults.appendChild(div);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
};

var render = function render(gif, place) {
  return new Promise(function (resolve, reject) {
    var currentSection = document.getElementById("".concat(place));
    var div = document.createElement('div');
    var icons = document.createElement('div');
    var popupWrapper = document.createElement('div');
    var overlay = document.createElement('div');
    var favourite = document.createElement('img');
    var image = document.createElement('img');
    var download = document.createElement('img');
    var maximize = document.createElement('img');
    overlay.className = "overlay";
    icons.className = "icons";
    div.className = "trending-y";
    div.id = "trending-y";
    var favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

    if (favouriteList.every(function (item) {
      return gif.id !== item.id;
    })) {
      favourite.src = "".concat(folder, "/icon-fav-hover.svg");
      favourite.alt = "favourite";
      favourite.className = "favourite";
    } else {
      favourite.src = "".concat(folder, "/icon-fav-active.svg");
      favourite.alt = "favourite";
      favourite.className = "favourite-active";
    }

    maximize.src = "".concat(folder, "/icon-max-hover.svg");
    maximize.alt = "maximize";
    maximize.className = "max";
    download.src = "".concat(folder, "/icon-download-hover.svg");
    download.alt = "download";
    download.className = "download";
    image.src = gif.images.downsized.url;
    image.className = "trending-gif";
    image.alt = "gif";
    popupWrapper.className = "popup-wrapper";
    popupWrapper.id = "popup-wrapper".concat(popId);
    var popup = document.createElement("div");
    popup.className = "popup";
    var popupClose = document.createElement('div');
    popupClose.className = "popup-close";
    popupClose.id = "popup-close".concat(popId);
    popupClose.innerHTML = "X";
    var popupContent = document.createElement('div');
    popupContent.className = "popup-content";
    popupContent.id = "popup-content";
    var popupImage = document.createElement('img');
    popupImage.src = gif.images.downsized.url;
    popupImage.className = "pop-up-image";
    popupImage.alt = "gif";
    var popupFooter = document.createElement('div');
    popupFooter.className = "popup-footer";
    var popupData = document.createElement('div');
    popupData.className = "pop-up-data";
    var username = document.createElement('p');
    username.innerHTML = gif.username;
    var title = document.createElement('p');
    title.innerHTML = gif.title;
    var popupIcons = document.createElement('div');
    popupIcons.className = "pop-up-icons";
    popupWrapper.appendChild(popup);
    popup.appendChild(popupClose);
    popup.appendChild(popupContent);
    popupContent.appendChild(popupImage);
    popupContent.appendChild(popupFooter);
    popupFooter.appendChild(popupData);
    popupFooter.appendChild(popupIcons);
    var fav2 = document.createElement('img');

    if (favouriteList.every(function (item) {
      return gif.id !== item.id;
    })) {
      fav2.src = "".concat(folder, "/icon-fav-hover.svg");
      fav2.alt = "favourite";
      fav2.className = "favourite";
    } else {
      fav2.src = "".concat(folder, "/icon-fav-active.svg");
      fav2.alt = "favourite";
      fav2.className = "favourite-active";
    }

    popupIcons.appendChild(fav2);
    var down2 = document.createElement('img');
    down2.src = "".concat(folder, "/icon-download-hover.svg");
    down2.alt = "download";
    down2.className = "download";
    popupIcons.appendChild(down2);
    popupData.appendChild(username);
    popupData.appendChild(title);
    currentSection.appendChild(div);
    div.appendChild(popupWrapper);
    div.appendChild(image);
    div.appendChild(overlay);
    div.appendChild(icons);
    icons.appendChild(favourite);
    icons.appendChild(download);
    icons.appendChild(maximize);
    var id = popId;
    image.addEventListener("click", function () {
      return maximizeImage(id);
    });
    maximize.addEventListener("click", function () {
      return maximizeImage(id);
    });
    download.addEventListener("click", function () {
      return downloadImage(gif);
    });
    down2.addEventListener("click", function () {
      return downloadImage(gif);
    });
    image.addEventListener("mouseenter", function () {
      return overlay.style.display = "flex";
    });
    image.addEventListener("mouseleave", function () {
      return overlay.style.display = "none";
    });
    image.addEventListener("click", function () {
      return maximizeImage(id);
    });
    favourite.addEventListener("click", function () {
      return favouriteImage(gif);
    });
    fav2.addEventListener("click", function () {
      return favouriteImage(gif);
    });
    fav2.addEventListener("click", function () {
      return changeHeart(fav2);
    });
    favourite.addEventListener("click", function () {
      return changeHeart(favourite);
    });
    image.addEventListener("click", function () {
      return maximizeImage(id);
    });
  }).then(popId += 1);
};

var seeMore = function seeMore() {
  var seeMoreArea = document.getElementById('see-more-area');
  seeMoreArea.innerHTML = "";
  var img = document.createElement('img');
  img.src = "".concat(folder, "/CTA-ver-mas.svg");
  img.id = "see-more";
  img.className = "see-more";
  seeMoreArea.appendChild(img);
  img.addEventListener("click", function () {
    counter += 12;
    search();
  });
  img.addEventListener("mouseover", function () {
    return img.src = "".concat(folder, "/CTA-ver-mas-hover.svg");
  });
  img.addEventListener("mouseout", function () {
    return img.src = "".concat(folder, "/CTA-ver-mas.svg");
  });
};

var getSearchSuggestions = function getSearchSuggestions() {
  clear();
  var searchSuggestions = document.getElementById("search-suggestions");
  var input = document.getElementById("searchInput");
  var query = input.value;
  url = "https://api.giphy.com/v1/gifs/search/tags?api_key=".concat(apiKey, "&q=").concat(query, "&limit=5");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (topics) {
    return topics.data.forEach(renderSearchSuggestion);
  });
  searchSuggestions.innerHTML = '';
};

var renderSearchSuggestion = function renderSearchSuggestion(topic) {
  var input = document.getElementById("searchInput");
  var searchSuggestions = document.getElementById("search-suggestions");
  var p = document.createElement('p');
  p.innerHTML = "<img src=\"".concat(folder, "/icon-search.svg\" alt=\"search\"/>").concat(topic.name);
  p.className = "topic";
  searchSuggestions.appendChild(p);
  p.addEventListener('click', function () {
    return searchForSuggestion("".concat(topic.name));
  });
  input.addEventListener("keydown", function (event) {
    return keyCheck(event);
  });
  input.addEventListener("click", function (event) {
    return clearResults(event);
  });
};

var searchForSuggestion = function searchForSuggestion(query) {
  clear();
  url = "https://api.giphy.com/v1/gifs/search?api_key=".concat(apiKey, "&q=").concat(query, "&limit=").concat(counter, "&offset=0");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return showResults(response);
  }).then(function (response) {
    return seeMoreSuggested(query);
  }).then(function (response) {
    return clearSeeMore();
  });
};

var seeMoreSuggested = function seeMoreSuggested(query) {
  var seeMoreArea = document.getElementById('see-more-area');
  seeMoreArea.innerHTML = "";
  var img = document.createElement('img');
  img.src = "".concat(folder, "/CTA-ver-mas.svg");
  img.id = "see-more";
  img.className = "see-more";
  seeMoreArea.appendChild(img);
  img.addEventListener("click", function () {
    counter += 12;
    searchForSuggestion(query);
  });
  img.addEventListener("mouseover", function () {
    return img.src = "".concat(folder, "/CTA-ver-mas-hover.svg");
  });
  img.addEventListener("mouseout", function () {
    return img.src = "".concat(folder, "/CTA-ver-mas.svg");
  });
};

var maximizeImage = function maximizeImage(id) {
  var popupWrapper = document.getElementById("popup-wrapper".concat(id));
  popupWrapper.style.display = 'block';
  var popupClose = document.getElementById("popup-close".concat(id));
  popupClose.addEventListener("click", function () {
    return popupWrapper.style.display = "none";
  });
};

var downloadImage = function downloadImage(item) {
  var a, response, file;
  return regeneratorRuntime.async(function downloadImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          a = document.createElement("a");
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(item.images.original.url));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.blob());

        case 6:
          file = _context.sent;
          a.download = item.title;
          a.href = window.URL.createObjectURL(file);
          a.dataset.downloadurl = ["application/octect-stream", a.download, a.href].join(":");
          a.click();

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

var changeHeart = function changeHeart(favourite, gif) {
  if (favourite.src == "".concat(folder, "/icon-fav-hover.svg")) {
    favourite.src = "".concat(folder, "/icon-fav-active.svg");
    favourite.alt = "favourite";
    favourite["class"] = "favourite-active";
    window.location.reload();
  }

  if (favourite.src = "".concat(folder, "/icon-fav-active.svg")) {
    favourite.src = "".concat(folder, "/icon-fav-hover.svg");
    favourite.alt = "favourite";
    favourite.className = "favourite";
    window.location.reload();
  }
};

var favouriteImage = function favouriteImage(gif) {
  var favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

  if (favouriteList.every(function (item) {
    return gif.id !== item.id;
  })) {
    localStorage.setItem("favoriteList", JSON.stringify(favouriteList.concat(gif)));
    console.log(localStorage);
  } else {
    localStorage.setItem("favoriteList", JSON.stringify(favouriteList.filter(function (item) {
      return item.title !== gif.title;
    })));
    renderFavourites();
  }
};

var renderFavourites = function renderFavourites() {
  var favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  favouritesSection = document.getElementById("favorites-section");
  favouritesSection.style.display = "flex";
  var myGifos = document.getElementById("myGifos-section");
  myGifos.style.display = "none";
  searchSection = document.getElementById("search-section");
  searchSection.style.display = "none";
  var carrousel = document.getElementById('favourites-carrousel');
  carrousel.innerHTML = '';

  if (favouriteList.length == 0) {
    var emptyfav = document.getElementById("empty-fav");
    emptyfav.innerHTML = '';
    var emptyicon = document.createElement("p");
    emptyicon.innerHTML = "<img src =\"".concat(folder, "/icon-fav-sin-contenido.svg\" alt=\"No hay favoritos\" class=\"empty-favorites\" />");
    var emptyfaveMessage = document.createElement("p");
    emptyfaveMessage.className = "empty-message";
    emptyfaveMessage.innerHTML = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
    emptyfav.appendChild(emptyicon);
    emptyfav.appendChild(emptyfaveMessage);
  } else {
    place = "favourites-carrousel";
    var arrayOfValues = JSON.parse(localStorage.getItem("favoriteList")) || [];
    arrayOfValues.forEach(function (value) {
      return render(value, place);
    });
  }
};

var crearGifo = function crearGifo() {
  var button = document.getElementById("crear");
  button.src = "".concat(folder, "/CTA-crear-gifo-active.svg");
  var myGifos = document.getElementById("myGifos-section");
  myGifos.style.display = "none";
  var favouritesSection = document.getElementById("favorites-section");
  favouritesSection.style.display = "none";
  var searchSection = document.getElementById("search-section");
  searchSection.style.display = "none";
  var trendingSection = document.getElementById("trending");
  trendingSection.style.display = "none";
  var createGifoSection = document.getElementById("crear-gifos");
  createGifoSection.style.display = "flex";
  var screenTexts = document.getElementById("textos-pantalla");
  screenTexts.style.display = "flex";
  var botonGrabar = document.getElementById("boton-grabar");
  botonGrabar.style.display = "none";
  var botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.style.display = "none";
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "none";
  var screen = document.getElementById("pantalla");
  screen.style.display = "none";
  var previewImage = document.getElementById("preview-image");
  previewImage.style.display = "none";
  var purpleOverlay = document.getElementById("purple-overlay");
  purpleOverlay.style.display = "none";
  var loading = document.getElementById("loading");
  loading.style.display = "none";
  var loadingText = document.getElementById("loading-text");
  loadingText.style.display = "none";
};

var pasoUno = function pasoUno() {
  var screenTexts = document.getElementById("textos-pantalla");
  screenTexts.style.display = "none";
  var uno = document.getElementById("uno");
  uno.src = "".concat(folder, "/paso-a-paso-hover1.svg");
  var botonComenzar = document.getElementById("boton-crear");
  botonComenzar.style.display = "none";
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "none";
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "flex";
  stream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: {
        max: 450
      }
    }
  }).then(function (mediaStream) {
    var screen = document.getElementById("pantalla");
    screen.srcObject = mediaStream;
    screen.play();
    stream = mediaStream;
  }).then(pasoDos());
};

function pasoDos() {
  var previewImage = document.getElementById("preview-image");
  previewImage.style.display = "none";
  var contador = document.getElementById("contador");
  contador.style.display = "block";
  botonGrabar.style.display = "block";
  var uno = document.getElementById("uno");
  uno.src = "".concat(folder, "/paso-a-paso1.svg");
  var dos = document.getElementById("dos");
  dos.src = "".concat(folder, "/paso-a-paso-hover2.svg");
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "none";
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "none";
  var screen = document.getElementById("pantalla");
  screen.style.display = "block";
}

function grabar() {
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "none";
  var botonGrabar = document.getElementById("boton-grabar");
  botonGrabar.style.display = "none";
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "none";
  botonFinalizar.style.display = "block";
  contador();
  recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    height: 370,
    width: 430,
    hidden: 240,
    onGifRecordingStarted: function onGifRecordingStarted() {
      console.log('started');
    }
  });
  recorder.startRecording();
}

var contador = function contador() {
  var sec = 0;
  var min = 0;
  var hour = 0;
  countdown = setInterval(function () {
    var counter = document.getElementById("contador");
    counter.innerHTML = "".concat(hour, ":").concat(min, ":").concat(sec);
    sec++;

    if (sec == 60) {
      sec = 0;
      min++;

      if (min == 60) {
        min = 0;
        hour++;
      }
    }
  }, 1000);
};

function finalizar() {
  clearInterval(countdown);
  var counter = document.getElementById("contador");
  counter.innerHTML = "";
  counter.innerHTML = "REPETIR CAPTURA";
  var botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.style.display = "none";
  botonSubir.style.display = "block";
  recorder.stopRecording();
  blob = recorder.getBlob();
  var urlCreator = window.URL || window.webkitURL;
  var imageURL = urlCreator.createObjectURL(blob);
  var screen = document.getElementById("pantalla");
  screen.style.display = "none";
  var previewImage = document.getElementById("preview-image");
  previewImage.src = imageURL;
  previewImage.style.display = "block";
}

function subirGifo() {
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "none";
  var botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.style.display = "none";
  var dos = document.getElementById("dos");
  dos.src = "".concat(folder, "/paso-a-paso2.svg");
  var tres = document.getElementById("tres");
  tres.src = "".concat(folder, "/paso-a-paso-hover3.svg");
  var form = new FormData();
  form.append("file", blob, "myGif.gif");
  form.append("tags", "gif, person, funny");
  var overlay = document.getElementById("purple-overlay");
  overlay.style.display = "block";
  var loading = document.getElementById("loading");
  var loadingText = document.getElementById("loading-text");
  loading.style.display = "block";
  loadingText.style.display = "block";
  fetch("http://upload.giphy.com/v1/gifs?api_key=".concat(apiKey), {
    method: "POST",
    body: form
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    return guardarMiGifo(response.data.id);
  });
}

var guardarMiGifo = function guardarMiGifo(id) {
  var loading = document.getElementById("loading");
  var loadingText = document.getElementById("loading-text");
  loading.src = "".concat(folder, "/check.svg");
  loadingText.innerText = "Gifo subido con éxito";
  url = "http://api.giphy.com/v1/gifs/".concat(id, "?api_key=").concat(apiKey);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (gif) {
    return addGifToMyList(gif.data);
  });
};

var addGifToMyList = function addGifToMyList(gif) {
  var myGifoList = JSON.parse(localStorage.getItem("myGifoList")) || [];
  localStorage.setItem("myGifoList", JSON.stringify(myGifoList.concat(gif)));
};

var renderMyGifos = function renderMyGifos() {
  var trending = document.getElementById("trending");
  trending.style.display = "block";
  var carrousel = document.getElementById('myGifos-carrousel');
  carrousel.innerHTML = '';
  var favouritesSection = document.getElementById("favorites-section");
  favouritesSection.style.display = "none";
  var searchSection = document.getElementById("search-section");
  searchSection.style.display = "none";
  var createGifoSection = document.getElementById("crear-gifos");
  createGifoSection.style.display = "none";
  var myGifos = document.getElementById("myGifos-section");
  myGifos.style.display = "flex";
  var myGifoList = JSON.parse(localStorage.getItem("myGifoList")) || [];

  if (myGifoList.length == 0 || window.localStorage.length == 0) {
    var emptyMyGifos = document.getElementById("empty-myGifos");
    emptyMyGifos.style.display = "flex";
    emptyMyGifos.innerHTML = '';
    var emptyicon = document.createElement("p");
    emptyicon.innerHTML = "<img src =\"".concat(folder, "/icon-mis-gifos-sin-contenido.svg\" alt=\"No hay gifos\" class=\"empty-myGifos\" />");
    var emptyfaveMessage = document.createElement("p");
    emptyfaveMessage.className = "empty-message";
    emptyfaveMessage.innerHTML = "¡Anímate a crear tu primer GIFO!";
    emptyMyGifos.appendChild(emptyicon);
    emptyMyGifos.appendChild(emptyfaveMessage);
  } else {
    place = "myGifos-carrousel";
    var arrayOfValues = JSON.parse(localStorage.getItem("myGifoList")) || [];
    console.log(arrayOfValues);
    arrayOfValues.forEach(function (value) {
      return render(value, place);
    });
  }
};

var keyCheck = function keyCheck(event) {
  var input = document.getElementById("searchInput");
  input.style.backgroundImage = "url('images/close.svg')";

  if (event.keyCode == 8 || event.keyCode == 46) {
    var searchResults = document.getElementById("search-results");
    var seeMoreArea = document.getElementById('see-more-area');
    seeMoreArea.innerHTML = "";
    var searchSuggestions = document.getElementById("search-suggestions");
    searchSuggestions.innerHTML = '';
    searchResults.innerHTML = '';
    counter = 12;
  }

  if (event.keyCode == 13) {
    search();
  }
};

var clear = function clear() {
  var myGifos = document.getElementById("myGifos-section");
  myGifos.style.display = "none";
  var createGifoSection = document.getElementById("crear-gifos");
  createGifoSection.style.display = "none";
  var trendingHeader = document.getElementById('trending-topics-header');
  var trendingTopics = document.getElementById('trending-topics');
  var searchResults = document.getElementById('search-results');
  var seeMore = document.getElementById('see-more-area');
  trendingHeader.innerHTML = '';
  trendingTopics.innerHTML = '';
  searchResults.innerHTML = '';
  createGifoSection.innerHTML = '';
  seeMore.innerHTML = '';
};

var clearResults = function clearResults(event) {
  var searchSuggestions = document.getElementById("search-suggestions");
  searchSuggestions.innerHTML = '';
  var input = document.getElementById("searchInput");
  input.value = '';
  input.style.backgroundImage = "url('".concat(folder, "/icon-search.svg')");
  var seeMore = document.getElementById('see-more-area');
  seeMore.innerHTML = '';
};

var clearSeeMore = function clearSeeMore() {
  var searchResults = document.getElementById("search-results");

  if (!searchResults.hasChildNodes()) {
    var seeMoreArea = document.getElementById('see-more-area');
    seeMoreArea.innerHTML = "";
  }
};

var showHome = function showHome() {
  var button = document.getElementById("crear");
  button.src = "".concat(folder, "/button-crear-gifo.svg");
  var myGifos = document.getElementById("myGifos-section");
  myGifos.style.display = "none";
  var searchSection = document.getElementById("search-section");
  var searchResults = document.getElementById("search-results");
  var seeMoreArea = document.getElementById("see-more-area");
  var trendingSection = document.getElementById("trending");
  trendingSection.style.display = "grid";
  searchSection.style.display = "flex";
  searchResults.innerHTML = '';
  seeMoreArea.innerHTML = '';
  var favouritesSection = document.getElementById("favorites-section");
  favouritesSection.style.display = "none";
  var createGifoSection = document.getElementById("crear-gifos");
  createGifoSection.style.display = "none";
  getTrendingTerms();
  counter = 12;
};

var darkmode = function darkmode() {
  if (mode) {
    var cssLink = document.getElementById("estilos");
    cssLink.href = "styles/dist/stylesheet-dark.css";
    mode = false;
  } else {
    lightmode();
  }
};

var lightmode = function lightmode() {
  console.log("light");
};

var facebook = document.getElementById("facebook");
var twitter = document.getElementById("twitter");
var instagram = document.getElementById("instagram");
var favoritosLink = document.getElementById("favoritos-link");
var createGifo = document.getElementById("boton-crear");
var darkMode = document.getElementById("dark-mode");
facebook.addEventListener("mouseover", function () {
  return facebook.src = "".concat(folder, "/icon_facebook_hover.svg");
});
facebook.addEventListener("mouseout", function () {
  return facebook.src = "".concat(folder, "/icon_facebook.svg");
});
twitter.addEventListener("mouseover", function () {
  return twitter.src = "".concat(folder, "/icon-twitter-hover.svg");
});
twitter.addEventListener("mouseout", function () {
  return twitter.src = "".concat(folder, "/icon-twitter.svg");
});
instagram.addEventListener("mouseover", function () {
  return instagram.src = "".concat(folder, "/icon_instagram-hover.svg");
});
instagram.addEventListener("mouseout", function () {
  return instagram.src = "".concat(folder, "/icon_instagram.svg");
});
favoritosLink.addEventListener("click", function () {
  return renderFavourites();
});
createGifo.addEventListener("click", function () {
  return pasoUno();
});
darkMode.addEventListener("click", function () {
  return darkmode();
});
getTrendingGifs();
getTrendingTerms();