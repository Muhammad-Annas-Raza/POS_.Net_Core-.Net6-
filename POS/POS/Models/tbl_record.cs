namespace POS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;


    public partial class tbl_record
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long record_id { get; set; }
        public int? total_amount_per_slip { get; set; } 
        public DateTime? record_created_at { get; set; } 
        
        [ForeignKey("tbl_store")]
        public long? fk_store_id { get; set; }
        public virtual tbl_store? tbl_store { get; set; } = null!; 
    }
}
