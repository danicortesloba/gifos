"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var apiKey = "vWxLs91pSMGABQsCprkgIF3EsXy3WnZA";
var offset = 0;

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
  var trending = document.getElementById("trending-carrousel");
  var p = document.createElement('p');
  p.innerHTML = "<img src=".concat(gif.images.downsized.url, " class=\"trending-gif\" ></img>");
  trending.appendChild(p);
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
  offset += (_readOnlyError("offset"), 3);
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(renderTrending);
  });
};

var carrouselLeft = function carrouselLeft() {
  offset -= (_readOnlyError("offset"), 3);
  var trending = document.getElementById("trending-carrousel");
  trending.innerHTML = "";
  url = "https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=3&offset=").concat(offset);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.data.forEach(renderTrending);
  });
};

var search = function search() {
  var searchArea = document.getElementById("search-area");
  searchArea.innerHTML = '';
  var input = document.getElementById("searchInput");
  var query = input.value;
  url = "https://api.giphy.com/v1/gifs/search?api_key=vWxLs91pSMGABQsCprkgIF3EsXy3WnZA&q=".concat(query, "&limit=12&offset=0");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (gifs) {
    return gifs.data.forEach(renderSearch);
  });
};

var renderSearch = function renderSearch(gif) {
  var searchResults = document.getElementById("search-results");
  console.log(searchResults); // const p = document.createElement('p')
  // p.innerHTML = `<img src=${gif.images.downsized.url} class="searched-gif" ></img>`
  // searchResults.appendChild(p)
};

getTrending();