using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using POS.Interface;
using POS.Models;


using Microsoft.AspNetCore.Builder;
using System.Data;

namespace POS.MyMethods
{
    public class Repository<T> : IRepository<T> where T : class
    {

        int flag = 0;
        //1st make context class obj;
        private db_POS db_context;
        //2nd make IDbSet a Generic table DbSet<>
        private DbSet<T> table_name;
        private readonly IConfiguration _config;
        public Repository(db_POS db_context, IConfiguration config)
        //public Repository(db_POS db_context)

        {
            this.db_context = db_context;
            this.table_name = db_context.Set<T>();
            this._config = config;

        }

        public async Task<int> Create(T obj)
        {
            await table_name.AddAsync(obj);
            return await SaveChanges();
        }
        public async Task<int> Delete(long id)
        {
            T? row = await GetRowById(id);
            if (row != null)
            {
                db_context.Remove(row);
                return await SaveChanges();
            }
            else
            {
                return -1;
            }
        }
        public Task<List<T>> GetAllRows()
        {
            return table_name.ToListAsync();
        }
        public async Task<T?> GetRowById(long id)
        {
            return await table_name.FindAsync(id);
        }
        public tbl_user? LoginCheck(tbl_user u)
        {
            if (u.user_password != null)
            {
                return db_context.tbl_user.Where(m => m.user_name == u.user_name && m.user_password == u.user_password.Encrypt_password()).FirstOrDefault();
            }
            return null;

        }

        public Task<int> SaveChanges()
        {
            return db_context.SaveChangesAsync();
        }

        public async Task<int> Update(T row)
        {
            if (row != null)
            {
                table_name.Attach(row);
                db_context.Entry(row).State = EntityState.Modified;
                return await SaveChanges();
            }
            return -1;
        }

        public async Task<int> VerifyEmail(long user_id, string code)
        {

            tbl_user row = db_context.tbl_user.Single(x => x.user_id == user_id && x.user_verification_code == code);  // Getting the row
            if (row.user_email_status == "Verified")
            {
                return 1;
            }

            row.user_email_status = "Verified";  // Assign the new value
            try
            {
                int a = await db_context.SaveChangesAsync();
                return a;
            }
            catch (Exception)
            {
                return -1;
            }


        }

        public async Task<object> ProdCateinnerjoin(long fk_store_id)
        {
            return await (from product in db_context.tbl_product
                          join category in db_context.tbl_category
                          on product.fk_category_id equals category.category_id
                          where product.fk_store_id == fk_store_id && category.fk_store_id == fk_store_id
                          select new
                          {
                              product_id = product.product_id,
                              product_name = product.product_name,
                              product_price = product.product_price,
                              product_created_at = product.product_created_at,
                              product_available_quantity = product.product_available_quantity,
                              category_name = category.category_name
                          }).ToListAsync();
        }

        public async Task<List<tbl_user>> GetSpecificStoreUser(long fk_store_id)
        {
            return await db_context.tbl_user.Where(m => m.fk_store_id == fk_store_id && m.fk_role_id == 3).ToListAsync();
        }

