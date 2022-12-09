 
      
// res.user_email_phone
$.ajax({
    url: `http://localhost:63626/api/Home/GetById/${sessionStorage.getItem("user_id")}`,
    type: "Get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    contentType: "application/json",
    
    success: function (res){    
        console.log(res);  
       document.getElementById("profile-overview").innerHTML = 
       `<h5 class="card-title">Profile Details</h5>
       <div class="row">
           <div class="col-lg-3 col-md-4 label ">Name</div>
           <div class="col-lg-9 col-md-8">${res.user_name}</div>
       </div>
       <div class="row">
           <div class="col-lg-3 col-md-4 label">Role</div>
           <div class="col-lg-9 col-md-8" id="2">${sessionStorage.getItem("role_name")}</div>
       </div>
       <div class="row">
           <div class="col-lg-3 col-md-4 label">Email or Phone</div>
           <div class="col-lg-9 col-md-8" id="3">${res.user_email_phone}</div>
       </div>`
       document.getElementById("nnnmmm").value = sessionStorage.getItem("user_name")
       document.getElementById("def").value = sessionStorage.getItem("role_name")
       document.getElementById("ghi").value = res.user_email_phone
 
 
    },
    error: function (JQ) {
      if (JQ.status == 401) {
        sign_out();
      }
    },
  });
 
function Verifypwd(){    
let a = document.getElementById("PPPWWWDDD").value;
$.ajax({
    url: `http://localhost:63626/api/Home/GetById/${sessionStorage.getItem("user_id")}`,
    type: "Get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    contentType: "application/json",
    success: function (res) {
      //console.log(res);
       if(res.user_password == a)
       {
            document.getElementById('TH1').classList.remove("d-none","none");
            document.getElementById('TH2').classList.add("d-none","none");
            document.getElementById('TH4').classList.add("d-none","none");
        }else{
            document.getElementById('TH1').classList.add("d-none","none");
            document.getElementById('TH2').classList.remove("d-none","none");
            document.getElementById('TH4').classList.add("d-none","none");    
    }
    },
    error: function (JQ) {
      if (JQ.status == 401) {
        sign_out();
      }
    },
  });
}

function chg_name()
{
    let d = document.getElementById("nnnmmm").value;
    document.getElementById('TH5').classList.add("d-none","none");
        $.ajax({
        url: `http://localhost:63626/api/Home/Chgname/${sessionStorage.getItem("user_id")}`,
        type: 'PUT',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        contentType: 'application/json',  
        data: JSON.stringify( 
          {
            "user_name":  d
          }
        ),              
        success: function (result) {   
            sessionStorage.setItem("user_name",d)        
            document.getElementById('TH5').classList.remove("d-none","none");
            d = "";
            setTimeout(function myfun()
            {
                window.location.href="myprofile.html"
            },1000)
        },
        error: function (JQ) {
          if (JQ.status == 401) {
            sign_out();
          }
        },
      });

}
function chg_pwd()
{
    let a = document.getElementById("PWDDD").value;
    let b = document.getElementById("PPPD").value;
    if(a === b){
        document.getElementById('TH3').classList.add("d-none","none");
        document.getElementById('TH4').classList.add("d-none","none");
        $.ajax({
            url: `http://localhost:63626/api/Home/ChgPwd/${sessionStorage.getItem("user_id")}`,
            type: 'PUT',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            contentType: 'application/json',    
            data: JSON.stringify( 
              {
                "user_password":         a,
                "user_confirm_password": b
              }
            ),              
            success: function (result) {   
                document.getElementById('TH4').classList.remove("d-none","none");
                document.getElementById('TH1').classList.add("d-none","none");
                document.getElementById("PPPWWWDDD").value = "";
                document.getElementById("PWDDD").value = "";
                document.getElementById("PPPD").value = "";
            },
            error: function (JQ) {
              if (JQ.status == 401) {
                sign_out();
              }
            },
          });
    }else{
        document.getElementById('TH3').classList.remove("d-none","none");
        
    }
   
}