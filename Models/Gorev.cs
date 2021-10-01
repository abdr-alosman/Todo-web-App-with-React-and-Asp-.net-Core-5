using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class Gorev
    {
        [Key]
        public int id { get; set; }

        [StringLength(256, ErrorMessage = "The Task des.  cannot exceed 256 characters. ")]
        [Required]
        public string GorevTanimi { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        [Required] 
        public DateTime GorevTarihi { get; set; }
        public bool IsComplated { get; set; } 

    }
}
