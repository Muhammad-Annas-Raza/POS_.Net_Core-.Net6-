using POS.Models;
namespace POS.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Index(nameof(store_name), IsUnique = true)]
    public partial class tbl_store
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_store()
        {
            tbl_category = new HashSet<tbl_category>();
            tbl_product = new HashSet<tbl_product>();
            tbl_record = new HashSet<tbl_record>();
            tbl_user = new HashSet<tbl_user>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long store_id { get; set; }
        [StringLength(200)]
        public string? store_name { get; set; }
        [Column(TypeName = "text")]
        public string? store_description { get; set; }
        public string? store_logo { get; set; }
        public DateTime? store_created_at { get; set; }
        [NotMapped]
        public IFormFile? store_img_file { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]                    
        public virtual ICollection<tbl_category> tbl_category { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_product> tbl_product { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_record> tbl_record { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_user> tbl_user { get; set; }
    }

 


}
