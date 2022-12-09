 
// Index Page Ajax ====== Start =======

var write_message3 = document.getElementById("write_message3");
var btn3 = document.getElementById("bt3");
var popup3 = document.getElementById("popup3");

btn3.onclick = function () {
  popup3.classList.remove("active");



};


// function login() {
//   $.ajax({
//     url: "http://localhost:63626/api/Home/StoreRegister",
//     type: "get",
//     success: function (res) {
//       for (obj of res) {
//       }   
//     },
//   });
// }



function login() {
document.getElementById("errmsg4").classList.add("d-none");
document.getElementById("errmsg5").classList.add("d-none");
document.getElementById("errmsg6").classList.add("d-none");
let a = document.getElementById("user_name").value;
let b = document.getElementById("user_password").value;
if(a.trim() == ""){
  document.getElementById("errmsg4").classList.remove("d-none");
  // console.log("Empty")
}if(b.trim() == ""){
  document.getElementById("errmsg5").classList.remove("d-none");
  // console.log("Empty")
}
if(a.trim() != "" && b.trim() != ""){
  document.getElementById("user_name").value ="";
  document.getElementById("user_password").value="";
  document.getElementById("errmsg4").classList.add("d-none");
  document.getElementById("errmsg5").classList.add("d-none");
  $.ajax({
    url: 'http://localhost:63626/api/Home/UserLogin',
    type: 'post',
    contentType: 'application/json',       
    data: JSON.stringify( 
      {
        "user_name": a,
        "user_password": b
      }
    ),              
    success: function (result) { 
      sessionStorage.setItem("token",result.split("\t\t")[0]);
      sessionStorage.setItem("user_id",result.split("\t\t")[1]);
      sessionStorage.setItem("store_id",result.split("\t\t")[2]);
      sessionStorage.setItem("role_id",result.split("\t\t")[3]);
      sessionStorage.setItem("role_name",result.split("\t\t")[3] == 1?"Super Admin":result.split("\t\t")[3] == 2?"Owner":result.split("\t\t")[3] == 3?"User":"No Role Found");
      sessionStorage.setItem("user_name",result.split("\t\t")[4]);
      window.location.href = result.split("\t\t")[5]; 
     
  },
    error:function(jQerr){
        if(jQerr.responseText ==  undefined){
          document.getElementById("errmsg6").classList.remove("d-none");
        document.getElementById("errmsg6").innerHTML= `<b>Failed to fetch API</b>`;
        }else{
          document.getElementById("errmsg6").classList.remove("d-none");
        document.getElementById("errmsg6").innerHTML= `<b>User name or password is incorrect</b>`;
        
        }  
               
    }
  });

}
}

 