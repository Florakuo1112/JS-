//DOM:預設的ticket area
const ticketCardArea = document.querySelector(".ticketCard-area");
//篩選功能
const regionSearch = document.querySelector(".regionSearch");
const searchResult = document.querySelector("#searchResult-text");
//DOM新增旅遊套票的input區域
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector("#ticketDescription");  
const addTicket = document.querySelector(".addTicket-btn");
//DOM:message 的區域
const ticketName_message = document.querySelector("#ticketName-message");
const ticketImgUrl＿message = document.querySelector("#ticketImgUrl-message");
const ticketRegion_message = document.querySelector("#ticketRegion-message");
const ticketPrice_message = document.querySelector("#ticketPrice-message");
const ticketNum_message = document.querySelector("#ticketNum-message");
const ticketRate_message= document.querySelector("#ticketRate-message");
const desRequired = document.querySelector(".desRequired");
//for validate.js的綁定
const addTicketform = document.querySelector(".addTicket-form");
const input = addTicketform.querySelectorAll('input, select, textarea');



//for validate.js 設定條件
const constraints = {
  套票名稱:{
      presence:{
        allowEmpty:false,
        message:"必填"
      }
  },
  圖片網址:{
      presence:{
        allowEmpty:false,
        message:"必填"
      },
      url:{
        message:"非有效網址"
      }
  },
  景點地區:{
      presence:{
        allowEmpty:false,
        message:"必填"
      }
  },
  套票金額:{
      presence:{
        allowEmpty:false,
        message:"必填"
      }
  },
  套票組數:{
      presence:{
        allowEmpty:false,
        message:"必填"
      }
  },
  套票星級:{
      presence:{
        allowEmpty:false,
        message:"必填"
      }
  },
  套票描述:{
      presence:{
        allowEmpty:false,
        message:"必填"
      },
      length:{
        is:5,
        message: `字數等於5`
      }
  }
};




//查無此關鍵字資料
const cantFindArea = document.querySelector(".cantFind-area");



let totalData = {};

axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function(response){
   let data = response.data.data;
  render(data);//get資料後才能渲染資料 放在then後面才能取得資料後再渲染
  console.log(data)
  //第七週主線任務
donuteChart()

function donuteChart(){

    data.forEach(function(item){
      if(totalData[item.area] === undefined){
        totalData[item.area] = 1
      }else{
        totalData[item.area] += 1};
    });
  //上課的教法
  // let areaAry = Object.keys(total); //取total的屬性變成陣列;
  // let newData = [];
  // areaAry.forEach(function(item){
  //   let ary = [];
  //   ary.push(item);
  //   ary.push(total[item]);
  //   newData.push(ary);
  // });
  // console.log(newData);

  //助教建議寫法 Object.entries 可以把物件變成陣列
  console.log(Object.entries(totalData));
  let newData = Object.entries(totalData);
  console.log(newData)

  var chart = c3.generate({
    data: {
        columns:
          newData
        ,
        type : 'donut',
        colors:{
          高雄: '#E68618',
          台中: '#5151D3',
          台北: '#26C0C7'

        }
    },
    donut: {
        title: "套票地區比重",
        width:15,
        label:{
          show:false
        }
        
    }
  });
  
 };



//level 3
regionSearch.addEventListener("change", function(e){
  let clickItem = e.target.value;
//如果按到的option是“”
  if(clickItem === ""){
     //searchResult.textContent = `本次搜尋共${data.length}筆資料` 已把這段加入 init()
       render(data);
       console.log(regionSearch.value)
       return
  };
//其他
  let filterData = [];
     data.forEach(function(item){
       if(item.area === clickItem){
         console.log(`收尋${item.area}`);
         filterData.push(item);
         console.log(`${regionSearch.value}的資訊`);
       }
     });
    render(filterData);

  }
  );

  //增加票券功能
addTicket.addEventListener("click",function(e){
  console.log(input);

  //先把alart message變成空白
  input.forEach((item)=>{
    if(item.value == "新增套票"){
      return
    };
    let eachNextElement = item.parentElement.nextElementSibling
  //  console.log(eachNextElement);
    eachNextElement.innerHTML =  
    `<p id="ticketName-message" data-message="套票名稱">
  <i class="fas fa-exclamation-circle"></i>
           <span></span>
     </p>`

  });

  //把輸入的資訊存在dataToValidate
  let dataToValidate ={};
  input.forEach((item)=>{
    dataToValidate[item.name] = item.value;
  });

  console.log(dataToValidate);

const errors = validate(dataToValidate, constraints); 
//const errors = validate(dataToValidate, constraints, {format: 'flat' }); 
console.log(errors);
if(errors !== undefined){
  input.forEach((item)=>{
    if(errors[item.name] !== undefined){
    console.log(errors[item.name][0].split(' '));
  
    let eachNextElement = item.parentElement.nextElementSibling
    console.log(eachNextElement);
    eachNextElement.innerHTML =  
    `<p id="ticketName-message" data-message="套票名稱">
    <i class="fas fa-exclamation-circle"></i>
             <span>${errors[item.name][0].split(' ')[1]}</span>
       </p>`
    //
    }
  })
}else{
  console.log("都有填寫");
  regionSearch.value = "" 
  console.log("all sets");
  //push 到data
  let obj = {};
  obj.id = data.length+1
  obj.name = ticketName.value;
  obj.imgUrl=ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.price = ticketPrice.value;
  obj.group = ticketNum.value;
  obj.rate = ticketRate.value;
  obj.description = ticketDescription.value;
  data.push(obj);
  console.log(obj)
  console.log(regionSearch.value);
  render(data);
  addTicketform.reset();
  donuteChart()

}



//以下是不使用validate.js, 土法煉鋼的方法
//先確認有沒有未填寫的input item, 如果有 missInputItem +=1;
// let inputItem = [ticketName, ticketImgUrl, ticketRegion, ticketPrice, ticketNum, ticketRate, ticketDescription];
// let missInputItem = 0;

// inputItem.forEach(function(item){
//   if(item.value === ""){
//     missInputItem += 1;
//   }
// });

// console.log(`有${missInputItem}項inputItem沒有填寫`);

// if(missInputItem > 0){
//   //如果有未填寫的inputItem, 單純做頁面上的渲染
//   //套票名稱
//   if(ticketName.value === ""){
//     requiredRender(ticketName_message);
//   }else{
//      noRequire(ticketName_message)
//   };
//   //圖片網址
//   if(ticketImgUrl.value === ""){
//     requiredRender(ticketImgUrl＿message);
//   }else{
//     noRequire(ticketImgUrl＿message)
//   };
//   //景點地區
//   if(ticketRegion.value === ""){
//     requiredRender(ticketRegion_message);
//   }else{
//     noRequire(ticketRegion_message)
//   };
//   //套票金額
//   if(ticketPrice.value === ""){
//     requiredRender(ticketPrice_message);
//   }else{
//     noRequire(ticketPrice_message)
//   };
//   //套票組數
//   if(ticketNum.value === ""){
//     requiredRender(ticketNum_message);
//   }else{
//     noRequire(ticketNum_message)
//   };
//   //套票星級
//   if(ticketRate.value === ""){
//     requiredRender(ticketRate_message);
//   }else{
//     noRequire(ticketRate_message)
//   };
//   //套票描述
//   if(ticketDescription.value === ""){
//     requiredRender(desRequired);
//   }else{
//     noRequire(desRequired)
//   };

//   //都填寫了，跑以下程式碼
// } else{
//   //把必填紅字給拿掉，如果不加以下程式碼會造成原本出現的必填紅字在新增成功後還是會留在頁面上
//   noRequire(ticketName_message);
//   noRequire(ticketImgUrl＿message);
//   noRequire(ticketRegion_message);
//   noRequire(ticketPrice_message);
//   noRequire(ticketNum_message);
//   noRequire(ticketRate_message);
//   noRequire(desRequired);
//   //選單回到全部地區
  // regionSearch.value = "" 
  // console.log("all sets");
  // //push 到data
  // obj.id = data.length+1
  // obj.name = ticketName.value;
  // obj.imgUrl=ticketImgUrl.value;
  // obj.area = ticketRegion.value;
  // obj.price = ticketPrice.value;
  // obj.group = ticketNum.value;
  // obj.rate = ticketRate.value;
  // obj.description = ticketDescription.value;
  // data.push(obj);
  // console.log(obj)
  // console.log(regionSearch.value);
  // render(data);
  // addTicketform.reset();
  // donuteChart()
// }


});

});





//function()區域
function render(data){

  console.log(data.length)

  if(data.length == 0){
   cantFindArea.innerHTML=`<h3>查無此關鍵字資料</h3>
   <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="">`;
  }else{
  cantFindArea.innerHTML=""
  };

  let str = "";
  data.forEach(function(item, index){
      let contentText = `
      <li class="ticketCard">
  <div class="ticketCard-img">
  <a href="#">
  <img src=${item.imgUrl} alt="">
  </a>
  <div class="ticketCard-region">${item.area}</div>
  <div class="ticketCard-rank">10</div>
  </div>
  <div class="ticketCard-content">
  <div>
  <h3>
    <a href="#" class="ticketCard-name">${item.name}</a>
  </h3>
  <p class="ticketCard-description">
    ${item.description}
  </p>
  </div>
  <div class="ticketCard-info">
  <p class="ticketCard-num">
    <span><i class="fas fa-exclamation-circle"></i></span>
    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
  </p>
  <p class="ticketCard-price">
    TWD <span id="ticketCard-price">${item.price}</span>
  </p>
  </div>
  </div>
  </li>` 
      str += contentText
      
  })

  ticketCardArea .innerHTML = str;

  searchResult.textContent = `本次搜尋共${data.length}筆資料`
};




//render必填紅字的function
function requiredRender(input){
  input.innerHTML =`<i class="fas fa-exclamation-circle"></i>
  <span>必填</span>`
};
//不用紅字了
function noRequire(input){
  input.innerHTML = ``
};







  





