 
    
// if (sessionStorage.getItem('fk_role') == '1') {
//       document.getElementById('nameee').innerHTML = sessionStorage.getItem('name');
//       document.getElementById('ne').innerHTML = sessionStorage.getItem('name');
//       document.getElementById('roleee').innerHTML = 'Super Admin';
      
//     }
//     if (sessionStorage.getItem('fk_role') == '2') {

//       document.getElementById('main').classList.add("mainn");
//       document.getElementById('main').classList.remove("main");
//       document.getElementById('sidebar').classList.add("none");
//       document.getElementById('nameee').innerHTML = sessionStorage.getItem('name');
//       document.getElementById('ne').innerHTML = sessionStorage.getItem('name');
//       document.getElementById('roleee').innerHTML = 'User';
//       document.querySelector('.togle').classList.add("none");
//     }


    
var write_message = document.getElementById("write_message");
var btn1 = document.getElementById("bt1");
var popup1 = document.getElementById("popup1");

     btn1.onclick = function(){
    document.getElementById('boooody').classList.remove('loadDat');
    popup1.classList.remove("active")
}

function check(){
  $.ajax({
      url: 'http://localhost:63626/api/Home/GetAllUsers',
      type: 'Get',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      success: function (res) {
        for(obj of res){
      //console.log(obj.user_phone);
     //console.log("The match is : "+document.querySelector("#user_email").value);

    if (obj.user_email_phone === document.getElementById("user_email").value) {
      flag3 = 1;  
      document.getElementById('boooody').classList.add('loadDat');
      write_message.innerHTML ="Phone no. is duplicated";
      popup1.classList.add("active");
      document.getElementById("user_email").value = "";

      break;
}

;
} 
      },
      error:function(JQ){
        if(JQ.status == 401){
          sign_out();
        }  
      }
    });
}
    function add() {
     
      if(document.getElementById("user_name").value == "" || document.getElementById("user_email").value == "" || document.getElementById("password").value == ""){
        document.getElementById('boooody').classList.add('loadDat');
        write_message.innerHTML ="Please input all the fields!!!";
        popup1.classList.add("active")
        // alert("Please input all the fields!!!");
        
      }else{  
 



      var flag3 = 0;

check();



    if (flag3 == 0) {
        
      
      $.ajax({
        url: `http://localhost:63626/api/Home/AddUser/${sessionStorage.getItem("store_id")}`,
        type: 'Post',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
        contentType: 'application/json',       
        data: JSON.stringify({
          "user_name": document.getElementById("user_name").value,
          "user_email_phone": document.getElementById("user_email").value,
          "user_password": document.getElementById("password").value
        }),
        success: function (res) {                
          document.getElementById('boooody').classList.add('loadDat');
          write_message.innerHTML ="User "+"\""+document.getElementById("user_name").value+"\""+" Added";
          popup1.classList.add("active");
          document.getElementById("user_name").value = "";
          document.getElementById("user_email").value = "";
          document.getElementById("password").value = "";
          //console.log(res);
        },
        error:function(JQ){
          if(JQ.status == 401){
            sign_out();
          }  
        }
      });











      }

    }
  }
//   if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){
  
//   window.location.href="index.html";
// }

 

 