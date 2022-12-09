$("#clckone").click(function () {
  $("#BrowseImage").click();
});

$('#BrowseImage').change(function () {
  if (this.files && this.files[0]) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.files[0]);
      fileReader.onload = function (x) {
          $('#UserImagee').attr('src', x.target.result);
      }
  }
});
function getFile(filePath) {
  return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
}

function getoutput() {
  var file_name = getFile(BrowseImage.value) + "." + BrowseImage.value.split('.')[1];
  //outputfile.value = getFile(BrowseImagee.value);
  //extension.value = BrowseImagee.value.split('.')[1];
  if (BrowseImage.value.split('.')[1].toLowerCase() == "jpg" || BrowseImage.value.split('.')[1].toLowerCase() == "png" || BrowseImage.value.split('.')[1].toLowerCase() == "jpeg") {

      document.getElementById("wrt_here1").innerHTML = `<span class="text-success">&nbsp;(` + file_name + `)<span>`;
      document.getElementById("er1").innerHTML = "";
  }
  else {
      document.getElementById("wrt_here1").innerHTML = `<span class="text-danger">&nbsp;(` + file_name + `)<span>`;
      document.getElementById("er1").innerHTML = `<span class="text-danger">Only .jpg .jpeg & .png are allowed !!!<span>`;
  }
}



$.ajax({
    url: `http://localhost:63626/api/Home/GetStoreName/${sessionStorage.getItem("store_id")}`,
    type: 'Get',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {   
  
      document.getElementById("str_logo").innerHTML =  `  <img src="${res.store_logo == null ?"assets/img/logo.png":res.store_logo}" alt="Profile" class="rounded-circle">`
      document.getElementById("profile-overview").innerHTML = 
      `<h5 class="card-title">Profile Details</h5>

      <div class="row">
          <div class="col-lg-3 col-md-4 label ">Store Name</div>
          <div class="col-lg-9 col-md-8">${res.store_name}</div>
      </div>

      <div class="row">
          <div class="col-lg-3 col-md-4 label">Store Description</div>
          <div class="col-lg-9 col-md-8">${res.store_description}</div>
      </div>

      <div class="row">
          <div class="col-lg-3 col-md-4 label">Store Created Time</div>
          <div class="col-lg-9 col-md-8">${new Date(
            Date.parse(res.store_created_at)
          ).toLocaleString()}</div>
      </div>`

      document.getElementById("str_name").value = res.store_name;
      document.getElementById("str_desc").value =res.store_description
      document.getElementById("str_crted_tm").value =new Date(
        Date.parse(res.store_created_at)
        ).toLocaleString()
        document.getElementById("UserImage").innerHTML =`<img src="${res.store_logo == null ?"assets/img/logo.png":res.store_logo}" alt="Profile" id="UserImagee">`
 

},
error: function (JQ) {
  if (JQ.status == 401) {
    sign_out();
  }
},
});



function alterStr(){

  // console.log($('#BrowseImage').get(0).files.length >0)
 if($('#BrowseImage').get(0).files.length >0){

 
  if (BrowseImage.value.split('.')[1].toLowerCase() == "jpg" || BrowseImage.value.split('.')[1].toLowerCase() == "png" || BrowseImage.value.split('.')[1].toLowerCase() == "jpeg") {
 let data = new FormData();
 var files = $('#BrowseImage').get(0).files;   // <input type="file" id="BrowseImage">
 if(files.length>0){
  data.append("file",files[0]);
 };
  $.ajax({
    url: `http://localhost:63626/api/Home/StoreAlter/${sessionStorage.getItem("store_id")}/${sessionStorage.getItem("role_id")}`,
    type: 'PUT',
    contentType :false,
    processData :false,
    data: data,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },      
    success: function (result) {   
        console.log(result)
        // setTimeout(function myfun()
        // {
        //     window.location.href="storeprofile.html"
        // },1000)
    },
    error: function (JQ) {
      if (JQ.status == 401) {
        sign_out();
      }
    },
  });
}
}
 
let a = document.getElementById("str_name").value;
let b= document.getElementById("str_desc").value;
$.ajax({
  url: `http://localhost:63626/api/Home/StoreUpdate/${sessionStorage.getItem("store_id")}/${sessionStorage.getItem("role_id")}`,
  type: 'PUT',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
  contentType: 'application/json',  
  data: JSON.stringify( 
    {
      "store_name":  a,
      "store_description":b 
    }
  ),              
  success: function (result) {   
      console.log(result)
      setTimeout(function myfun()
      {
          window.location.href="storeprofile.html"
      },1000)
  },
  error: function (JQ) {
    if (JQ.status == 401) {
      sign_out();
    }
  },
});


















}


 