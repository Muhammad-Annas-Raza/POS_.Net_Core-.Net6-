using POS.Models;
using POS.MyMethods;

namespace POS.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<int> Create(T obj);
        Task<List<T>> GetAllRows();        
        Task<T?> GetRowById(long id);
        Task<int> Update(T row);
        Task<int> Delete(long id);
        Task<int> SaveChanges();
        tbl_user? LoginCheck(tbl_user u);
        Task<int> VerifyEmail(long user_id,string code);
        Task<object> ProdCateinnerjoin(long fk_store_id);
        Task<List<tbl_user>> GetSpecificStoreUser(long fk_store_id);
        Task<List<tbl_user>> GetAllOwners();
        Task<List<tbl_user>> GetApprovedOwners();
        Task<List<tbl_category>> GetSpecificStoreCategory(long fk_store_id);
        Task<List<tbl_product>> GetSpecificStoreProduct(long fk_store_id);
        List<RecordList>? GetSpecificStoreDailyRecord(long fk_store_id);
        List<RecordList>? GetSpecificStoreMonthlyRecord(long fk_store_id);
        Task<int> DeleteRecord(string StartDate, long fk_store_id);
        Task<int> Store_DeleteRecord(long fk_store_id);
        Task<int> Store_DeleteProduct(long fk_store_id);
        Task<int> Store_DeleteCategory(long fk_store_id);
        Task<int> Store_DeleteUser(long fk_store_id);
 


    }
}
