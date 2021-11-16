"use strict";

// APP ID：bbbf44c0e2534c17bbf5553afe5cfb24
// APP Key：YLongjG_6wqXgBm5FQ4LIpW7bPQ
//景點
//https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON
//＋市區
//https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON
//美食
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=30&$format=JSON
//住宿景點
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/Taipei?$top=30&$format=JSON
//觀光活動
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=30&$format=JSON
var viewList = document.querySelector('.js-view-list');
var foodList = document.querySelector('.js-food-list');
var hotelList = document.querySelector('.js-hotel-list');
var data = [];
var type = '';
var city = '';
var num = 0; // function choseDataType(inputType, inputCity, inputNum){
//    switch(inputType){
//       case'ScenicSpot':
//       getAPI('ScenicSpot', inputCity, num);
//       break;
//       case'Restaurant':
//       getAPI('Restaurant', inputCity, num);
//       break;
//       case'Hotel':
//       getAPI('Hotel', inputCity, num);
//       break;
//       case'Activity':
//       getAPI('Activity', inputCity, num);
//       break;
//       default:
//       break ;
//    };
// }

function getAPI(inputType, inputCity, inputNum) {
  axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/".concat(inputType, "/").concat(inputCity, "?$top=").concat(inputNum, "&$format=JSON"), {
    headers: getAuthorizationHeader()
  }).then(function (res) {
    data = res.data;
    renderType(inputType);
  })["catch"](function (error) {
    console.log(error);
  });
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  var AppID = 'bbbf44c0e2534c17bbf5553afe5cfb24';
  var AppKey = 'YLongjG_6wqXgBm5FQ4LIpW7bPQ'; //  填入自己 ID、KEY 結束

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}

function renderType(inputType) {
  switch (inputType) {
    case 'ScenicSpot':
      renderViewData();
      break;

    case 'Restaurant':
      renderFoodData();
      break;

    case 'Hotel':
      renderHotelData();
      break;

    case 'Activity':
      // getAPI('Activity', city, num);
      break;

    default:
      break;
  }

  ;
}

function renderViewData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-rounded card-hover-filter w-100\">\n        <div\n          class=\"d-flex flex-column justify-content-between bg-img h-400 card-rounded w-100\"\n          style=\"\n            background-image: url(".concat(item.Picture.PictureUrl1, ");\n          \"\n        >\n          <div class=\"d-flex justify-content-between p-5\">\n            <div class=\"card-btn-group\">\n              <span class=\"material-icons-outlined link-star\">\n                star\n              </span>\n              <span class=\"me-1\">2.5</span>\n              <span class=\"material-icons-outlined\"> visibility </span>\n              <span>6 \u842C</span>\n            </div>\n            <div class=\"card-btn-circle\">\n              <span class=\"material-icons-outlined align-middle\">\n                bookmark_border\n              </span>\n            </div>\n          </div>\n          <div\n            class=\"\n              d-flex\n              justify-content-between\n              p-5\n              flex-wrap\n              gap-3\n              bg-dark\n              card-rounded-bottom\n            \"\n          >\n            <h3 class=\"h3 text-white text-shadow\">\n              <a href=\"#\"class=\"link-light\">").concat(item.Name, "</a></h3>\n            <div class=\"d-flex align-items-center text-white\">\n              <span class=\"material-icons-outlined align-items-center\">\n                location_on\n              </span>\n              ").concat(item.City, "\n            </div>\n          </div>\n        </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  viewList.innerHTML = str;
}

function renderFoodData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-border card-rounded card-hover-shadow-2 h-100\">\n        <div class=\"position-relative\">\n          <a href=\"#\" class=\"stretched-link ratio-24x17 ratio-md-36x25\">\n          <img src=\"".concat(item.Picture, "\" alt=\"img\" class=\"card-bg-img card-rounded-top\"></a>\n          <div class=\"card-btn-group card-top-start\">\n            <a href=\"#\" class=\"material-icons-outlined link-star\">\n              star\n              </a>\n              <span class=\"me-1\">2.5</span>\n              <a href=\"#\" class=\"material-icons-outlined\">\n                visibility\n              </a>\n                <span>6 \u842C</span>\n          </div>\n          <a href=\"#\" class=\"card-btn-circle card-top-end\">\n            <span class=\"material-icons-outlined align-middle\">\n              bookmark_border\n              </span>\n          </a>\n        </div>\n        <div class=\"card-body py-2 px-5\">\n        <div class=\"d-flex align-items-center flex-wrap gap-3 mb-6\">\n          <h3 class=\"h3 text-black\">").concat(item.Name, "</h3>\n          <div class=\"d-flex align-items-center text-dark\">\n            <span class=\"material-icons-outlined align-items-center\">\n              location_on\n              </span>\n              ").concat(item.City, "\n          </div>\n        </div>\n        <a href=\"#\" class=\"link-dark\">").concat(item.Address, "</a>\n        <p class=\"text-dark\">\u71DF\u696D\u6642\u9593\uFF1A").concat(item.OpenTime, "</p>\n        <p class=\"text-dark\">\u96FB\u8A71\uFF1A<a href=\"tel:").concat(item.Phone, "\" class=\"link-dark d-inline\">").concat(item.Phone, "</a></p>\n      </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  foodList.innerHTML = str;
}

