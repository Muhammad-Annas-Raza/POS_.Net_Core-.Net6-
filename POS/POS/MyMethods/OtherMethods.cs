using POS.Interface;
using POS.Models;

namespace POS.MyMethods
{
    public class OtherMethods
    {
        private readonly IRepository<tbl_role> role;
        private readonly IWebHostEnvironment WebHostEnvironment;
        public OtherMethods(IRepository<tbl_role> role, IWebHostEnvironment webHostEnvironment)
        {
            this.role = role;
            WebHostEnvironment = webHostEnvironment;    
        }


        public async Task<string> AddRole()
        {
            int a;
            List<tbl_role> AllRows1 = await role.GetAllRows();
            if (AllRows1.Count == 0)
            {
                List<tbl_role> LstRole = new List<tbl_role>()
                {
                    new tbl_role() { role_id = 1 , role_name = "Super Admin"},
                    new tbl_role() { role_id = 2 , role_name = "Owner"      },
                    new tbl_role() { role_id = 3 , role_name = "User"       }
                };
                try
                {
                    foreach (tbl_role i in LstRole)
                    {
                        a = await role.Create(i);
                        if (a < 0)
                        {
                            return  "Somthing Went Wrong May be Role is not defined <Developer Error>";
                        }
                    }
                }
                catch (Exception)
                {
                    return  "Auto Inserted Role Error Occured";
                }
                return "Role Inserted";
            }
            else
            {
                return  "Rows Count is not zero";
            }
        }



        public async Task<string> UploadFile(IFormFile file)
        {
            try
            {
                if (file != null)
                {
                    string file_name = Path.GetFileNameWithoutExtension(file.FileName) + DateTime.Now.ToString("fffffff") + Path.GetExtension(file.FileName);

                    string path = Path.Combine("", WebHostEnvironment.ContentRootPath + @"POSGallery\" + file_name);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                        stream.Flush();
                    }
                    return file_name;
                }
                else
                {
                    return "Empty";
                }
            }
            catch (Exception)
            {

                return "Error";
            }
            
        }

    }
}
