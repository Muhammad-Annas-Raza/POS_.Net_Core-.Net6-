var write_message2 = document.getElementById("write_message2");
var btn2 = document.getElementById("bt2");
var popup2 = document.getElementById("popup2");

btn2.onclick = function () {
  popup2.classList.remove("active");
};

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
}

$.ajax({
  // url: 'http://localhost:8080/user/all/view',

  url: `http://localhost:63626/api/Home/GetStoreUsers/${sessionStorage.getItem(
    "store_id"
  )}`,
  type: "Get",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
  contentType: "application/json",
  success: function (res) {
    //console.log(res);
    document.getElementById("loadData").innerHTML = ``;
    let i = 1;
    for (obj of res) {
      document.getElementById("loadData").innerHTML += `
<tr class="xyz">

            <td class="text-center"><b>${i++}</b></td>             
            <td class="text-center Usr_name">${obj.user_name}</td>
            <td class="text-center usr_email">${obj.user_email_phone}</td>
            <td class="text-center">${obj.user_password}</td>
            <td class="text-center">User</td>
            <td class="text-center">${new Date(
              Date.parse(obj.user_created_at)
            ).toLocaleString()}</td>
            <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="usr_del('${
              obj.user_id
            }')"><i class='bx bx-trash'></i></button></th>
          </tr>
`;
    }
  },
  error: function (JQ) {
    if (JQ.status == 401) {
      sign_out();
    }
  },
});

function selected_user() {
  let filter = document.getElementById("id").value.toUpperCase();
  let myTable = document.getElementById("exam");
  let whole_table = document.querySelectorAll(".xyz");

  let tr = myTable.getElementsByClassName("Usr_name");
  let tr1 = myTable.getElementsByClassName("usr_email");
  for (var i = 0; i < tr.length; i++) {
    let td = tr[i].textContent || td.innerHTML;
    let td1 = tr1[i].textContent || td.innerHTML;
    if (td) {
      if (
        td.toUpperCase().indexOf(filter) > -1 ||
        td1.toUpperCase().indexOf(filter) > -1
      ) {
        console.log((whole_table[i].style.display = ""));
      } else {
        whole_table[i].style.display = "none";
      }
    }
  }
}

function usr_del(Usr_id) {
  // if(role_name != 'Super Admin'){
  $.ajax({
    url: `http://localhost:63626/api/Home/UserDelete/${Usr_id}`,
    type: "Delete",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {
      // console.log(res);
    },
    error: function (JQ) {
      if (JQ.status == 401) {
        sign_out();
      }
    },
  });
  window.location.href = "viewuser.html";
  // }else{
  //   write_message2.innerHTML = "Super Admin cannot be deleted";
  //   popup2.classList.add("active")
  //   // alert("Super Admin cannot be deleted")
  // }
}

// It automatically fires the user_all() when page is reload
// window.onload=()=>{
//   user_all();
// }
// if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){

//   window.location.href="index.html";
// }
