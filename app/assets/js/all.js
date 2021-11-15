// APP ID：bbbf44c0e2534c17bbf5553afe5cfb24
// APP Key：YLongjG_6wqXgBm5FQ4LIpW7bPQ
let data=[];

function getAPI(){
  axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=3&$format=JSON',
    {
       headers: getAuthorizationHeader()
    }
  )
  .then(function (res) {
   data = res.data;
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

getAPI();