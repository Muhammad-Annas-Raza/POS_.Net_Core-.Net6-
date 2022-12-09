 
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
  
  
  
      $.ajax({
        url: `http://localhost:63626/api/Home/GetCategory/${sessionStorage.getItem("store_id")}`,
        type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        success: function (res) {
    //  console.log(res);
     document.getElementById('loadData1').innerHTML=``;
     let i = 1;
     for(obj of res){
  document.getElementById('loadData1').innerHTML+=`
  <tr class="xyz1">
      
              <td class="text-center"><b>${(i++)}</b></td>
              <td class="text-center categ_name">${obj.category_name}</td>
              <td class="text-center">${new Date(Date.parse(obj.category_created_at)).toLocaleString()}</td>
              <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="cat_del('${obj.category_id}')"><i class='bx bx-trash'></i></button></th>
            </tr>
  `;
  }
  
    },
    error:function(JQ){
      if(JQ.status == 401){
        sign_out();
      }  
    }
  });  
  
  
  function cat_del(categ_id){
    $.ajax({
            url: `http://localhost:63626/api/Home/CategoryDelete/${categ_id}`,
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
          window.location.href = 'viewcategory.html';
  }
  
  function selected_categ(){
      let filter = document.getElementById('id').value.toUpperCase();
      let myTable = document.getElementById('exam1');
      let whole_table = document.querySelectorAll('.xyz1');
  
      let tr = myTable.getElementsByClassName("categ_name")
      for(var i=0; i<tr.length; i++) {
        let td = tr[i].textContent || td.innerHTML;
      if(td) {
              if(td.toUpperCase().indexOf(filter) > -1){
                console.log(whole_table[i].style.display = "")
              }else{
                whole_table[i].style.display = "none"
              }
            }
          }
  
  }
  // if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){
    
  //   window.location.href="index.html";
  // }
   
 
  