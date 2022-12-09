 
  // var dateObjjj = new Date();
  // var monthhhh = dateObjjj.toLocaleString('en-us', { month: 'long' });
  // var dayyyy = dateObjjj.getUTCDate();
  // var yearrrr = dateObjjj.getUTCFullYear();
  
  var now = new Date()
        var date = now.toLocaleDateString();
        var date_Array = date.split("/");
        var monthhhh_value = date_Array[0]
        var dayyyy = date_Array[1]
        var yearrrr = date_Array[2]
  // console.log(dayyyy,monthhhh_value,yearrrr)
  
  
  if(monthhhh_value == 1){
       monthhhh = 'January'
     }
     if(monthhhh_value == 2){
       monthhhh = 'February'
     }
     if(monthhhh_value == 3){
       monthhhh = 'March'
     }
     if(monthhhh_value == 4){
       monthhhh = 'April'
     }
     if(monthhhh_value == 5){
       monthhhh = 'May'
     }
     if(monthhhh_value == 6){
       monthhhh = 'June'
     }
     if(monthhhh_value == 7){
       monthhhh = 'July'
     }
     if(monthhhh_value == 8){
       monthhhh = 'August'
     }
     if(monthhhh_value == 9){
       monthhhh = 'September'
     }
     if(monthhhh_value == 10){
       monthhhh = 'October'
     }
     if(monthhhh_value == 11){
       monthhhh = 'November'
     }
     if(monthhhh_value == 12){
       monthhhh = 'December'
     }
  
    //  console.log(dayyyy,monthhhh,yearrrr)
  
  document.getElementById("This_month").innerHTML = monthhhh;
  document.getElementById("This_day").innerHTML = dayyyy+"-"+monthhhh+"-"+yearrrr;
  
  
  
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
        url: `http://localhost:63626/api/Home/GetDailyRecord/${sessionStorage.getItem("store_id")}`,
        type: "Get",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
          success: function (res) {
      //  console.log(res);
       document.getElementById('loadData3').innerHTML=``;
       for(obj of res){
    document.getElementById('loadData3').innerHTML+=`
      <tr class="xyz3">
              <td class="text-center cateeeeeee_name">${obj.day}-${obj.month}-${obj.year}</td>
              <td class="text-center prod_name">${obj.daily_sale} Rs.</td>
              
              
      </tr>           
    `;
  // console.log( monthhhh_value)
    if(obj.day == dayyyy && obj.month == monthhhh_value && obj.year == yearrrr){
      document.getElementById("Today_sale").innerHTML = obj.daily_sale;
    }
    }}});
  
    function prodi_search(){
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
                whole_table[i].style.display = ""
              }else{
                whole_table[i].style.display = "none"
              }
             
            }
      }
    }
  
  
  
    $.ajax({
          url: `http://localhost:63626/api/Home/GetMonthlyRecord/${sessionStorage.getItem("store_id")}`,
          type: 'Get',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
          success: function (res) {
      //  console.log(res);
       document.getElementById('loadData10').innerHTML=``;
       for(obj of res){
    document.getElementById('loadData10').innerHTML+=`
      <tr class="xyz34">
              <td class="text-center cateeeeeeewww_name">${obj.month}-${obj.year}</td>
              <td class="text-center prodwwww_name">${obj.monthly_sale} Rs.</td>
              <th scope="row" class="text-center"><button class="btn btn-danger" style="font-size: 20px;" onclick="sale_del('${obj.month}','${obj.year}')"><i class='bx bx-trash'></i></button></th>
              
              
      </tr>           
    `;
  
    if(obj.month == monthhhh_value && obj.year == yearrrr){
      // console.log("hiiiii")
      document.querySelector("#This_month_sale").innerHTML = obj.monthly_sale
    }
  
    }}});
  
    function prodiuuu_search(){
      let filter = document.getElementById('iddddddd').value.toUpperCase();
      let myTable = document.getElementById('exam34');
      let whole_table = document.querySelectorAll('.xyz34');
  
      let tr = myTable.getElementsByClassName("prodwwww_name")
      let tr1 = myTable.getElementsByClassName("cateeeeeeewww_name")
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
  
   function sale_del(a,b){
     if(a == 'January'){
       a = '01'
     }
     if(a == 'February'){
       a = '02'
     }
     if(a == 'March'){
       a = '03'
     }
     if(a == 'April'){
       a = '04'
     }
     if(a == 'May'){
       a = '05'
     }
     if(a == 'June'){
       a = '06'
     }
     if(a == 'July'){
       a = '07'
     }
     if(a == 'August'){
       a = '08'
     }
     if(a == 'September'){
       a = '09'
     }
     if(a == 'October'){
       a = '10'
     }
     if(a == 'November'){
       a = '11'
     }
     if(a == 'December'){
       a = '12'
     }
     let ccc =b+"-"+a+"";
    //  console.log(ccc);
  $.ajax({
          url: `http://localhost:63626/api/Home/RecordDelete/${ccc}/${sessionStorage.getItem("store_id")}`,
          type: 'Delete',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },contentType: 'application/json',
          success: function (res) {
            // console.log(res);
          },
  
        });
         location.reload(); 
    }
  
  
  
  
     
  //   if(sessionStorage.getItem('name')=='' || sessionStorage.getItem('fk_role') == ''){
    
  //   window.location.href="index.html";
  // }
  
     
  
  
  
  
 