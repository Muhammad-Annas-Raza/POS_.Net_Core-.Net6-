 
$.ajax({
    url: `http://localhost:63626/api/Home/GetAllStores/${sessionStorage.getItem("role_id")}`,
    type: 'Get',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {
  //console.log(res);
 document.getElementById('loadData').innerHTML=``;
 let i = 1;
 for(obj of res){
 
document.getElementById('loadData').innerHTML+=`
<tr class="xyz">

          <td class="text-center"><b>${(i++)}</b></td>             
          <td class="text-center">
          <img src="${obj.store_logo == null ?"assets/img/logo.png":obj.store_logo}" alt="Profile" height="80" width="80" class="img-fluid rounded-circle">
          </td>
          <td class="text-center Usr_name">${obj.store_name}</td>
          <td class="text-center usr_email">${obj.store_description}</td>
          <td class="text-center">${new Date(Date.parse(obj.store_created_at)).toLocaleString()}</td>                              
          <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="storr_del('${obj.store_id}')"><i class='bx bx-trash'></i></button></th>
        </tr>
`
;
 
} 
    },
error:function(JQ){
  if(JQ.status == 401){
    sign_out();
  }  
}
  });
  function storr_del(store_id){
      $.ajax({
              url: `http://localhost:63626/api/Home/StoreDelete/${store_id}/${sessionStorage.getItem('role_id')}`,
              type: 'Delete',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },        
              success: function (res) {
                // console.log(res);
              },
      error:function(JQ){
        if(JQ.status == 401){
          sign_out();
        }  
      }
            });
             window.location.href = 'viewdeletestores.html';    
    }










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