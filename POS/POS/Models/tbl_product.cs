using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace POS.Models
{
    public partial class tbl_product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_product()
        {
            
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long product_id { get; set; }
        [StringLength(200)]
        public string? product_name { get; set; }
        public int? product_price { get; set; }
        public int? product_available_quantity { get; set; }
        public DateTime? product_created_at { get; set; }
        [ForeignKey("tbl_category")]
        public long? fk_category_id { get; set; }
        public virtual tbl_category? tbl_category { get; set; } = null!;
        [ForeignKey("tbl_store")]
        public long? fk_store_id { get; set; }
        public virtual tbl_store? tbl_store { get; set; } = null!;

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tbl_record> tbl_record { get; set; }
    }
}
