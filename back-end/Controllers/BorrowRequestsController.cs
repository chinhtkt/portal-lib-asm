using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Libary_asm.Models;
using Libary_asm;
using System.Linq;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowRequestsController : ControllerBase
    {
        private readonly LibaryContext _context;

        public BorrowRequestsController(LibaryContext context)
        {
            _context = context;
        }

        // GET: api/BorrowRequets
        //[Authorize(Roles = "Admin")]
        [HttpGet("/api/Borrowrequests")]
        public async Task<ActionResult<IEnumerable<BorrowRequest>>> GetBorrowRequests()
        {
            return await _context.BorrowRequests.Include(e => e.BorrowDetails).Include(c => c.User).ToListAsync();
        }

        // GET: api/BorrowRequests/5 
        [HttpGet("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<BorrowRequest>> GetBorrowRequests(int id)
        {
            var borrowrequest = await _context.BorrowRequests.FindAsync(id);

            if (borrowrequest == null)
            {
                return NotFound();
            }

            return borrowrequest;
        }

        [Authorize(Roles = "User, Admin")]
        [HttpPost]
        public async Task<ActionResult<BorrowRequest>> PostBorrowRequests(BorrowRequest borrowRequest)
        {
            if (_context.BorrowDetails.Count() > 5)
            {
                return BadRequest("Khong the lay tren 5 quyen");
            }

            _context.BorrowRequests.Add(borrowRequest);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBorrowRequests", new { id = borrowRequest.BorrowRequestId }, borrowRequest);

        }


        // PUT: api/BorrowRequests/5
        [Authorize(Roles = "Admin, User")]
        [HttpPut("{id}/approve")]
        public IActionResult ApproveBorrowRequest(int id)
        {
            

            var entity = _context.BorrowRequests.Find(id);
            // _context.Entry(id).State = EntityState.Modified;   

             if(entity != null)
             {
                 entity.Status = (Status)1;
                 _context.Update(entity);
                 return Ok(entity);
             }

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/reject")]
        public IActionResult RejectBorrowRequest(int id)
        {
            

            var entity = _context.BorrowRequests.Find(id);
            // _context.Entry(id).State = EntityState.Modified;   

             if(entity != null)
             {
                 entity.Status = (Status)2;
                 _context.Update(entity);
                 return Ok(entity);
             }


            // // try
            // // {
            // //     await _context.SaveChangesAsync();
            // // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!BorrowRequestsExist(id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }

            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<BorrowRequest>> DeleteBorrowRequests(int id)
        {
            var borrowrequests = await _context.BorrowRequests.FindAsync(id);
            if (borrowrequests == null)
            {
                return NotFound();
            }

            _context.BorrowRequests.Remove(borrowrequests);
            await _context.SaveChangesAsync();

            return borrowrequests;
        }

        private bool BorrowRequestsExist(int id)
        {
            return _context.BorrowRequests.Any(e => e.BorrowRequestId == id);
        }
    }
}

