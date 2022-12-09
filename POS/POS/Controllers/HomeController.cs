using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using POS.Interface;
using POS.Models;
using POS.MyMethods;


namespace POS.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly Jwt Jwt;
        private readonly OtherMethods OtherMethods;
        private readonly IWebHostEnvironment WebHostEnvironment;
        private readonly IRepository<tbl_user> user;
        private readonly IRepository<tbl_role> role;
        private readonly IRepository<tbl_store> store;
        private readonly IRepository<tbl_product> product;
        private readonly IRepository<tbl_category> category;
        private readonly IRepository<tbl_record> record;
        public HomeController(IWebHostEnvironment WebHostEnvironment, IConfiguration config, IRepository<tbl_user> user, IRepository<tbl_role> role, IRepository<tbl_store> store, IRepository<tbl_product> product, IRepository<tbl_category> category, IRepository<tbl_record> record)
        {
            this.Jwt = new Jwt(config);
            this.WebHostEnvironment = WebHostEnvironment;
            this.OtherMethods = new OtherMethods(role, WebHostEnvironment);
            this.user = user;
            this.role = role;
            this.store = store;
            this.product = product;
            this.category = category;
            this.record = record;
        }


        // POST: api/Home/UserLogin
        [HttpPost]
        [Route("UserLogin")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] tbl_user u)
        {

            await OtherMethods.AddRole();

            List<tbl_user> AllRows = await user.GetAllRows();
            if (AllRows.Count == 0)
            {
                _ = await user.Create(new tbl_user() { fk_role_id = 1, user_approved = true, user_name = "Annas Raza", user_email_phone = "annasraza@gmail.com", user_password = "MTIz", user_created_at = DateTime.Now, user_verification_code = null, user_email_status = "Verified", fk_store_id = null });
            }
            try
            {
                tbl_user? row = user.LoginCheck(u);
                if (row == null)
                {
                    return Unauthorized("User name or password is incorrect");
                }
                if (row.user_approved == false && row.user_email_status == "Not Verified")
                {
                    return Ok($"xyz\t\t{row.user_id}\t\t{row.fk_store_id}\t\t{row.fk_role_id}\t\t{row.user_name}\t\temail_verification.html");
                }
                if (row.user_approved == false && row.user_email_status == "Verified")
                {
                    return Ok($"xyz\t\t{row.user_id}\t\t{row.fk_store_id}\t\t{row.fk_role_id}\t\t{row.user_name}\t\tanonymous.html");
                }
                if (row.user_approved == true && row.user_email_status == "Verified")
                {
                    string token = Jwt.Generate(row);
                    if (row.fk_role_id == 1)
                    {
                        return Ok(token + $"\t\t{row.user_id}\t\t{row.fk_store_id}\t\t{row.fk_role_id}\t\t{row.user_name}\t\tapproveusers.html");
                    }
                    else
                    {
                        return Ok(token + $"\t\t{row.user_id}\t\t{row.fk_store_id}\t\t{row.fk_role_id}\t\t{row.user_name}\t\thome.html");
                    }
                }
                else
                {
                    return StatusCode(500);
                }
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        // GET: 
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> Get()
        {
            List<tbl_user> AllRows = await user.GetAllRows();
            if (AllRows != null)
            {
                return Ok(AllRows);
            }
            return NotFound("No Record Found");
        }

        // GET  
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            tbl_user? Row = await user.GetRowById(id);
           
            if (Row != null)
            {

                Row.user_password = Row.user_password.Decrypt_password();
                return Ok(Row);
            }
            return NotFound("Record is not Found");
        }

        // POST         
        [HttpPost]
        [Route("UserRegister")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] Register r)
        {
            string code = DateTime.Now.ToString("fffffff");
            int a;

            await OtherMethods.AddRole();
            try
            {
                if (r.user_password == r.user_confirm_password)
                {
                    tbl_user u = new tbl_user() { fk_role_id = 2, user_approved = false, user_name = r.user_name, user_email_phone = r.user_email_Phone, user_password = r.user_password?.Encrypt_password(), user_created_at = DateTime.Now, user_verification_code = code, user_email_status = "Not Verified", fk_store_id = r.store_id };
                    a = await user.Create(u);
                    if (a > 0)
                    {
                        r.user_email_Phone?.Send_email(code);
                        return Ok("User Inserted");
                    }
                    else
                    {
                        return BadRequest("Failed To insert data");
                    }
                }
                else
                {
                    return BadRequest("password doesnot match");
                }

            }
            catch (Exception)
            {

                return BadRequest("Duplicate Email is found");
            }
        }
        // POST  
        [HttpPost]
        [Route("StoreRegister")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] tbl_store s)
        {
            s.store_description = "Add Logo and some description";
            s.store_logo = null;
            s.store_created_at = DateTime.Now;
            int a = await store.Create(s);
            if (a > 0)
            {
                return Ok("Store Created");
            }
            else
            {
                return NotFound("Failed To Create Store");
            }
        }

        // Get          
        [HttpGet]
        [Route("GetStoreDetails")]
        [AllowAnonymous]
        public async Task<IActionResult> Get1()
        {
            try
            {
                List<tbl_store> lst = await store.GetAllRows();
                if (lst.Count == 0)
                {
                    return NotFound("No record Found");
                }
                else
                {
                    return Ok(lst);
                }
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
        // Get          
        [HttpGet]
        [Route("Getdashboard/{fk_store_id}")]
        public async Task<IActionResult> Get2(long fk_store_id)
        {
            try
            {
                return Ok(await product.ProdCateinnerjoin(fk_store_id));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
        // POST  
        [HttpPost]
        [Route("VerifyEmail/{user_id}/{code}")]
        [AllowAnonymous]
        public async Task<IActionResult> Post1(long user_id, string code)
        {
            int a = await user.VerifyEmail(user_id, code);
            if (a > 0)
            {
                return Ok("anonymous.html");
            }
            else
            {
                return NotFound("Incorrect Code");
            }
        }

        // POST  
        [HttpPost]
        [Route("AddUser/{fk_store_id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Post2(long fk_store_id, [FromBody] tbl_user u)
        {
            try
            {
                u.fk_role_id = 3;
                u.user_approved = true;
                u.user_password = u.user_password?.Encrypt_password();
                u.user_created_at = DateTime.Now;
                u.user_verification_code = null;
                u.user_email_status = "Verified";
                u.fk_store_id = fk_store_id;
                int a = await user.Create(u);
                if (a > 0)
                {
                    return Ok("User Added");
                }
                else
                {
                    return Ok("Failed to add user");
                }
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        // Get          
        [HttpGet]
        [Route("GetStoreUsers/{fk_store_id}")]
        public async Task<IActionResult> Get3(long fk_store_id)
        {
            try
            {
                List<tbl_user> lst = await user.GetSpecificStoreUser(fk_store_id);
                foreach (tbl_user i in lst)
                {
                    //if (i.user_image != null)
                    //{
                    //    i.user_image = Path.Combine("",WebHostEnvironment.ContentRootPath+@"POSGallery\"+i.user_image);
                    //}
                    i.user_password = i.user_password?.Decrypt_password();
                }
                return Ok(lst);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }


        // PUT 
        [HttpPut]
        [Route("ChgPwd/{user_id}")]
        public async Task<IActionResult> Put(long user_id, [FromBody] Register r)
        {
            if (r.user_password == r.user_confirm_password)
            {
                tbl_user? row = await user.GetRowById(user_id);
                if (row != null && r.user_password != null)
                {
                    row.user_password = r.user_password.Encrypt_password();
                    return Ok(await user.Update(row));
                }
                return NotFound("Updation Failed");
            }
            else
            {
                return NotFound("Password Doesnot match");
            }            
        }

        // PUT 
        [HttpPut]
        [Route("Chgname/{user_id}")]
        public async Task<IActionResult> Put1(long user_id, [FromBody] Register r)
        {

            tbl_user? row = await user.GetRowById(user_id);
            if (row != null)
            {
                row.user_name = r.user_name;
                return Ok(await user.Update(row));
            }
            return NotFound("Updation Failed");
        }
 



        // DELETE api/<HomeController>/5
        [HttpDelete("UserDelete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            int a = await user.Delete(id);
            if (a > 0)
            {
                return Ok("User Deleted");
            }
            else
            {
                return NotFound("Failed to delete user");
            }
        }



        // ================================ Category ========================================
        // POST  
        [HttpPost]
        [Route("AddCategory/{fk_store_id}")]
        public async Task<IActionResult> Post3(long fk_store_id, [FromBody] tbl_category c)
        {
            try
            {
                c.category_created_at = DateTime.Now;
                c.fk_store_id = fk_store_id;
                int a = await category.Create(c);
                if (a > 0)
                {
                    return Ok("Category Added");
                }
                else
                {
                    return Ok("Failed to add Category");
                }
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        // Get          
        [HttpGet]
        [Route("GetCategory/{fk_store_id}")]
        public async Task<IActionResult> Get4(long fk_store_id)
        {
            try
            {
                return Ok(await user.GetSpecificStoreCategory(fk_store_id));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
        // DELETE  
        [HttpDelete("CategoryDelete/{id}")]
        public async Task<IActionResult> Delete1(long id)
        {
            int a = await category.Delete(id);
            if (a > 0)
            {
                return Ok("Category Deleted");
            }
            else
            {
                return NotFound("Failed to delete Category");
            }
        }


        //======================== Product ======================================
        // POST  
        [HttpPost]
        [Route("AddProduct/{fk_store_id}")]
        public async Task<IActionResult> Post4(long fk_store_id, [FromBody] tbl_product p)
        {
            try
            {
                p.product_available_quantity = 0;
                p.product_created_at = DateTime.Now;
                p.fk_store_id = fk_store_id;
                int a = await product.Create(p);
                if (a > 0)
                {
                    return Ok("product Added");
                }
                else
                {
                    return Ok("Failed to add product");
                }
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }



        // DELETE  
        [HttpDelete("ProductDelete/{id}")]
        public async Task<IActionResult> Delete2(long id)
        {
            int a = await product.Delete(id);
            if (a > 0)
            {
                return Ok("product Deleted");
            }
            else
            {
                return NotFound("Failed to delete product");
            }
        }

        //======================== Stock(Product Update) =================================
        // PUT 
        [HttpPut]
        [Route("StockAlter/{product_id}/{prod_avai_qty}")]
        public async Task<IActionResult> Put(long product_id, int prod_avai_qty)
        {
            tbl_product? row = await product.GetRowById(product_id);
            if (row != null)
            {
                row.product_available_quantity = prod_avai_qty;
                return Ok(await product.Update(row));
            }
            return NotFound("Updation Failed");
        }



        // Get          
        [HttpGet]
        [Route("GetStock/{fk_store_id}")]
        public async Task<IActionResult> Get5(long fk_store_id)
        {
            try
            {
                return Ok(await user.GetSpecificStoreProduct(fk_store_id));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }

        // ============================ Record ====================================
        // POST  
        [HttpPost]
        [Route("record/insert/{fk_store_id}")]
        public async Task<IActionResult> Post5(long fk_store_id, [FromBody] tbl_record r)
        {
            try
            {
                r.record_created_at = DateTime.Now;
                r.fk_store_id = fk_store_id;
                int a = await record.Create(r);
                if (a > 0)
                {
                    return Ok("Record Added");
                }
                else
                {
                    return Ok("Failed to add Record");
                }
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        // Get          
        [HttpGet]
        [Route("GetDailyRecord/{fk_store_id}")]
        public IActionResult Get6(long fk_store_id)
        {
            try
            {
                return Ok(record.GetSpecificStoreDailyRecord(fk_store_id));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
        // Get          
        [HttpGet]
        [Route("GetMonthlyRecord/{fk_store_id}")]
        public IActionResult Get7(long fk_store_id)
        {
            try
            {
                return Ok(record.GetSpecificStoreMonthlyRecord(fk_store_id));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }

        // DELETE  
        [HttpDelete("RecordDelete/{StartDate}/{fk_store_id}")]
        public async Task<IActionResult> Delete3(string StartDate, long fk_store_id)
        {
            int a = await record.DeleteRecord(StartDate, fk_store_id);
            if (a > 0)
            {
                return Ok("Record Deleted");
            }
            else
            {
                return NotFound("Failed to delete Record");
            }
        }


        //===============================  For Super Admin ===================

        // PUT 
        [HttpPut]
        [Route("Approve/{user_id}/{fk_role_id}")]
        public async Task<IActionResult> Put(long user_id, long fk_role_id)
        {
            if (fk_role_id == 1)
            {
                tbl_user? row = await user.GetRowById(user_id);
                if (row != null)
                {
                    row.user_approved = true;
                    return Ok(await user.Update(row));
                }
                return NotFound("Updation Failed");
            }
            else
            {
                return Unauthorized("You are not allowed");
            }
        }



        // GET: 
        [HttpGet]
        [Route("GetAllOwners/{fk_role_id}")]
        public async Task<IActionResult> Get(long fk_role_id)
        {
            if (fk_role_id == 1)
            {
                List<tbl_user> AllRows = await user.GetAllOwners();
                if (AllRows != null)
                {
                    return Ok(AllRows);
                }
                return NotFound("No Record Found");
            }
            else
            {
                return Unauthorized("You are not allowed");
            }
        }

        // GET: 
        [HttpGet]
        [Route("GetApprovedOwners/{fk_role_id}")]
        public async Task<IActionResult> Get1(long fk_role_id)
        {
            if (fk_role_id == 1)
            {
                List<tbl_user> AllRows = await user.GetApprovedOwners();
                if (AllRows != null)
                {
                    return Ok(AllRows);
                }
                return NotFound("No Record Found");
            }
            else
            {
                return Unauthorized("You are not allowed");
            }
        }

        // GET: 
        [HttpGet]
        [Route("GetStoreName/{store_id}")]
        public async Task<IActionResult> Get01(long store_id)
            {
           
                tbl_store? Row = await store.GetRowById(store_id);
                if (Row != null)
                {  
                    if (Row.store_logo != null)
                    {
                        Row.store_logo = Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + Row.store_logo);
                    }
                return Ok(Row);
                }
                return NotFound("No Record Found");
            
        }

        // DELETE  
        [HttpDelete("OwnerDelete/{id}/{fk_role_id}")]
        public async Task<IActionResult> Delete(long id,long fk_role_id)
        {
            if (fk_role_id == 1)
            {
                int a = await user.Delete(id);
                if (a > 0)
                {
                    return Ok("User Deleted");
                }
                else
                {
                    return NotFound("Failed to delete user");
                }
            }
            return Unauthorized("You are not allowed");
        }



        // GET: 
        [HttpGet]
        [Route("GetAllStores/{fk_role_id}")]
        public async Task<IActionResult> Get02(long fk_role_id)
        {
            if (fk_role_id == 1)
            {
                List<tbl_store> AllRows = await store.GetAllRows();
                foreach (tbl_store Row in AllRows)
                {
                    if (Row.store_logo != null)
                    {
                        Row.store_logo = Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + Row.store_logo);
                    }
                }


                if (AllRows != null)
                {
                    return Ok(AllRows);
                }
                return NotFound("No Record Found");
            }
            else
            {
                return Unauthorized("You are not allowed");
            }
        }


        // DELETE  
        [HttpDelete("StoreDelete/{store_id}/{fk_role_id}")]
        public async Task<IActionResult> Delete3(long store_id, long fk_role_id)
        {
            
            if (fk_role_id == 1)
            {
                await record.Store_DeleteRecord(store_id);
                await product.Store_DeleteProduct(store_id);
                await category.Store_DeleteCategory(store_id);
                await user.Store_DeleteUser(store_id);
                tbl_store? row = await store.GetRowById(store_id);
                string? old_image = row.store_logo;                           
                int a =  await store.Delete(store_id);
                if (a>0)
                {                    
                    if (row != null)
                    {
                        if (System.IO.File.Exists(Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + old_image)))
                        {
                            System.IO.File.Delete(Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + old_image));
                        }
                    }
                    return Ok("Store Deleted");
                }
                else
                {
                    return Ok("Store can't be Deleted");
                }

            }
            else
            {
                return Unauthorized("You are not allowed");
            }
        }

        // PUT 
        [HttpPut]
        [Route("StoreAlter/{store_id}/{fk_role_id}")]
        public async Task<IActionResult> Put11(long store_id, int fk_role_id,IFormFile file)
        {
            string? old_image_name;
            if (fk_role_id == 2)
            {
                tbl_store? row = await store.GetRowById(store_id);
                if (row != null)
                {
                    old_image_name = row.store_logo;
                    string msg = await OtherMethods.UploadFile(file);
                    if (msg == "Empty" || msg =="Error")
                    {
                        return BadRequest("Upload Failed");
                    }
                    else
                    {
                        row.store_logo = msg;
                        int a = await store.Update(row);
                        if (a>0)
                        {
                            if (System.IO.File.Exists(Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + old_image_name)))
                            {
                                System.IO.File.Delete(Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + old_image_name));
                            }


                            return Ok("Upload Successful");
                        }
                        else
                        {
                            return BadRequest("Upload Failed");
                        }
                    }

                }
                return NotFound("Row is not found");
            }
            else
            {
               return BadRequest("You are not allowed for this action");
            }
                  


        }

        // PUT 
        [HttpPut]
        [Route("StoreUpdate/{store_id}/{fk_role_id}")]
        public async Task<IActionResult> Put(long store_id, int fk_role_id, [FromBody] tbl_store s)
        {
            if (fk_role_id == 2)
            {
                tbl_store? row = await store.GetRowById(store_id);
                if (row != null)
                {
                    row.store_name = s.store_name;
                    row.store_description = s.store_description;
                 
                    return Ok(await store.Update(row));
                }
                return NotFound("Updation Failed");
            }
            else
            {
                return NotFound("You are not allowed for this");
            }
        }


    }
}







     