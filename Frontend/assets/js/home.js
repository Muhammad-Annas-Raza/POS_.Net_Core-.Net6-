var img_logo = sessionStorage.getItem("storee_logoo") == 'null'?"assets/img/logo.png":sessionStorage.getItem("storee_logoo");
 document.getElementById("storee_nameeee").innerHTML = sessionStorage.getItem("storee_nameee");
 document.getElementById("storee_logooo").innerHTML =`<img class="img-fluid" height="50" width="50" src="${img_logo}">`;
var write_message7 = document.getElementById("write_message7");
var btn7 = document.getElementById("bt7");
var popup7 = document.getElementById("popup7");

btn7.onclick = function () {
  // document.getElementById('loadData5').classList.remove('loadDat');
  document.getElementById("boooody").classList.remove("loadDat");
  popup7.classList.remove("active");
};

// if (sessionStorage.getItem('name') == '' || sessionStorage.getItem('fk_role') == '') {

//   window.location.href = "index.html";
// }

// document.addEventListener("onkeydown", tA())

// console.log(sessionStorage.getItem('fk_role'));

if (sessionStorage.getItem("fk_role") == "1") {
  document.getElementById("nameee").innerHTML = sessionStorage.getItem("name");
  document.getElementById("ne").innerHTML = sessionStorage.getItem("name");
  document.getElementById("roleee").innerHTML = "Super Admin";
}
if (sessionStorage.getItem("fk_role") == "2") {
  document.getElementById("main").classList.add("mainn");
  document.getElementById("main").classList.remove("main");
  document.getElementById("sidebar").classList.add("none");
  document.getElementById("nameee").innerHTML = sessionStorage.getItem("name");
  document.getElementById("ne").innerHTML = sessionStorage.getItem("name");
  document.getElementById("roleee").innerHTML = "User";
  document.querySelector(".togle").classList.add("none");
}

