let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];



//預設
const ticketCardArea = document.querySelector(".ticketCard-area");

function init(){
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
  
    ticketCardArea .innerHTML = str
  
}

init()

//level 3
//篩選功能

const regionSearch = document.querySelector(".regionSearch");
const searchResult = document.querySelector("#searchResult-text");


regionSearch.addEventListener("change", function(e){
if(e.target.value == ""){

    searchResult.textContent = `本次搜尋共${data.length}筆資料`
    return init()
}

let str ="";
let resultNum = 0;
data.forEach(function(item, index){
    if(e.target.value == item.area){
        resultNum +=1;
        let content = `
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
  
        str += content;

        
        
    }
})
searchResult.textContent = `本次搜尋共${resultNum }筆資料`
ticketCardArea .innerHTML = str;

})
 
//增加票券功能
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelectorAll("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");  
const addTicket = document.querySelector(".addTicket-btn");
const mandatory = document.querySelector(".madatory");

addTicket.addEventListener("click",function(e){
    let obj = {};
    obj.id = data.length+1

    if(ticketName.value == ""){
        alert("請輸入套票名稱")
        return
    }else{
        obj.name = ticketName.value;
    };

    if(ticketImgUrl.value == ""){
        alert("請輸入圖片網址")
        return
    }else{
        obj.imgUrl = ticketImgUrl.value;
    };

    if(ticketRegion.value ==""){
        alert("請輸入景點地區")
        return
    }else{
        obj.area = ticketRegion.value;
    };
    if(ticketPrice.value == ""){
        alert("請輸入套票金額")
        return
    }else{
        obj.price = ticketPrice.value
    };
    if(ticketNum.value == ""){
        alert("請輸入套票組數")
        return
    }else{
        obj.group = ticketNum.value;
    };
    if(ticketDescription.value ==""){
        alert("請輸入套票描述")
        return
    }else{
        obj.description = ticketDescription.value;
    };
    console.log(obj);
    data.push(obj);
    init()
    })

  





