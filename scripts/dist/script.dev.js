"use strict";

var apiKey = "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA";
var offset = 0;
var counter = 12;
var popId = 1;
var seemoreArea = document.getElementById('see-more-area');
seemoreArea.innerHTML = "";
var createGifoSection = document.getElementById("crear-gifos");
createGifoSection.style.display = "none";
var trendingSection = document.getElementById("trending");
trendingSection.style.display = "grid";
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
  image.src = "images/CTA-crear-gifo-hover.svg";
};

var offCreate = function offCreate() {
  var image = document.getElementById("crear");
  image.src = "images/button-crear-gifo.svg";
};

var leftHover = function leftHover() {
  var image = document.getElementById("left");
  image.src = "images/button-slider-left-hover.svg";
};

var leftOff = function leftOff() {
  var image = document.getElementById("left");
  image.src = "images/button-slider-left.svg";
};

var rightHover = function rightHover() {
  var image = document.getElementById("right");
  image.src = "images/button-slider-right-hover.svg";
};

var rightOff = function rightOff() {
  var image = document.getElementById("right");
  image.src = "images/button-slider-right.svg";
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
  p2.innerHTML = "<img src=\"images/icon-busqueda-sin-resultado.svg\" class=\"no-results-image\" ></img>";
  p3.innerText = "Intenta con otra búsqueda";
  p3.className = "no-results-text";
  searchResults.appendChild(div);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
};