// console.log(sessionStorage.getItem('name'));
$.ajax({
  url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem(
    "store_id"
  )}`,
  type: "get",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
  success: function (res) {
    // console.log(res);

    document.getElementById("loadData5").innerHTML = ``;
    for (obj of res) {
      document.getElementById("loadData5").innerHTML += `
<div class="whole_table col-md-4">
<div class="card cardd">

  <p class="category_nameeeee"> ${obj.category_name} </p>
<div class="card-body">
<h3 class="mb-3 product_nameeeee">${obj.product_name}</h3>

<button type="button" class="btn btn-danger priceee" style="font-size:20px;" onclick="orderPr('${obj.product_id}','${obj.product_name}','${obj.product_price}','PQ_${obj.product_id}')">${obj.product_price} Rs.</button>
</div>
<span class="stock_nameeeee PQ_${obj.product_id}">${obj.product_available_quantity} pieces left</span>
</div> 
</div>
 
`;
    }
  },
  error:function(JQ){
    if(JQ.status == 401){
      sign_out();
    }  
  }
});

// var real_quantity = myTableeee.querySelector('.'+pQ).innerHTML.split(" ")[0];

var flaggggggg;

function minus_stock(pQ, pName) {
  let myTableeee = document.getElementById("loadData5");
  let a = myTableeee.querySelector("." + pQ).innerHTML;
  // console.log(a.split(" ")[0]);
  if (a.split(" ")[0] > 1) {
    let ppQQ = myTableeee.querySelector("." + pQ).innerHTML.split(" ")[0];
    myTableeee.querySelector("." + pQ).innerHTML = ppQQ - 1 + " pieces left";
    // console.log(ppQQ);
    flaggggggg = 0;
  } else if (flaggggggg == 0) {
    // document.getElementById('loadData5').classList.add('loadDat');
    document.getElementById("boooody").classList.add("loadDat");
    flaggggggg = 1;
    myTableeee.querySelector("." + pQ).innerHTML = 0 + " pieces left";
    write_message7.innerHTML = pName + " Out of Stock";
    popup7.classList.add("active");
    // myTableeee.classList.remove('loadDat');
  }
}

function plus_stock(pQ, pName) {
  let myTableeee = document.getElementById("loadData5");
  let ppQQ = parseInt(
    myTableeee.querySelector("." + pQ).innerHTML.split(" ")[0]
  );
  myTableeee.querySelector("." + pQ).innerHTML = ppQQ + 1 + " pieces left";
}

var sum = 0;
function orderPr(pId, pName, pPrice, pQ) {
  // minus_stock(pQ ,pName)

  var productList = [pId, pName, pPrice];
  if (document.querySelector("#receipt #pArea .pId.pr" + pId)) {
    // console.log(document.getElementById('loadData5').querySelector('.'+pQ).innerHTML.split(" ")[0]);
    productQTY(`pr${pId}`, pName, pQ);
  } else {
    minus_stock(pQ, pName);
    document.querySelector("#receipt #pArea").innerHTML += `
    <tr class="pId pr${pId}">
      <th scope="row" class="pName pN${pId}">${pName}</th>
      <th scope="row" class="pQty"><span id="pr${pId}">1</span></th>
      <th scope="row" class="pPrice"><span id="pr${pId}">${pPrice}</span></th>
      <th scope="row" class="pTotalPrice"><span id="pr${pId}">${pPrice}</span></th>
      
        <th scope="row" class="btnHide1"><button class="btn btn-danger" style="font-size: 20px;" onclick="productQTY('pr${pId}','${pName}','${pQ}')"> <i class='bx bx-plus'></i></button></th>
        <th scope="row" class="btnHide2"><button class="btn btn-danger" style="font-size: 20px;" onclick="productQTYLess('pr${pId}','${pName}','${pQ}','${pId}')"> <i class='bx bx-minus'></i></button></th>
        <th scope="row" class="btnHide3"><button class="btn btn-danger" style="font-size: 20px;" onclick="productDel('pr${pId}','${pId}','${pQ}')"> <i class='bx bx-trash'></i></button></th>
     
      </tr>
`;
  }
}

function productQTY(prIDs, pName, pQ) {
  minus_stock(pQ, pName);
  var getQTY = parseInt(
    document.querySelector("#receipt #pArea .pQty #" + prIDs).innerHTML
  );
  var getPrice = parseInt(
    document.querySelector("#receipt #pArea .pPrice #" + prIDs).innerHTML
  );
  var count = getQTY;
  var price = getPrice;
  if (getQTY >= 1) {
    count = count + 1;
    price = price * count;
    document.querySelector("#receipt #pArea .pQty #" + prIDs).innerHTML =
      "" + count;
    document.querySelector("#receipt #pArea .pTotalPrice #" + prIDs).innerHTML =
      "" + price;
  }
}

function productQTYLess(prIDs, pName, pQ, pid) {
  var getQTY = parseInt(
    document.querySelector("#receipt #pArea .pQty #" + prIDs).innerHTML
  );
  var getPrice = parseInt(
    document.querySelector("#receipt #pArea .pPrice #" + prIDs).innerHTML
  );
  var count = getQTY;
  var price = getPrice;
  if (getQTY > 1) {
    // $.ajax({
    //   url: 'http://localhost:8080/dashboard/all',
    //   type: 'get',
    //   success: function (res) {
    //     console.log(res);
    //     for (obj of res) {

    //       if (pid == obj.product_id) {
    //         if(obj.available_quantity > 0){
    //           plus_stock(pQ, pName)
    //         }
    //       }

    //     }
    //   }
    // });

    if (
      document
        .getElementById("loadData5")
        .querySelector("." + pQ)
        .innerHTML.split(" ")[0] > 0
    ) {
      plus_stock(pQ, pName);
    }
    count = count - 1;
    price = price * count;
    document.querySelector("#receipt #pArea .pQty #" + prIDs).innerHTML =
      "" + count;
    document.querySelector("#receipt #pArea .pTotalPrice #" + prIDs).innerHTML =
      "" + price;
  }
}

var now_quantity;

function productDel(prIDs, pid, pQ) {
  // console.log(ocument.querySelector("#receipt #pArea .pId").classList.contains(""+prIDs));
  if (document.querySelector("#receipt #pArea .pId." + prIDs)) {
    $.ajax({
      url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem(
        "store_id"
      )}`,
      type: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      success: function (res) {
        for (obj of res) {
          if (pid == obj.product_id) {
            let myTableeee = document.getElementById("loadData5");
            myTableeee.querySelector("." + pQ).innerHTML =
              obj.product_available_quantity + " pieces left";
            document.querySelector("#receipt #pArea .pId." + prIDs).remove();
            break;
          }
        }
      },
      error:function(JQ){
        if(JQ.status == 401){
          sign_out();
        }  
      }
    });

    // document.querySelector("#receipt #pArea .pId." + prIDs).remove()
  }
}

$("body").click(function () {
  var allData = document.querySelectorAll("#pArea .pId");
  allData.forEach((box) => {
    sum += parseInt(box.querySelector(".pTotalPrice span").innerHTML);
    // console.log(box.querySelector('.pTotalPrice span').innerHTML);
  });

  document.getElementById("summm").innerHTML = sum + " Rs.";
  sessionStorage.setItem("sum", sum);

  sum = 0;
});

