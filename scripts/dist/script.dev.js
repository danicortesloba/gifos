"use strict";

var apiKey = "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA";
var offset = 0;
var counter = 12;
var popId = 1;
var searchArea = document.getElementById('see-more-area');
searchArea.innerHTML = "";

var getTrending = function getTrending() {
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(renderTrending);
  });
};

var renderTrending = function renderTrending(gif) {
  console.log(gif);
  return new Promise(function (resolve, reject) {
    var trending = document.getElementById("trending-carrousel");
    var image = document.createElement('p');
    var favourite = document.createElement('p');
    var download = document.createElement('p');
    var maximize = document.createElement('p');
    var popup = document.createElement('div');
    image.innerHTML = "<img src=".concat(gif.images.downsized.url, " class=\"trending-gif\" alt=\"gif\" >");
    popup.innerHTML = "<div class=\"popup-wrapper\" id=\"popup-wrapper".concat(popId, "\"><div class=\"popup\"><div class=\"popup-close\" id=\"popup-close").concat(popId, "\">x</div> <div class=\"popup-content\" id=\"popup-content\"><img src=").concat(gif.images.downsized.url, " class=\"pop-up-image\" alt=\"gif\" ></img></div></div></div>");
    favourite.innerHTML = "<img src= \"images/icon-fav-hover.svg\" alt=\"favourite\" class=\"favourite\"/>";
    download.innerHTML = "<img src=\"images/icon-download-hover.svg\" alt=\"download\" class=\"download\" />";
    maximize.innerHTML = "<img src =\"images/icon-max-hover.svg\" alt=\"maximize\" class=\"max\" />";
    trending.appendChild(popup);
    trending.appendChild(image);
    trending.appendChild(favourite);
    trending.appendChild(download);
    trending.appendChild(maximize);
    var id = popId;
    maximize.addEventListener("click", function () {
      return maximizeImage(id);
    });
  }).then(popId += 1);
};

var maximizeImage = function maximizeImage(id) {
  console.log(id);
  var popupWrapper = document.getElementById("popup-wrapper".concat(id));
  popupWrapper.style.display = 'block';
  var popupClose = document.getElementById("popup-close".concat(id));
  popupClose.addEventListener("click", function () {
    return popupWrapper.style.display = "none";
  });
};

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
  var trending = document.getElementById("trending-carrousel");
  trending.innerHTML = "";
  offset += 3;
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(renderTrending);
  });
};

var carrouselLeft = function carrouselLeft() {
  offset -= 3;
  var trending = document.getElementById("trending-carrousel");
  trending.innerHTML = "";
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(renderTrending);
  });
};

var clear = function clear() {
  var trendingHeader = document.getElementById('trending-topics-header');
  var trendingTopics = document.getElementById('trending-topics');
  var searchResults = document.getElementById('search-results');
  var seeMore = document.getElementById('see-more-area');
  trendingHeader.innerHTML = '';
  trendingTopics.innerHTML = '';
  searchResults.innerHTML = '';
  seeMore.innerHTML = '';
};

var input = document.getElementById("searchInput");

if (input.value.length !== 0) {
  input.addEventListener("click", function () {
    return search();
  });
}

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

var clearSeeMore = function clearSeeMore() {
  var searchResults = document.getElementById("search-results");

  if (!searchResults.hasChildNodes()) {
    var _searchArea = document.getElementById('see-more');

    _searchArea.innerHTML = "";
  }
};

var seeMore = function seeMore() {
  var searchArea = document.getElementById('see-more-area');
  searchArea.innerHTML = "";
  var img = document.createElement('img');
  img.src = "images/CTA-ver-mas.svg";
  img.id = "see-more";
  img.className = "see-more";
  searchArea.appendChild(img);
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

var showResults = function showResults(response) {
  var input = document.getElementById("searchInput");

  if (response.data.length == 0 && input.value.length !== 0) {
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
  } else {
    clear();
    response.data.forEach(renderSearch);
  }
};

var renderSearch = function renderSearch(gif) {
  return new Promise(function (resolve, reject) {
    var searchResults = document.getElementById("search-results");
    var image = document.createElement('p');
    var favourite = document.createElement('p');
    var download = document.createElement('p');
    var maximize = document.createElement('p');
    var popup = document.createElement('div');
    image.innerHTML = "<img src=".concat(gif.images.downsized.url, " class=\"trending-gif\" alt=\"gif\" >");
    popup.innerHTML = "<div class=\"popup-wrapper\" id=\"popup-wrapper".concat(popId, "\"><div class=\"popup\"><div class=\"popup-close\" id=\"popup-close").concat(popId, "\">x</div> <div class=\"popup-content\" id=\"popup-content\"><img src=").concat(gif.images.downsized.url, " class=\"pop-up-image\" alt=\"gif\" ></img></div></div></div>");
    favourite.innerHTML = "<img src= \"images/icon-fav-hover.svg\" alt=\"favourite\" class=\"favourite\"/>";
    download.innerHTML = "<img src=\"images/icon-download-hover.svg\" alt=\"download\" class=\"download\" />";
    maximize.innerHTML = "<img src =\"images/icon-max-hover.svg\" alt=\"maximize\" class=\"max\" />";
    searchResults.appendChild(popup);
    searchResults.appendChild(image);
    searchResults.appendChild(favourite);
    searchResults.appendChild(download);
    searchResults.appendChild(maximize);
    var id = popId;
    maximize.addEventListener("click", function () {
      return maximizeImage(id);
    });
  }).then(popId += 1);
};

var searchSuggestions = function searchSuggestions() {
  clear();
  var searchSuggestions = document.getElementById("search-suggestions");
  var input = document.getElementById("searchInput");
  var query = input.value;
  url = "https://api.giphy.com/v1/gifs/search/tags?api_key=".concat(apiKey, "&q=").concat(query, "&limit=5");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (topics) {
    return topics.data.forEach(renderSuggestion);
  });
  searchSuggestions.innerHTML = '';
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
  var searchArea = document.getElementById('see-more-area');
  searchArea.innerHTML = "";
  var img = document.createElement('img');
  img.src = "images/CTA-ver-mas.svg";
  img.id = "see-more";
  img.className = "see-more";
  searchArea.appendChild(img);
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

var renderSuggestion = function renderSuggestion(topic) {
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

var keyCheck = function keyCheck(event) {
  var input = document.getElementById("searchInput");
  input.style.backgroundImage = "url('images/close.svg')";

  if (event.keyCode == 8 || event.keyCode == 46) {
    var _searchArea2 = document.getElementById('see-more');

    _searchArea2.innerHTML = "";

    var _searchSuggestions = document.getElementById("search-suggestions");

    _searchSuggestions.innerHTML = '';
    var p1 = document.createElement('p');
    p1.innerText = "Trending:";
    p1.className = "trending-topics-header";
    var p2 = document.createElement('p');
    p2.innerHTML = "Reactions, Entertainment, Sports,Stickers, Artists";
    p2.className = "trending-topics";

    _searchSuggestions.appendChild(p1);

    _searchSuggestions.appendChild(p2);
  }

  if (event.keyCode == 13) {
    search();
  }
};

var clearResults = function clearResults(event) {
  var searchSuggestions = document.getElementById("search-suggestions");
  searchSuggestions.innerHTML = '';
  var input = document.getElementById("searchInput");
  input.value = '';
  input.style.backgroundImage = "url('images/icon-search.svg')";
  var seeMore = document.getElementById('see-more');
  seeMore.innerHTML = '';
};

var facebook = document.getElementById("facebook");
var twitter = document.getElementById("twitter");
var instagram = document.getElementById("instagram");
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
getTrending();