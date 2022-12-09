 

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
  
  
  
      var write_message2 = document.getElementById("write_message2");
      var btn2 = document.getElementById("bt2");
      var popup2 = document.getElementById("popup2");
  
      btn2.onclick = function () {
        document.getElementById('boooody').classList.remove('loadDat');
        popup2.classList.remove("active")
      }
      function addcat() {
        if (document.getElementById("cat_id").value == "") {
          document.getElementById('boooody').classList.add('loadDat');
          write_message2.innerHTML = "Please input Category!!!";
          popup2.classList.add("active")
        } else {
          $.ajax({
            url:`http://localhost:63626/api/Home/AddCategory/${sessionStorage.getItem("store_id")}`,
            type: 'Post',
            contentType: 'application/json',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
            data: JSON.stringify({
              "category_name": document.getElementById("cat_id").value
            }),
            success: function (res) {
                write_message2.innerHTML = "Category "+"\""+document.getElementById("cat_id").value+"\""+" is Added";
                popup2.classList.add("active");
                document.getElementById('boooody').classList.add('loadDat');
                document.getElementById("cat_id").value="";
            },error:function(JQ){
              if(JQ.status == 401){
                sign_out();
              }}
          });
          
  
        }
  
  
      }
  //     if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){
    
  //   window.location.href="index.html";
  // }
   
 
  