$("body").mouseenter(function () {
  var allData = document.querySelectorAll("#pArea .pId");
  allData.forEach((box) => {
    sum += parseInt(box.querySelector(".pTotalPrice span").innerHTML);
    // console.log(box.querySelector('.pTotalPrice span').innerHTML);
  });

  document.getElementById("summm").innerHTML = sum + " Rs.";
  sessionStorage.setItem("sum", sum);

  sum = 0;
});

$("#search_prodd").keyup(function () {
  let filter = document.getElementById("search_prodd").value.toUpperCase();
  let myTable = document.getElementById("loadData5");
  let whole_table = document.querySelectorAll(".whole_table");

  let tr = myTable.getElementsByClassName("product_nameeeee");
  let tr1 = myTable.getElementsByClassName("category_nameeeee");
  let tr2 = myTable.getElementsByClassName("priceee");
  let tr3 = myTable.getElementsByClassName("stock_nameeeee");
  for (var i = 0; i < tr.length; i++) {
    let td = tr[i].textContent || td.innerHTML;
    let td1 = tr1[i].textContent || td.innerHTML;
    let td2 = tr2[i].textContent || td.innerHTML;
    let td3 = tr3[i].textContent || td.innerHTML;
    // console.log(td);
    if (td) {
      // let textvlaue = td. textContent || td.innerHTML;
      if (
        td.toUpperCase().indexOf(filter) > -1 ||
        td1.toUpperCase().indexOf(filter) > -1 ||
        td2.toUpperCase().indexOf(filter) > -1 ||
        td3.toUpperCase().indexOf(filter) > -1
      ) {
        console.log((whole_table[i].style.display = ""));
      } else {
        whole_table[i].style.display = "none";
      }
    }
  }
});

