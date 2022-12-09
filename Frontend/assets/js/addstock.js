
 
  if (sessionStorage.getItem('fk_role') == '1') {
    document.getElementById('nameee').innerHTML = sessionStorage.getItem('name');
    document.getElementById('ne').innerHTML = sessionStorage.getItem('name');
    document.getElementById('roleee').innerHTML = 'Super Admin';

  }
  if (sessionStorage.getItem('fk_role') == '2') {

    document.getElementById('main').classList.add("mainn");
    document.getElementById('main').classList.remove("main");
    document.getElementById('sidebar').classList.add("none");
    document.getElementById('nameee').innerHTML = sessionStorage.getItem('name');
    document.getElementById('ne').innerHTML = sessionStorage.getItem('name');
    document.getElementById('roleee').innerHTML = 'User';
    document.querySelector('.togle').classList.add("none");
  }





  $(function () {

    $('#btnSelected').click(function () {
      var selected = $("#lstFruits option:selected");
      var message = "";
      selected.each(function () {
        message += $(this).text() + " " + $(this).val() + "\n";
      });
    });
  });





  var write_message7 = document.getElementById("write_message7");
  var btn7 = document.getElementById("bt7");
  var popup7 = document.getElementById("popup7");


  btn7.onclick = function () {
    document.getElementById('boooody').classList.remove('loadDat');
    popup7.classList.remove("active")
  }







  function getProdVALUE() {
    var dataFromSelector1 = document.querySelector("#loadData8").value;
    // console.log("AAAAAAAAA",dataFromSelector1)
    return dataFromSelector1;
  }

  $.ajax({
        url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem("store_id")}`,          
        type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    success: function (res) {
      // console.log(res);

      document.getElementById("loadData8").innerHTML = `<option data-tokens="Select Product" selected >Select Product</option>
          
          
          `;
      for (obj of res) {
        // console.log(`${obj.product_name}`);
        document.getElementById("loadData8").innerHTML += `
            <option value="${obj.product_id}"><b>${obj.product_name}</b></option>
            <br>
        `;
      }
    }
  });


  function addstock() {

    if (document.getElementById("stockkk").value == "") {
      document.getElementById('boooody').classList.add('loadDat');
      write_message7.innerHTML = "Please input Stock!!!";
      popup7.classList.add("active");
    } else {
      //    http://localhost:8080/dashboard/all

      $.ajax({
        url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem("store_id")}`,          
        type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        success: function (res) {
          // console.log(res);
          for (obj of res) {
            if (obj.product_id == getProdVALUE()) {
              let a = parseInt(obj.product_available_quantity)
              let b = parseInt(document.getElementById("stockkk").value)
               a = parseInt(a+b); 
              //  console.log("obj = ",obj.available_quantity);
              //  console.log(document.getElementById("stockkk").value);
              //  console.log("a : ",a);
              $.ajax({
        url: `http://localhost:63626/api/Home/StockAlter/${getProdVALUE()}/${a}`,          
        type: 'Put',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
                
                success: function (res) {
                  // console.log(res);
                  document.getElementById('boooody').classList.add('loadDat');
              write_message7.innerHTML = "" + "\"" + document.getElementById("stockkk").value + "\"" + " pieces are Added";
              popup7.classList.add("active");
              document.getElementById("stockkk").value = "";                               
                },
              });
              break;
            }
       }
        }
      });
    }
  }



  if (sessionStorage.getItem('name') == '' || sessionStorage.getItem('fk_role') == '') {

    window.location.href = "index.html";
  }

  function sign_out() {

    sessionStorage.setItem('name', '')

    sessionStorage.setItem('fk_role', '');

  }


 