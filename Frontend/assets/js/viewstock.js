 
      
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
            url: `http://localhost:63626/api/Home/Getdashboard/${sessionStorage.getItem("store_id")}`,          
            type: 'Get',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          success: function (res) {
      //  console.log(res);
       document.getElementById('loadData3').innerHTML=``;
       let  i = 1;
       for(obj of res){
    document.getElementById('loadData3').innerHTML+=`
      <tr class="xyz3">
              <td class="text-center"><b>${(i++)}</b></td>
              <td class="text-center cateeeeeee_name">${obj.category_name}</td>
              <td class="text-center prod_name">${obj.product_name}</td>
              <td class="text-center">${obj.product_available_quantity} pieces</td>
              <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="stock_clear('${obj.product_id}')"><i class='bx bx-trash'></i></button></th>
      </tr>           
    `;
    }}});
    
  
    function prod_search(){
      let filter = document.getElementById('id').value.toUpperCase();
      let myTable = document.getElementById('exam3');
      let whole_table = document.querySelectorAll('.xyz3');
  
      let tr = myTable.getElementsByClassName("prod_name")
      let tr1 = myTable.getElementsByClassName("cateeeeeee_name")
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
  
  
  
  
    function stock_clear(prod_id){
  
  
        $.ajax({
            url: `http://localhost:63626/api/Home/StockAlter/${prod_id}/0`,          
            type: 'Put',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
         
            success: function (res) {
              // console.log(res);
            }
          });
  
          window.location.href = 'viewstock.html';
          
  
    }
  //   if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){
    
  //   window.location.href="index.html";
  // }
  
    
  
 