        public async Task<List<tbl_category>> GetSpecificStoreCategory(long fk_store_id)
        {
            return await db_context.tbl_category.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
        }
        public async Task<List<tbl_product>> GetSpecificStoreProduct(long fk_store_id)
        {
            return await db_context.tbl_product.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
        }
        public List<RecordList>? GetSpecificStoreDailyRecord(long fk_store_id)
        {

            string cs = _config.GetConnectionString("cs_POS");            
            SqlConnection con;
            using (con = new SqlConnection(cs))
            {
                try
                {
                    List<RecordList> lst = new List<RecordList>();
                    SqlDataAdapter cmd = new SqlDataAdapter("SELECT DAY(record_created_at) AS Day, MONTH(record_created_at) As Month,Year(record_created_at) As Year, SUM(total_amount_per_slip) AS Daily_sale FROM tbl_record Where fk_store_id = '" + fk_store_id + "' GROUP BY Day(record_created_at),Month(record_created_at),Year(record_created_at)  Order by YEAR(record_created_at), MONTH(record_created_at), DAY(record_created_at) ", con);
                    DataTable dt = new DataTable();
                    cmd.Fill(dt);
                    foreach (DataRow row in dt.Rows)
                    {

                        lst.Add(new RecordList() { Day = row[0].ToString(), Month = row[1].ToString(), Year = row[2].ToString(), Daily_sale = row[3].ToString() });
                    }
                    return lst;
                }
                catch (Exception)
                {

                    return null;
                }
            }
        }  
        public List<RecordList>? GetSpecificStoreMonthlyRecord(long fk_store_id)
        {
            string cs = _config.GetConnectionString("cs_POS");            
            SqlConnection con;
            using (con = new SqlConnection(cs))
            {
                try
                {
                    List<RecordList> lst = new List<RecordList>();
                    SqlDataAdapter cmd = new SqlDataAdapter("SELECT MONTH(record_created_at) As Month,Year(record_created_at) As Year, SUM(total_amount_per_slip) AS Monthly_sale FROM tbl_record Where fk_store_id = '"+fk_store_id+"' GROUP BY Month(record_created_at),Year(record_created_at)  Order by YEAR(record_created_at),  MONTH(record_created_at) ", con);
                    DataTable dt = new DataTable();
                    cmd.Fill(dt);
                    foreach (DataRow row in dt.Rows)
                    {

                        lst.Add(new RecordList() {  Month = row[0].ToString(), Year = row[1].ToString(), Monthly_sale = row[2].ToString() });
                    }
                    return lst;
                }
                catch (Exception)
                {

                    return null;
                }
            }
        }

        public async Task<int> DeleteRecord(string StartDate,long fk_store_id)
        {
           
            List <tbl_record> lst = db_context.tbl_record.Where(m => m.record_created_at.ToString().StartsWith(StartDate) && m.fk_store_id == fk_store_id).ToList();
            foreach (tbl_record i in lst)
            {
                db_context.Entry(i).State = EntityState.Deleted;
                int a = await db_context.SaveChangesAsync();
                if (a <= 0)
                {
                    return -1;
                }
                else
                {
                    flag = 1;
                }
            }
            return flag == 1?1:0;
        }

        public async Task<List<tbl_user>> GetAllOwners()
        {
            return await db_context.tbl_user.Where(m => m.fk_role_id == 2 && m.user_approved == false).ToListAsync();
        }
        
        public async Task<List<tbl_user>> GetApprovedOwners()
        {
            return await db_context.tbl_user.Where(m => m.fk_role_id == 2 && m.user_approved == true).ToListAsync();
        }


        public async Task<int> Store_DeleteRecord(long fk_store_id) 
        {

            List<tbl_record>? rows = await db_context.tbl_record.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
            if (rows != null)
            {
                foreach (tbl_record i in rows)
                {
                    flag = 0;
                    db_context.Entry(i).State = EntityState.Deleted;
                    flag =  await db_context.SaveChangesAsync();
                    
                }
                return flag;                   
            }
            else
            {
                return -1;
            }


        }
        public async Task<int> Store_DeleteProduct(long fk_store_id)
        {

            List<tbl_product>? rows = await db_context.tbl_product.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
            if (rows != null)
            {
                foreach (tbl_product i in rows)
                {
                    flag = 0;
                    db_context.Entry(i).State = EntityState.Deleted;
                    flag = await db_context.SaveChangesAsync();

                }
                return flag;
            }
            else
            {
                return -1;
            }


        }
        public async Task<int> Store_DeleteCategory(long fk_store_id)
        {


            List<tbl_category>? rows = await db_context.tbl_category.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
            if (rows != null)
            {
                foreach (tbl_category i in rows)
                {
                    flag = 0;
                    db_context.Entry(i).State = EntityState.Deleted;
                    flag = await db_context.SaveChangesAsync();

                }
                return flag;
            }
            else
            {
                return -1;
            }

        }
        public async Task<int> Store_DeleteUser(long fk_store_id)
        {
            List<tbl_user>? rows = await db_context.tbl_user.Where(m => m.fk_store_id == fk_store_id).ToListAsync();
            if (rows != null)
            {
                foreach (tbl_user i in rows)
                {
                    flag = 0;
                    db_context.Entry(i).State = EntityState.Deleted;
                    flag = await db_context.SaveChangesAsync();

                }
                return flag;
            }
            else
            {
                return -1;
            }
        }
  











    }
}
   
 
