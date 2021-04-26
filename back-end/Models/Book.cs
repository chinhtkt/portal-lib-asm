using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Libary_asm.Models
{
    public class Book
    {
        public int BookId { get; set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<BorrowDetail> BorrowDetails { get; set; }
    }
}
