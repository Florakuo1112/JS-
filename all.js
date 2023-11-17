

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
const addTicketform = document.querySelector(".addTicket-form")






axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function(response){
  let data = response.data.data;
  render(data);//get資料後才能渲染資料 放在then後面才能取得資料後再渲染

  //第七週主線任務
donuteChart()

function donuteChart(){
  let total = {};
  data.forEach(function(item){
    if(total[item.area] === undefined){
      total[item.area] = 1
    }else{
      total[item.area] += 1};
     
  });
  console.log(total)
 
  let areaAry = Object.keys(total); //取total的屬性變成陣列;
  let newData = [];
  areaAry.forEach(function(item){
    let ary = [];
    ary.push(item);
    ary.push(total[item]);
    newData.push(ary);
  });
  console.log(newData);

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
        width:10
        
    }
  });
  
 }


console.log(data)





//level 3
regionSearch.addEventListener("change", function(e){
  if(e.target.value === ""){
     //searchResult.textContent = `本次搜尋共${data.length}筆資料` 已把這段加入 init()
       render(data);
       console.log(regionSearch.value)
       return
  }
  let filterData = [];
  let clickItem = e.target.value;
     data.forEach(function(item){
       if(item.area === clickItem){
         console.log(`收尋${item.area}`);
         filterData.push(item);
         console.log(`${regionSearch.value}的資訊`);
       }
     });
     render(filterData)
  }
  );

  //增加票券功能
addTicket.addEventListener("click",function(e){
  let obj = {};
  

//先確認有沒有未填寫的input item, 如果有 missInputItem +=1;
let inputItem = [ticketName, ticketImgUrl, ticketRegion, ticketPrice, ticketNum, ticketRate, ticketDescription];
let missInputItem = 0;

inputItem.forEach(function(item){
  if(item.value === ""){
    missInputItem += 1;
  }
});

console.log(`有${missInputItem}項inputItem沒有填寫`);

if(missInputItem > 0){
  //如果有未填寫的inputItem, 單純做頁面上的渲染
  //套票名稱
  if(ticketName.value === ""){
    requiredRender(ticketName_message);
  }else{
     noRequire(ticketName_message)
  };
  //圖片網址
  if(ticketImgUrl.value === ""){
    requiredRender(ticketImgUrl＿message);
  }else{
    noRequire(ticketImgUrl＿message)
  };
  //景點地區
  if(ticketRegion.value === ""){
    requiredRender(ticketRegion_message);
  }else{
    noRequire(ticketRegion_message)
  };
  //套票金額
  if(ticketPrice.value === ""){
    requiredRender(ticketPrice_message);
  }else{
    noRequire(ticketPrice_message)
  };
  //套票組數
  if(ticketNum.value === ""){
    requiredRender(ticketNum_message);
  }else{
    noRequire(ticketNum_message)
  };
  //套票星級
  if(ticketRate.value === ""){
    requiredRender(ticketRate_message);
  }else{
    noRequire(ticketRate_message)
  };
  //套票描述
  if(ticketDescription.value === ""){
    requiredRender(desRequired);
  }else{
    noRequire(desRequired)
  };

  //都填寫了，跑以下程式碼
} else{
  //把必填紅字給拿掉，如果不加以下程式碼會造成原本出現的必填紅字在新增成功後還是會留在頁面上
  noRequire(ticketName_message);
  noRequire(ticketImgUrl＿message);
  noRequire(ticketRegion_message);
  noRequire(ticketPrice_message);
  noRequire(ticketNum_message);
  noRequire(ticketRate_message);
  noRequire(desRequired);
  //選單回到全部地區
  regionSearch.value = "" 
  console.log("all sets");
  //push 到data
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

});

});





//function()區域
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


//render必填紅字的function
function requiredRender(input){
  input.innerHTML =`<i class="fas fa-exclamation-circle"></i>
  <span>必填</span>`
};
//不用紅字了
function noRequire(input){
  input.innerHTML = ``
}







  





