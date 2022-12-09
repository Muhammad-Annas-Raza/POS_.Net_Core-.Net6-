namespace POS.Models
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Index(nameof(user_email_phone), IsUnique = true)]
 
    public partial class tbl_user
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_user()
        {
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? user_id { get; set; }
        [StringLength(200)]
        public string? user_name { get; set; }
        [StringLength(150)]
        public string? user_email_phone { get; set; }

        [StringLength(150)]
        public string? user_password { get; set; }
        [NotMapped]
        public string? user_confirm_password { get; set; }
        public DateTime? user_created_at { get; set; }
        public bool? user_approved { get; set; }
        public string? user_verification_code  { get; set; }
        public string? user_email_status { get; set; }
    
         

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
 
        [ForeignKey("tbl_role")]
        public long? fk_role_id { get; set; }
        public tbl_role? tbl_role { get; set; } 
        [ForeignKey("tbl_store")]
        public long? fk_store_id { get; set; }
        public tbl_store? tbl_store { get; set; } 
    }
}



 