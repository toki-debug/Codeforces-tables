const api_url = "https://codeforces.com/api/";

const rand = Math.floor(Math.random() * 123456);
const tempo = 1640651957;

let contestId;
let contestName;
let contestIndex;
let contestVer;

function verify_r(num){
  let s;
  if(num < 1200){
    s = "rgb(204, 204, 204)";
  }
  else if(num >= 1200 && num < 1400){
    s = "rgb(119, 255, 119)";
  }
  else if(num >= 1400 && num < 1600){
    s = "rgb(119, 221, 187)";
  }
  else if(num >= 1600 && num < 1900){
    s = "rgb(43, 43, 255)";
  }
  else if(num >= 1900 && num < 2100){
    s = "rgb(121, 63, 185)";
  }
  else if(num >= 2100 && num < 2300){
    s = "rgb(255, 204, 136)";
  }
  else if(num >= 2300 && num < 2400){
    s = "rgb(255, 187, 85)";
  }
  else if(num >= 2400 && num < 2600){
    s = "rgb(255, 119, 119)";
  }
  else if(num >= 2600 && num < 3000){
    s = "rgb(255, 51, 51)";
  }
  else if(num >= 3000){
    s = "rgb(223, 3, 3)";
  }
  return s;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function demo() {
  console.log("Taking a break...");
  await sleep(10000);
  console.log("Two seconds later, showing sleep in a loop...");
}

async function loadUserInfo() {
  const handle = new URL(window.location.href).searchParams?.get('handle') ?? '';
  const response = await fetch(api_url + '/user.info?' + new URLSearchParams({ handles: handle }));

  if (response.status === 200 && response.headers.get('content-type').indexOf('application/json') !== -1) {
    const data = await response.json();

    if (data.status === 'OK') {
      const user = data.result[0];
      
      document.querySelector('[data-name="titlePhoto"]').src = user.titlePhoto;
      document.querySelector('[data-name="menuPhoto"]').src = user.titlePhoto;
      document.querySelector('[data-name="handle"]').innerText = user.handle;
      document.querySelector('[data-name="rating"]').innerText = "Contest rating: " + user.rating;
      document.querySelector('[data-name="maxRating"]').innerText = "Max rating: " + user.maxRating;
      document.querySelector('[data-name="rank"]').innerText = user.rank;
      document.querySelector('[data-name="maxRank"]').innerText = user.maxRank;
      
      let element = document.getElementById("rank_color");
      let element1 = document.getElementById("maxRank_color");

      element.style.color = verify_r(user.rating);
      element1.style.color = verify_r(user.maxRating);
      
      // console.log(user.organization.length);
      if(typeof user.organization !== 'undefined' && user.organization.length !== 0){
        document.querySelector('[data-name="organization"]').innerText = "From: " + user.organization;
        
      }
      
      if(typeof user.country !== 'undefined')
        document.querySelector('[data-name="country"]').innerText = "Country: " + user.country;
    } 
    else {
      alert("EU acho que fudeu um pouco...");
      location.href = 'index.html';
    }
  }
  else {
    alert("Olha, assim, fudeu com toda certeza!");
    location.href = 'index.html';
  }
}

$(document).ready(function (e) {
  if ($("#input_search")?.val()?.length > 0) {
    $("#input_search").parent("label").addClass("active");
  }
  $("#input_search").on("focus", function () {
    $(this).parent("label").addClass("active");
  });

  $("#input_search").on("blur", function () {
    if ($(this).val().length == 0)
      $(this).parent("label").removeClass("active");
  });
  $("#handle-form").submit(async function (e) {
    e.preventDefault();
    let handle = "";
    handle = $("#handle").val().trim();
    if (!handle) {
      console.log("Nada aqui ainda");
      return;
    }

    console.log("Oppa");
    const res = await fetch(
      api_url + "user.status?" + new URLSearchParams({ handle: handle })
    );
    const json = await res.json();
    json.result.reduce((acc, v) => {
      if (!acc[v.contestId]) acc[v.contestId] = [];
      acc[v.contestId].push(v);
      return acc;
    }, {});
    console.log(json);
    let tr, th;
    let order = [
      "contestId",
      "kills",
      "deaths",
      "broken",
      "placed",
      "fish",
      "onlinetime",
      "mobskilled",
      "crops",
    ];

    for (var i = 0; i < json.length; i++) {
      tr = $("<tr/>");
      th = $("<tr/>");

      if (i === 0) {
        // create table headers
        for (var j = 0; j < order.length; j++) {
          th.append("<th>" + order[j] + "</th>");
          $("table").append(th);
        }
      }

      for (var j = 0; j < order.length; j++) {
        tr.append("<td>" + json[i][order[j]] + "</td>");
        $("table").append(tr);
      }
    }
  });
});

/**$(document).ready(function () {
    var json = [{"uuid":"ba6df9ff-84fa-464b-a231-d36782a7fdba","username":"zFrost87","kills":"19","deaths":"6","broken":"34","placed":"34","fish":"15","onlinetime":"9493","mobskilled":"6","crops":"1"},{"uuid":"b07762f3-38a4-45b7-9f21-6147704aee4b","username":"frechette456","kills":"3","deaths":"11","broken":"33","placed":"61","fish":"0","onlinetime":"1251","mobskilled":"1","crops":"7"},{"uuid":"83af0a86-7c09-4c32-8fa5-65db3c50b4cf","username":"MineManFrost","kills":"1","deaths":"2","broken":"16","placed":"1","fish":"0","onlinetime":"238","mobskilled":"0","crops":"0"},{"uuid":"71cb5612-d586-4390-ad78-05d295d6d2bd","username":"Nikolassparrow","kills":"0","deaths":"2","broken":"1","placed":"2","fish":"0","onlinetime":"30","mobskilled":"0","crops":"0"},{"uuid":"c34f51b5-8f2a-4e08-8b83-99d5faf21ea9","username":"SetupS1CK","kills":"0","deaths":"0","broken":"0","placed":"0","fish":"0","onlinetime":"81","mobskilled":"0","crops":"0"},{"uuid":"80212863-9466-4a4b-852e-5812e77d075b","username":"PickCottonNig","kills":"0","deaths":"0","broken":"0","placed":"0","fish":"0","onlinetime":"835","mobskilled":"0","crops":"0"},{"uuid":"a64de20f-91e7-4bb0-80db-4f7f1614d693","username":"OstenGaming","kills":"0","deaths":"0","broken":"1","placed":"0","fish":"0","onlinetime":"213","mobskilled":"0","crops":"0"},{"uuid":"25c60209-9fd4-42b8-a2b7-d78e01c0b3ae","username":"OpTc","kills":"0","deaths":"0","broken":"0","placed":"0","fish":"0","onlinetime":"9","mobskilled":"0","crops":"0"},{"uuid":"3a1dc4c7-e9ec-425e-ad50-54ae37c5f1a7","username":"AutoDolphin","kills":"0","deaths":"11","broken":"20","placed":"1","fish":"0","onlinetime":"444","mobskilled":"0","crops":"0"}];
    var tr, th;
    var order = ['username', 'kills', 'deaths', 'broken', 'placed', 'fish', 'onlinetime', 'mobskilled', 'crops'];
  
    for (var i = 0; i < json.length; i++) {
      tr = $('<tr/>');
      th = $('<tr/>');
      
      if (i === 0) { // create table headers               
        for (var j = 0; j < order.length; j++) { 
          th.append("<th>" + order[j] + "</th>");
          $('table').append(th)
        }         
      }     
      
      for (var j = 0; j < order.length; j++) { 
        tr.append("<td>" + json[i][order[j]] + "</td>");
        $('table').append(tr);      
      }
    }
});*/