function renderHotelData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-border card-rounded card-hover-shadow-2 h-100\">\n        <div class=\"position-relative\">\n        <a href=\"#\" class=\"stretched-link ratio-24x17 ratio-md-36x25\">\n          <img src=\"".concat(item.Picture, "\" alt=\"img\" class=\"card-bg-img card-rounded-top\"></a></div>\n          <div class=\"card-btn-group card-top-start\">\n            <a href=\"#\" class=\"material-icons-outlined link-star\">\n              star\n              </a>\n              <span class=\"me-1\">2.5</span>\n              <a href=\"#\" class=\"material-icons-outlined\">\n                visibility\n              </a>\n                <span>6 \u842C</span>\n          </div>\n          <a href=\"#\" class=\"card-btn-circle card-top-end\">\n            <span class=\"material-icons-outlined align-middle\">\n              bookmark_border\n              </span>\n          </a>\n        <div class=\"card-body py-2 px-5\">\n        <div class=\"d-flex align-items-center flex-wrap gap-3 mb-6\">\n          <h3 class=\"h3 text-black\">").concat(item.Name, "</h3>\n          <div class=\"d-flex align-items-center text-dark\">\n            <span class=\"material-icons-outlined align-items-center\">\n              location_on\n              </span>\n              ").concat(item.City, "\n          </div>\n        </div>\n        <a href=\"#\" class=\"link-dark\">").concat(item.Address, " </a>\n        <p class=\"text-dark\">\u670D\u52D9\u9805\u76EE\uFF1A<span>\u9910\u5EF3,\u5496\u5561\u5EF3,\u7121\u7DDA\u7DB2\u8DEF,\u570B\u6C11\u65C5\u904A\u5361,\u505C\u8ECA\u5834</span></p>\n        <p class=\"text-dark\">\u96FB\u8A71\uFF1A<a href=\"tel:").concat(item.Phone, "\" class=\"link-dark d-inline\">").concat(item.Phone, "</a></p>\n      </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  hotelList.innerHTML = str;
}

function init() {
  // getAPI('ScenicSpot', 'Taipei', 3);
  // getAPI('Restaurant', 'Tainan', 3);
  getAPI('Hotel', 'PingtungCounty', 3);
}

init();
"use strict";

// APP ID：bbbf44c0e2534c17bbf5553afe5cfb24
// APP Key：YLongjG_6wqXgBm5FQ4LIpW7bPQ
//景點
//https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON
//＋市區
//https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON
//美食
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=30&$format=JSON
//住宿景點
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/Taipei?$top=30&$format=JSON
//觀光活動
//https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=30&$format=JSON
var viewList = document.querySelector('.js-view-list');
var foodList = document.querySelector('.js-food-list');
var hotelList = document.querySelector('.js-hotel-list');
var data = [];
var type = '';
var city = '';
var num = 3;

function choseDataType(type, city, num) {
  switch (type) {
    case 'ScenicSpot':
      getAPI('ScenicSpot', city, num);
      break;

    case 'Restaurant':
      getAPI('Restaurant', city, num);
      break;

    case 'Hotel':
      getAPI('Hotel', city, num);
      break;

    case 'Activity':
      getAPI('Activity', city, num);
      break;

    default:
      break;
  }

  ;
}

function getAPI(inputType, inputCity, inputNum) {
  axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/".concat(inputType, "/").concat(inputCity, "?$top=").concat(inputNum, "&$format=JSON"), {
    headers: getAuthorizationHeader()
  }).then(function (res) {
    data = res.data;
    console.log(data);
    renderType(inputType);
  })["catch"](function (error) {
    console.log(error);
  });
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  var AppID = 'bbbf44c0e2534c17bbf5553afe5cfb24';
  var AppKey = 'YLongjG_6wqXgBm5FQ4LIpW7bPQ'; //  填入自己 ID、KEY 結束

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}

function renderType(inputType) {
  switch (inputType) {
    case 'ScenicSpot':
      renderViewData();
      break;

    case 'Restaurant':
      renderFoodData();
      break;

    case 'Hotel':
      renderHotelData();
      break;

    case 'Activity':
      // getAPI('Activity', city, num);
      break;

    default:
      renderViewData();
      renderFoodData();
      renderHotelData();
      break;
  }

  ;
}

