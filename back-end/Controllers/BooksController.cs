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
    public class BooksController : ControllerBase
    {
        private readonly LibaryContext _context;

        public BooksController(LibaryContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.Include(c => c.Category).ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBooks(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }
        [HttpPost]
        public async Task<ActionResult<Book>> PostBooks(Book books)
        {
            _context.Books.Add(books);
            await _context.SaveChangesAsync();
 
            return CreatedAtAction("GetBooks", new { id = books.BookId }, books);
        }

        // PUT: api/Books/5
        [HttpPut()]
        public async Task<IActionResult> PutBooks( Book books)
        {
 
            _context.Entry(books).State = EntityState.Modified;
 
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooksExist(books.BookId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
 
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBooks(int id)
        {
            var books = await _context.Books.FindAsync(id);
            if (books == null)
            {
                return NotFound();
            }
 
            _context.Books.Remove(books);
            await _context.SaveChangesAsync();
 
            return books;
        }

        private bool BooksExist(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}

       
