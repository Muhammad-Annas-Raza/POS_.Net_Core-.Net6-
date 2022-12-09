
 
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
  
  
      
      var write_message6 = document.getElementById("write_message6");
      var btn6 = document.getElementById("bt6");
      var popup6 = document.getElementById("popup6");
  
      
      btn6.onclick = function () {
        document.getElementById('boooody').classList.remove('loadDat');
        popup6.classList.remove("active")
      }
  
      function getVALUE(){
        var dataFromSelector = document.querySelector("#loadData4").value;
        // console.log(dataFromSelector)
        return dataFromSelector;
      }
  
      $.ajax({
        url: `http://localhost:63626/api/Home/GetCategory/${sessionStorage.getItem("store_id")}`,
        type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        success: function (res) {
          //console.log(res);
          document.getElementById('loadData4').innerHTML = `<option value="" selected disabled>Select Category</option>`;
          for (obj of res) {
            document.getElementById('loadData4').innerHTML += `
            <option value="${obj.category_id}">${obj.category_name}</option>
            <br>
        `;
          }
        },error:function(JQ){
            if(JQ.status == 401){
              sign_out();
            }}
      });
  
  
      function addpro() {
  
        if (document.getElementById("ppname").value == "" || document.getElementById("pprice").value=="" ) {
          document.getElementById('boooody').classList.add('loadDat');
          write_message6.innerHTML = "Please input Product!!!";
          popup6.classList.add("active");
        } else {
  
        let testID = getVALUE();
        // console.log(testID);
        $.ajax({
          url:`http://localhost:63626/api/Home/AddProduct/${sessionStorage.getItem("store_id")}`,
          type: 'Post',
          contentType: 'application/json',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: JSON.stringify({
            "product_name": document.getElementById("ppname").value,
            "product_price": document.getElementById("pprice").value,
            "fk_category_id": testID
          }),
          success: function (res) {
            // console.log(res);
            document.getElementById('boooody').classList.add('loadDat');
            write_message6.innerHTML = "Product "+"\""+document.getElementById("ppname").value+"\""+" is Added";
            popup6.classList.add("active");
            //viewprod(document.getElementById("ppname").value);
           
            document.getElementById("ppname").value="";
            document.getElementById("pprice").value="";
          },error:function(JQ){
            if(JQ.status == 401){
              sign_out();
            }}
        });
      }
      }
  
 
  