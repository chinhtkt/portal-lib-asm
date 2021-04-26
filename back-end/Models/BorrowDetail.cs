using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Libary_asm.Models
{
    public class BorrowDetail
    {
        public int BorrowRequestId { get; set; }

        public int BookId { get; set; }

        public Book Book { get; set; }

        public BorrowRequest BorrowRequest { get; set; }
    }
}