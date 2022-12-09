$.ajax({
    url: `http://localhost:63626/api/Home/GetAllOwners/${sessionStorage.getItem("role_id")}`,
    type: 'Get',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {
  for(obj of res){
    strName(obj.user_id,obj.fk_store_id)
 }
}
});

function strName(user_id,store_id){ 
    $.ajax({
        url: `http://localhost:63626/api/Home/GetStoreName/${store_id}`,
        type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        success: function (res) {   
            // console.log(res.store_name)
            sessionStorage.setItem("axo"+user_id ,res.store_name) 

}});
}
 

$.ajax({
    url: `http://localhost:63626/api/Home/GetAllOwners/${sessionStorage.getItem("role_id")}`,
    type: 'Get',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {
  //console.log(res);
 document.getElementById('loadData').innerHTML=``;
 let i = 1;
 for(obj of res){
     //console.log(i,obj.user_email_status)
    // if(obj.user_email_status === 'Not Verified'){
    //     let x =  document.querySelectorAll(".apr");
    //     x.forEach(x => 
    //       {     
    //     x.setAttribute("disabled", "");
    //       });
    // }
  

document.getElementById('loadData').innerHTML+=`
<tr class="xyz">

          <td class="text-center"><b>${(i++)}</b></td>             
          <td class="text-center Usr_name">${obj.user_name}</td>
          <td class="text-center usr_email">${obj.user_email_phone}</td>
          <td class="text-center usr_email">${obj.user_verification_code}</td>
          <td class="text-center">${obj.user_email_status}</td>
          <td class="text-center">Owner</td>
          <td class="text-center">${new Date(Date.parse(obj.user_created_at)).toLocaleString()}</td> 
          <td class="text-center">${sessionStorage.getItem("axo"+obj.user_id)}</td> 
          <th scope="row" class="text-center"><button class="btn btn-primary" id='${obj.user_id}'  style="font-size: 18px;" onclick="useer_approve('${obj.user_id}')">Approve</button></th>                   
          <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="useer_del('${obj.user_id}')"><i class='bx bx-trash'></i></button></th>
        </tr>
`
;
if(obj.user_email_status === 'Not Verified'){
    document.getElementById(obj.user_id).setAttribute("disabled", "");
}
} 
    },
error:function(JQ){
  if(JQ.status == 401){
    sign_out();
  }  
}
  });







  function useer_approve(user_id)
  {

    // if(role_name != 'Super Admin'){
  $.ajax({
    url: `http://localhost:63626/api/Home/Approve/${user_id}/${sessionStorage.getItem("role_id")}`,
    type: 'Put',
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
  window.location.href = 'approveusers.html';
 
  }


  function useer_del(User_id){
 
      $.ajax({
              url: `http://localhost:63626/api/Home/OwnerDelete/${User_id}/${sessionStorage.getItem('role_id')}`,
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
            window.location.href = 'approveusers.html';    
    }






  function selected_user(){
    let filter = document.getElementById('id').value.toUpperCase();
    let myTable = document.getElementById('exam');
    let whole_table = document.querySelectorAll('.xyz');
    
    let tr = myTable.getElementsByClassName("Usr_name")
    let tr1 = myTable.getElementsByClassName("usr_email")
    for(var i=0; i<tr.length; i++) {
      let td = tr[i].textContent || td.innerHTML;
      let td1 = tr1[i].textContent || td.innerHTML;
    if(td) {
            if(td.toUpperCase().indexOf(filter) > -1 || td1.toUpperCase().indexOf(filter) > -1){
               console.log(whole_table[i].style.display = "")
            }else{
              whole_table[i].style.display = "none"
            }
          }
        }
      }
    