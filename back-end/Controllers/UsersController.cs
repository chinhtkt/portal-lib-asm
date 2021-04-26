using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Libary_asm.Models;
using Libary_asm;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LibaryContext _context;

        public UsersController(LibaryContext context)
        {
            _context = context;
        }


        [HttpPost("login")]
        public async System.Threading.Tasks.Task<ActionResult> LoginAsync(User user)
        {
            var databaseUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

            if (databaseUser != null)
            {
                return Ok(databaseUser);
            }
            return BadRequest("Ten dang nhap hoac mat khau khong chinh xac!");
        }



        [HttpGet]
        public async System.Threading.Tasks.Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(e => e.BorrowRequests).ToListAsync();
        }

         [HttpGet("admin")]
        public async System.Threading.Tasks.Task<ActionResult<IEnumerable<User>>> GetAdmins()
        {
            return await _context.Users.Include(e => e.BorrowRequests).Where(a => a.Role == Role.Admin).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async System.Threading.Tasks.Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async System.Threading.Tasks.Task<ActionResult<User>> PostUser(User user)
        {
            if (!UserExists(user.UserId))
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.UserId }, user);
            }
            else
            {
                return UnprocessableEntity();
            }
        }

        //PUT
        [HttpPut("{id}")]
        public async System.Threading.Tasks.Task<IActionResult> PutUsers(int id, User users)
        {
            if (id != users.UserId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        public async System.Threading.Tasks.Task<ActionResult<User>> DeleteUser(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}