function stock_maintain() {
  var stock_array = [];
  var tableData1 = document.querySelector("#pArea").innerHTML;
  var pQty1 = document.querySelectorAll(".pQty");
  var pName1 = document.querySelectorAll(".pName");
  //console.log(tableData1);
  for (var i = 0; i < pQty1.length; i++) {
    let td = pQty1[i].textContent || pQty1[i].innerHTML;
    let ta = pName1[i].textContent || pName1[i].innerHTML;

    stock_array.push({ Name: ta, Quantity: td });
    //console.log(ta);
    //console.log(td);
  }
  for (let i = 0; i < stock_array.length; i++) {
    let n = stock_array[i].Name;
    let q = stock_array[i].Quantity;

    $.ajax({
      url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem(
        "store_id"
      )}`,
      type: "Get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      success: function (res) {
        //console.log(res);
        for (obj of res) {
          if (n == obj.product_name) {
            //console.log("The sum is : " + sessionStorage.getItem('sum'))
            if (obj.product_available_quantity > 0) {
              //console.log("The n is : " + n + " other is : " + obj.product_name + " Quantity is : " + obj.available_quantity + " P_id is : " + obj.product_id)
              let new_quantity = parseInt(obj.product_available_quantity - q);
              //console.log(new_quantity);
              if (new_quantity >= 0) {
                //  console.log(n ,q ,new_quantity)
                $.ajax({
                  url: `http://localhost:63626/api/Home/StockAlter/${obj.product_id}/${new_quantity}`,
                  type: "Put",
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  },
                  success: function (res) {
                    //console.log(res)
                  },
                  error:function(JQ){
                    if(JQ.status == 401){
                      sign_out();
                    }  
                  }
                });
              } else {
                //console.log(-new_quantity)
                $.ajax({
                  url: `http://localhost:63626/api/Home/StockAlter/${obj.product_id}/0`,
                  type: "Put",
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  },

                  success: function (res) {
                    // console.log(res)
                  },
                  error:function(JQ){
                    if(JQ.status == 401){
                      sign_out();
                    }  
                  }
                });
                alert(-new_quantity + " " + obj.product_name + " Out of Stock");
              }
            }
          }
        }
      },
      error:function(JQ){
        if(JQ.status == 401){
          sign_out();
        }  
      }
    });
  }
}

 
function printf() {
  stock_maintain();
  //console.log("The sum is : " + sessionStorage.getItem('sum'))
  // console.log(sum) 
  
    $.ajax({
      url: `http://localhost:63626/api/Home/record/insert/${sessionStorage.getItem("store_id")}`,
      type: "Post",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },

    contentType: "application/json",
    data: JSON.stringify({
      total_amount_per_slip: sessionStorage.getItem("sum"),
    }),
    success: function (res) {},
    error:function(JQ){
      if(JQ.status == 401){
        sign_out();
      }  
    }
  });

  let nnnn = sessionStorage.getItem("name");
  var now = new Date();
  var date = now.toLocaleDateString();
  var time = now.toLocaleTimeString();

  var date_Array = date.split("/");
  var monthhhh_value = date_Array[0];
  var dayyyy = date_Array[1];
  var yearrrr = date_Array[2];

  if (monthhhh_value == 1) {
    monthhhh = "January";
  }
  if (monthhhh_value == 2) {
    monthhhh = "February";
  }
  if (monthhhh_value == 3) {
    monthhhh = "March";
  }
  if (monthhhh_value == 4) {
    monthhhh = "April";
  }
  if (monthhhh_value == 5) {
    monthhhh = "May";
  }
  if (monthhhh_value == 6) {
    monthhhh = "June";
  }
  if (monthhhh_value == 7) {
    monthhhh = "July";
  }
  if (monthhhh_value == 8) {
    monthhhh = "August";
  }
  if (monthhhh_value == 9) {
    monthhhh = "September";
  }
  if (monthhhh_value == 10) {
    monthhhh = "October";
  }
  if (monthhhh_value == 11) {
    monthhhh = "November";
  }
  if (monthhhh_value == 12) {
    monthhhh = "December";
  }

  var allData = document.querySelectorAll("#pArea .pId");

  allData.forEach((box) => {
    box.querySelector(".btnHide1").remove();
    box.querySelector(".btnHide2").remove();
    box.querySelector(".btnHide3").remove();
    sum += parseInt(box.querySelector(".pTotalPrice span").innerHTML);
    // console.log(box.querySelector('.pTotalPrice span').innerHTML);
  });
  var tableData = document.querySelector("#pArea").innerHTML;
  // console.log(tableData);
  // console.log(document.getElementById('CashPaid').value);
  var cashPaid = document.getElementById("CashPaid").value;
  var cashBack =
    document.getElementById("CashPaid").value - sessionStorage.getItem("sum");
  if (cashPaid == "") {
    cashPaid = document.getElementById("CashPaid").value =
      sessionStorage.getItem("sum");
    cashBack = 0;
  }
  document.body.innerHTML =
    `
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
          <div class="container">
            <table class="table table-bordered">
            <tr>
            <th>
          <div class="text-center">====================================<br>
         <span class="fttt" >${sessionStorage.getItem("storee_nameee")}</span>
                                <br>====================================<br>
                                Date : ` +
    dayyyy +
    "-" +
    monthhhh +
    "-" +
    yearrrr +
    `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time : ` +
    time +
    `<br>
                                Operator Name : <span style="text-align: end;" class="">` +
    sessionStorage.getItem("user_name") +
    `<span><br> </div>  
                                </div>
                                <div class="container">
                                  <div style="margin-left:0px;" >
                                  <table class="table table-bordered mt-5 oTable" id="oTable pAArea">
                                    <thead>
                                    <tr class="text-center">
                                      <th scope="col">Product Name</th>
                                      <th scope="col">Quantity</th>
                                      <th scope="col">Unit Price</th>
                                      <th scope="col">Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody id="pArea" class="text-center">
                                      ${tableData}
                                    </tbody>
                                  </table>
                                  </div>
                                  <div class="text-center h3"><b>Net Amount :  ${sum}.00 Rs</b></div>
                                  <div class="container">
                                  <div class="container">
                                    <div class="container">
                                      <div class="container">
                                 <table class="table table-bordered mt-5">
                                  <tr>
                                  <th>Cash Paid</th>
                                  <th>${cashPaid} Rs</th>  
                                  </tr>
                                  <tr>
                                  <th>Cash Back</th>
                                  <th>${cashBack} Rs</th>
                                  </tr>                               
                                  </table>
                                  </div>
                                  </div>
                                  </div>
                                  </div>
                                  <br>
                                <div class="text-center"><br>Thank you for Shopping<br>Come Again!!!</div>
                              </th>
                                </tr>
                              </table>                             
                              <table class="table table-bordered" style="margin-top:-17px;">
                                <tr>
                                  <td colspan=2>
                                <div class="text-center" style="font-size:12px;">Software Developed By : <b>Muhammad Annas Raza</b></div> 
                                  </td>
                                </tr>
          </div>
        </table>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>

          `;
  window.print();
  location.reload();
  // window.location.herf = "home.html"
}

// if (sessionStorage.getItem('name') == '' || sessionStorage.getItem('fk_role') == '') {

//   window.location.href = "index.html";
// }

// function s_o() {

//   sessionStorage.setItem('name', '')

//   sessionStorage.setItem('fk_role', '');

// }
