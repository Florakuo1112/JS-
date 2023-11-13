

let data = [];
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function(response){
  let getData = response.data.data;
  getData.forEach(function(item){
    data.push(item)
  });
//get資料後才能渲染資料
render(data)
  });

//DOM:預設的ticket area
const ticketCardArea = document.querySelector(".ticketCard-area");



function render(data){
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
}




//level 3
//篩選功能

const regionSearch = document.querySelector(".regionSearch");
const searchResult = document.querySelector("#searchResult-text");



regionSearch.addEventListener("change", function(e){
 
if(e.target.value === ""){
   //searchResult.textContent = `本次搜尋共${data.length}筆資料` 已把這段加入 init()
     render(data);
     return
}
let filterData = [];
let clickItem = e.target.value;
   data.forEach(function(item){
     if(item.area === clickItem){
       console.log(item.area);
       filterData.push(item)
     }
   });
   render(filterData)
}
)
 
//增加票券功能

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
const addTicketform = document.querySelector(".addTicket-form")


function requiredRender(input){
  input.innerHTML =`<i class="fas fa-exclamation-circle"></i>
  <span>必填</span>`
};



addTicket.addEventListener("click",function(e){
    let obj = {};
    obj.id = data.length+1
    //套票名稱
    if(ticketName.value === ""){
      requiredRender(ticketName_message);
  //return;
    }else{
        obj.name = ticketName.value;
    };
    //圖片網址
    if(ticketImgUrl.value === ""){
      requiredRender(ticketImgUrl＿message);
    // return;
    }else{
      obj.imgUrl=ticketImgUrl.value;
    };
    //景點地區
    if(ticketRegion.value === ""){
      requiredRender(ticketRegion_message);
     // return;
    }else{
      obj.area = ticketRegion.value;
    };
    //套票金額
    if(ticketPrice.value === ""){
      requiredRender(ticketPrice_message);
    // return;
    }else{
      obj.price = ticketPrice.value;
    };
    //套票組數
    if(ticketNum.value === ""){
      requiredRender(ticketNum_message);
    //  return;
    }else{
      obj.group = ticketNum.value;
    };
    //套票星級
    if(ticketRate.value === ""){
      requiredRender(ticketRate_message);
     // return
    }else{
      obj.rate = ticketRate.value;
    };
    //套票描述
    if(ticketDescription.value === ""){
      requiredRender(desRequired);
      return;
    }else{
      obj.description = ticketDescription.value;
    };

    console.log(obj);
    data.push(obj);
    addTicketform.reset();
    render(data);
    //
    
    })

   

  