var render = function render(gif, place) {
  return new Promise(function (resolve, reject) {
    var searchResults = document.getElementById("".concat(place));
    var div = document.createElement('div');
    var image = document.createElement('p');
    var icons = document.createElement('div');
    var favourite = document.createElement('p');
    var download = document.createElement('p');
    var maximize = document.createElement('p');
    var popup = document.createElement('div');
    var overlay = document.createElement('div');
    overlay.className = "overlay";
    icons.className = "icons";
    div.className = "trending-y";

    if (gif.active == true) {
      favourite.innerHTML = "<img src= \"images/icon-fav-active.svg\" alt=\"favourite\" class=\"favourite-active\"/>";
    } else {
      favourite.innerHTML = "<img src= \"images/icon-fav-hover.svg\" alt=\"favourite\" class=\"favourite\"/>";
    }

    download.innerHTML = "<img src=\"images/icon-download-hover.svg\" alt=\"download\" class=\"download\" />";
    image.innerHTML = "<img src=".concat(gif.images.downsized.url, " class=\"trending-gif\" alt=\"gif\" >");
    popup.innerHTML = "<div class=\"popup-wrapper\" id=\"popup-wrapper".concat(popId, "\">\n                                <div class=\"popup\">\n                                    <div class=\"popup-close\" id=\"popup-close").concat(popId, "\">x</div> \n                                    <div class=\"popup-content\" id=\"popup-content\">\n                                        <img src=").concat(gif.images.downsized.url, " class=\"pop-up-image\" alt=\"gif\" ></img>\n                                        <div class=\"popup-footer\">\n                                            <div class= \"pop-up-data\">\n                                                <p>").concat(gif.username, "</p>\n                                                <p>").concat(gif.title, "</p>\n                                            </div>\n                                            <div class=\"pop-up-icons\">\n                                                ").concat(favourite.innerHTML, "\n                                                ").concat(download.innerHTML, "\n                                            <div>\n                                        <div>\n                                    </div>\n                                </div>\n                            </div>");
    maximize.innerHTML = "<img src =\"images/icon-max-hover.svg\" alt=\"maximize\" class=\"max\" />";
    searchResults.appendChild(div);
    div.appendChild(popup);
    div.appendChild(image);
    div.appendChild(icons);
    div.appendChild(overlay);
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
    image.addEventListener("mouseover", function () {
      return icons.style.display = "flex";
    });
    image.addEventListener("mouseover", function () {
      return overlay.style.display = "flex";
    });
    image.addEventListener("mouseleave", function () {
      return overlay.style.display = "none";
    });
    favourite.addEventListener("click", function () {
      return favouriteImage(gif, favourite);
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
  img.src = "images/CTA-ver-mas.svg";
  img.id = "see-more";
  img.className = "see-more";
  seeMoreArea.appendChild(img);
  img.addEventListener("click", function () {
    counter += 12;
    search();
  });
  img.addEventListener("mouseover", function () {
    return img.src = "images/CTA-ver-mas-hover.svg";
  });
  img.addEventListener("mouseout", function () {
    return img.src = "images/CTA-ver-mas.svg";
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
  p.innerHTML = "<img src=\"images/icon-search.svg\" alt=\"search\"/>".concat(topic.name);
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
  img.src = "images/CTA-ver-mas.svg";
  img.id = "see-more";
  img.className = "see-more";
  seeMoreArea.appendChild(img);
  img.addEventListener("click", function () {
    counter += 12;
    searchForSuggestion(query);
  });
  img.addEventListener("mouseover", function () {
    return img.src = "images/CTA-ver-mas-hover.svg";
  });
  img.addEventListener("mouseout", function () {
    return img.src = "images/CTA-ver-mas.svg";
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

var favouriteImage = function favouriteImage(gif, favourite) {
  var favouriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

  if (!gif.active && !favouriteList.includes(gif)) {
    gif.active = true;
    localStorage.setItem("favoriteList", JSON.stringify(favouriteList.concat(gif)));
    favourite.innerHTML = "<img src= \"images/icon-fav-active.svg\" alt=\"favourite\" class=\"favourite-active\"/>";
    console.log(localStorage);
  } else {
    localStorage.setItem("favoriteList", JSON.stringify(favouriteList.filter(function (item) {
      return item.title !== gif.title;
    })));
    gif.active = false;
    favourite.innerHTML = "<img src= \"images/icon-fav-hover.svg\" alt=\"favourite\" class=\"favourite\"/>";
  }
};

var renderFavourites = function renderFavourites() {
  favouritesSection = document.getElementById("favorites-section");
  favouritesSection.style.display = "flex";
  searchSection = document.getElementById("search-section");
  searchSection.style.display = "none";
  var carrousel = document.getElementById('favourites-carrousel');
  carrousel.innerHTML = '';

  if (window.localStorage.length == 0) {
    var emptyfav = document.getElementById("empty-fav");
    emptyfav.innerHTML = '';
    var emptyicon = document.createElement("p");
    emptyicon.innerHTML = "<img src =\"images/icon-fav-sin-contenido.svg\" alt=\"No hay favoritos\" class=\"empty-favorites\" />";
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
};

var pasoUno = function pasoUno() {
  var screenTexts = document.getElementById("textos-pantalla");
  screenTexts.style.display = "none";
  var uno = document.getElementById("uno");
  uno.src = "images/paso-a-paso-hover1.svg";
  var botonComenzar = document.getElementById("boton-crear");
  botonComenzar.style.display = "none";
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "flex";
  var videoPromise = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: {
        max: 450
      }
    }
  }).then(function (stream) {
    return pasoDos(stream);
  });
};

var pasoDos = function pasoDos(stream) {
  var botonGrabar = document.getElementById("boton-grabar");
  botonGrabar.style.display = "block";
  var uno = document.getElementById("uno");
  uno.src = "images/paso-a-paso1.svg";
  var dos = document.getElementById("dos");
  dos.src = "images/paso-a-paso-hover2.svg";
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "block";
  var screen = document.getElementById("pantalla");
  screen.style.display = "block";
  botonGrabar.addEventListener("click", function () {
    return grabar(stream);
  });
};

var grabar = function grabar(stream) {
  var screenTexts2 = document.getElementById("textos-pantalla-2");
  screenTexts2.style.display = "none";
  var botonGrabar = document.getElementById("boton-grabar");
  botonGrabar.style.display = "none";
  var botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.style.display = "block";
  botonFinalizar.addEventListener("click", function () {
    return finalizar();
  });
  var screen = document.getElementById("pantalla");
  screen.srcObject = stream;
  screen.play();
};

var finalizar = function finalizar() {
  var botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.style.display = "none";
  var botonSubir = document.getElementById("boton-subir");
  botonSubir.style.display = "block";
  var screen = document.getElementById("pantalla");
  var stream = screen.srcObject;
  var tracks = stream.getTracks();
  tracks.forEach(function (track) {
    track.stop();
  });
  screen.addEventListener("click", function () {
    return playVideo();
  });
  botonSubir.addEventListener("click", function () {
    return subirGifo();
  });
};

var playVideo = function playVideo() {
  var screen = document.getElementById("pantalla");
  screen.play();
};

var subirGifo = function subirGifo() {
  console.log("Gifo subido");
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
  input.style.backgroundImage = "url('images/icon-search.svg')";
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

var facebook = document.getElementById("facebook");
var twitter = document.getElementById("twitter");
var instagram = document.getElementById("instagram");
var favoritosLink = document.getElementById("favoritos-link");
var createGifo = document.getElementById("boton-crear");
facebook.addEventListener("mouseover", function () {
  return facebook.src = "images/icon_facebook_hover.svg";
});
facebook.addEventListener("mouseout", function () {
  return facebook.src = "images/icon_facebook.svg";
});
twitter.addEventListener("mouseover", function () {
  return twitter.src = "images/icon-twitter-hover.svg";
});
twitter.addEventListener("mouseout", function () {
  return twitter.src = "images/icon-twitter.svg";
});
instagram.addEventListener("mouseover", function () {
  return instagram.src = "images/icon_instagram-hover.svg";
});
instagram.addEventListener("mouseout", function () {
  return instagram.src = "images/icon_instagram.svg";
});
favoritosLink.addEventListener("click", function () {
  return renderFavourites();
});
createGifo.addEventListener("click", function () {
  return pasoUno();
});
getTrendingGifs();
getTrendingTerms();