function renderViewData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-rounded card-hover-filter w-100\">\n        <div\n          class=\"d-flex flex-column justify-content-between bg-img h-400 card-rounded w-100\"\n          style=\"\n            background-image: url(".concat(item.Picture.PictureUrl1, ");\n          \"\n        >\n          <div class=\"d-flex justify-content-between p-5\">\n            <div class=\"card-btn-group\">\n              <span class=\"material-icons-outlined link-star\">\n                star\n              </span>\n              <span class=\"me-1\">2.5</span>\n              <span class=\"material-icons-outlined\"> visibility </span>\n              <span>6 \u842C</span>\n            </div>\n            <div class=\"card-btn-circle\">\n              <span class=\"material-icons-outlined align-middle\">\n                bookmark_border\n              </span>\n            </div>\n          </div>\n          <div\n            class=\"\n              d-flex\n              justify-content-between\n              p-5\n              flex-wrap\n              gap-3\n              bg-dark\n              card-rounded-bottom\n            \"\n          >\n            <h3 class=\"h3 text-white text-shadow\">\n              <a href=\"#\"class=\"link-light\">").concat(item.Name, "</a></h3>\n            <div class=\"d-flex align-items-center text-white\">\n              <span class=\"material-icons-outlined align-items-center\">\n                location_on\n              </span>\n              ").concat(item.City, "\n            </div>\n          </div>\n        </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  viewList.innerHTML = str;
}

function renderFoodData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-border card-rounded card-hover-shadow-2 h-100\">\n        <div class=\"position-relative\">\n          <a href=\"#\" class=\"stretched-link ratio-24x17 ratio-md-36x25\">\n          <img src=\"".concat(item.Picture, "\" alt=\"img\" class=\"card-bg-img card-rounded-top\"></a>\n          <div class=\"card-btn-group card-top-start\">\n            <a href=\"#\" class=\"material-icons-outlined link-star\">\n              star\n              </a>\n              <span class=\"me-1\">2.5</span>\n              <a href=\"#\" class=\"material-icons-outlined\">\n                visibility\n              </a>\n                <span>6 \u842C</span>\n          </div>\n          <a href=\"#\" class=\"card-btn-circle card-top-end\">\n            <span class=\"material-icons-outlined align-middle\">\n              bookmark_border\n              </span>\n          </a>\n        </div>\n        <div class=\"card-body py-2 px-5\">\n        <div class=\"d-flex align-items-center flex-wrap gap-3 mb-6\">\n          <h3 class=\"h3 text-black\">").concat(item.Name, "</h3>\n          <div class=\"d-flex align-items-center text-dark\">\n            <span class=\"material-icons-outlined align-items-center\">\n              location_on\n              </span>\n              ").concat(item.City, "\n          </div>\n        </div>\n        <a href=\"#\" class=\"link-dark\">").concat(item.Address, "</a>\n        <p class=\"text-dark\">\u71DF\u696D\u6642\u9593\uFF1A").concat(item.OpenTime, "</p>\n        <p class=\"text-dark\">\u96FB\u8A71\uFF1A<a href=\"tel:").concat(item.Phone, "\" class=\"link-dark d-inline\">").concat(item.Phone, "</a></p>\n      </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  foodList.innerHTML = str;
}

function renderHotelData() {
  var str = '';
  data.forEach(function (item) {
    var content = "\n      <li class=\"col-md-4 mb-5 mb-md-0\">\n      <div class=\"card card-border card-rounded card-hover-shadow-2 h-100\">\n        <div class=\"position-relative\">\n        <a href=\"#\" class=\"stretched-link ratio-24x17 ratio-md-36x25\">\n          <img src=\"".concat(item.Picture, "\" alt=\"img\" class=\"card-bg-img card-rounded-top\"></a></div>\n          <div class=\"card-btn-group card-top-start\">\n            <a href=\"#\" class=\"material-icons-outlined link-star\">\n              star\n              </a>\n              <span class=\"me-1\">2.5</span>\n              <a href=\"#\" class=\"material-icons-outlined\">\n                visibility\n              </a>\n                <span>6 \u842C</span>\n          </div>\n          <a href=\"#\" class=\"card-btn-circle card-top-end\">\n            <span class=\"material-icons-outlined align-middle\">\n              bookmark_border\n              </span>\n          </a>\n        <div class=\"card-body py-2 px-5\">\n        <div class=\"d-flex align-items-center flex-wrap gap-3 mb-6\">\n          <h3 class=\"h3 text-black\">").concat(item.Name, "</h3>\n          <div class=\"d-flex align-items-center text-dark\">\n            <span class=\"material-icons-outlined align-items-center\">\n              location_on\n              </span>\n              ").concat(item.City, "\n          </div>\n        </div>\n        <a href=\"#\" class=\"link-dark\">").concat(item.Address, " </a>\n        <p class=\"text-dark\">\u670D\u52D9\u9805\u76EE\uFF1A<span>\u9910\u5EF3,\u5496\u5561\u5EF3,\u7121\u7DDA\u7DB2\u8DEF,\u570B\u6C11\u65C5\u904A\u5361,\u505C\u8ECA\u5834</span></p>\n        <p class=\"text-dark\">\u96FB\u8A71\uFF1A<a href=\"tel:").concat(item.Phone, "\" class=\"link-dark d-inline\">").concat(item.Phone, "</a></p>\n      </div>\n      </div>\n    </li>\n      ");
    str += content;
  });
  hotelList.innerHTML = str;
}

function init() {
  choseDataType('ScenicSpot', 'Taipei', 3); // choseDataType('Restaurant', 'Taipei', 3);
  // choseDataType('Hotel', 'Taipei', 3);
}

init();
//# sourceMappingURL=all.js.map
