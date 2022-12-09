using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace POS.Models
{
    public partial class db_POS : DbContext
    {
       
        public db_POS(DbContextOptions<db_POS> options)
            : base(options)
        {
        }

        public  DbSet<tbl_category> tbl_category { get; set; } = null!;
        public  DbSet<tbl_product> tbl_product { get; set; }  = null!;
        public  DbSet<tbl_record> tbl_record { get; set; } = null!;
        public  DbSet<tbl_role> tbl_role { get; set; } = null!;
        public  DbSet<tbl_store> tbl_store { get; set; }  = null!;
        public  DbSet<tbl_user> tbl_user { get; set; } = null!;

    }
}
