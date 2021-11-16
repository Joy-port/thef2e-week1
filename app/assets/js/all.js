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

const viewList = document.querySelector('.js-view-list');
const foodList = document.querySelector('.js-food-list');
const hotelList = document.querySelector('.js-hotel-list');
let data = [];
let type = '';
let city = '';
let num = 3;

function choseDataType(type, city, num){
   switch(type){
      case'ScenicSpot':
      getAPI('ScenicSpot', city, num);
      break;
      case'Restaurant':
      getAPI('Restaurant', city, num);
      break;
      case'Hotel':
      getAPI('Hotel', city, num);
      break;
      case'Activity':
      getAPI('Activity', city, num);
      break;
      default:
      break ;
   };
}

function getAPI(inputType, inputCity, inputNum){

  axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/${inputType}/${inputCity}?$top=${inputNum}&$format=JSON`,
    {
       headers: getAuthorizationHeader()
    }
  )
  .then(function (res) {
   data = res.data;
   console.log(data);
   renderType(inputType);

  })
  .catch(function (error) {
   console.log(error);
  }); 
}

function getAuthorizationHeader() {
//  填入自己 ID、KEY 開始
   let AppID = 'bbbf44c0e2534c17bbf5553afe5cfb24';
   let AppKey = 'YLongjG_6wqXgBm5FQ4LIpW7bPQ';
//  填入自己 ID、KEY 結束
   let GMTString = new Date().toGMTString();
   let ShaObj = new jsSHA('SHA-1', 'TEXT');
   ShaObj.setHMACKey(AppKey, 'TEXT');
   ShaObj.update('x-date: ' + GMTString);
   let HMAC = ShaObj.getHMAC('B64');
   let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
   return { 'Authorization': Authorization, 'X-Date': GMTString }; 

}

function renderType(inputType){
   switch(inputType){
      case'ScenicSpot':
      renderViewData();
      break;
      case'Restaurant':
      renderFoodData();
      break;
      case'Hotel':
      renderHotelData();
      break;
      case'Activity':
      // getAPI('Activity', city, num);
      break;
      default:
         renderViewData();
         renderFoodData();
         renderHotelData();
      break ;
   };
}

function renderViewData(){
   let str = '';

   data.forEach(item => {
      let content = `
      <li class="col-md-4 mb-5 mb-md-0">
      <div class="card card-rounded card-hover-filter w-100">
        <div
          class="d-flex flex-column justify-content-between bg-img h-400 card-rounded w-100"
          style="
            background-image: url(${item.Picture.PictureUrl1});
          "
        >
          <div class="d-flex justify-content-between p-5">
            <div class="card-btn-group">
              <span class="material-icons-outlined link-star">
                star
              </span>
              <span class="me-1">2.5</span>
              <span class="material-icons-outlined"> visibility </span>
              <span>6 萬</span>
            </div>
            <div class="card-btn-circle">
              <span class="material-icons-outlined align-middle">
                bookmark_border
              </span>
            </div>
          </div>
          <div
            class="
              d-flex
              justify-content-between
              p-5
              flex-wrap
              gap-3
              bg-dark
              card-rounded-bottom
            "
          >
            <h3 class="h3 text-white text-shadow">
              <a href="#"class="link-light">${item.Name}</a></h3>
            <div class="d-flex align-items-center text-white">
              <span class="material-icons-outlined align-items-center">
                location_on
              </span>
              ${item.City}
            </div>
          </div>
        </div>
      </div>
    </li>
      `;
      str+=content;
   });
   
   viewList.innerHTML = str ;
}

function renderFoodData(){
   let str = '';

   data.forEach(item => {
      let content = `
      <li class="col-md-4 mb-5 mb-md-0">
      <div class="card card-border card-rounded card-hover-shadow-2 h-100">
        <div class="position-relative">
          <a href="#" class="stretched-link ratio-24x17 ratio-md-36x25">
          <img src="${item.Picture}" alt="img" class="card-bg-img card-rounded-top"></a>
          <div class="card-btn-group card-top-start">
            <a href="#" class="material-icons-outlined link-star">
              star
              </a>
              <span class="me-1">2.5</span>
              <a href="#" class="material-icons-outlined">
                visibility
              </a>
                <span>6 萬</span>
          </div>
          <a href="#" class="card-btn-circle card-top-end">
            <span class="material-icons-outlined align-middle">
              bookmark_border
              </span>
          </a>
        </div>
        <div class="card-body py-2 px-5">
        <div class="d-flex align-items-center flex-wrap gap-3 mb-6">
          <h3 class="h3 text-black">${item.Name}</h3>
          <div class="d-flex align-items-center text-dark">
            <span class="material-icons-outlined align-items-center">
              location_on
              </span>
              ${item.City}
          </div>
        </div>
        <a href="#" class="link-dark">${item.Address}</a>
        <p class="text-dark">營業時間：${item.OpenTime}</p>
        <p class="text-dark">電話：<a href="tel:${item.Phone}" class="link-dark d-inline">${item.Phone}</a></p>
      </div>
      </div>
    </li>
      `;
      str+=content;
   });
   
   foodList.innerHTML = str ;
}

function renderHotelData(){
   let str = '';

   data.forEach(item => {
      let content = `
      <li class="col-md-4 mb-5 mb-md-0">
      <div class="card card-border card-rounded card-hover-shadow-2 h-100">
        <div class="position-relative">
        <a href="#" class="stretched-link ratio-24x17 ratio-md-36x25">
          <img src="${item.Picture}" alt="img" class="card-bg-img card-rounded-top"></a></div>
          <div class="card-btn-group card-top-start">
            <a href="#" class="material-icons-outlined link-star">
              star
              </a>
              <span class="me-1">2.5</span>
              <a href="#" class="material-icons-outlined">
                visibility
              </a>
                <span>6 萬</span>
          </div>
          <a href="#" class="card-btn-circle card-top-end">
            <span class="material-icons-outlined align-middle">
              bookmark_border
              </span>
          </a>
        <div class="card-body py-2 px-5">
        <div class="d-flex align-items-center flex-wrap gap-3 mb-6">
          <h3 class="h3 text-black">${item.Name}</h3>
          <div class="d-flex align-items-center text-dark">
            <span class="material-icons-outlined align-items-center">
              location_on
              </span>
              ${item.City}
          </div>
        </div>
        <a href="#" class="link-dark">${item.Address} </a>
        <p class="text-dark">服務項目：<span>餐廳,咖啡廳,無線網路,國民旅遊卡,停車場</span></p>
        <p class="text-dark">電話：<a href="tel:${item.Phone}" class="link-dark d-inline">${item.Phone}</a></p>
      </div>
      </div>
    </li>
      `;

      str+=content;

   });
   hotelList.innerHTML = str ;
}

function init(){
   choseDataType('ScenicSpot', 'Taipei', 3);
   // choseDataType('Restaurant', 'Taipei', 3);
   // choseDataType('Hotel', 'Taipei', 3);
   

}

init();


