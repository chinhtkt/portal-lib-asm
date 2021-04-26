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
    public class CategoryController : ControllerBase
    {
        private readonly LibaryContext _context;

        public CategoryController(LibaryContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {

            return await _context.Categories.Include(c => c.Books).ToListAsync();
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategories(int id)
        {
            var book = await _context.Categories.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostCategories(Category categories)
        {
            _context.Categories.Add(categories);
            await _context.SaveChangesAsync();
 
            return CreatedAtAction("GetCategories", new { id = categories.CategoryId }, categories);
        }

        // PUT: api/Category
        [HttpPut("")]
        public async Task<IActionResult> PutCategories( Category categories)
        {
 
            _context.Entry(categories).State = EntityState.Modified;
 
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExist(categories.CategoryId))
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
        public async Task<ActionResult<Category>> DeleteCategories(int id)
        
        {
            var categories = await _context.Categories.FindAsync(id);
            if (categories == null)
            {
                return NotFound();
            }
 
            _context.Categories.Remove(categories);
            await _context.SaveChangesAsync();
 
            return categories;
        }

        private bool CategoryExist(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}