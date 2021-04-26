using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Libary_asm.Models
{
    public class BorrowRequest
    {
        public int BorrowRequestId { get; set; }

        public DateTime BorrowDate { get; set; }

        public Status Status { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<BorrowDetail> BorrowDetails { get; set; }
    }
}