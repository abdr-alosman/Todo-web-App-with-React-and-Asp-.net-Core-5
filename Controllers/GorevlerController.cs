using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Models;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GorevlerController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public GorevlerController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Gorevler
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gorev>>> GetGorevs()
        {
            return await _context.Gorevs.ToListAsync();
        }

        // GET: api/Gorevler/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gorev>> GetGorev(int id)
        {
            var gorev = await _context.Gorevs.FindAsync(id);

            if (gorev == null)
            {
                return NotFound();
            }

            return gorev;
        }

        // PUT: api/Gorevler/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGorev(int id,[FromForm] Gorev gorev)
        {
            gorev.id=id;

            _context.Entry(gorev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GorevExists(id))
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

        // POST: api/Gorevler
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gorev>> PostGorev([FromForm]Gorev gorev)
        {
            _context.Gorevs.Add(gorev);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGorev", new { id = gorev.id }, gorev);
        }

        // DELETE: api/Gorevler/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGorev(int id)
        {
            var gorev = await _context.Gorevs.FindAsync(id);
            if (gorev == null)
            {
                return NotFound();
            }

            _context.Gorevs.Remove(gorev);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GorevExists(int id)
        {
            return _context.Gorevs.Any(e => e.id == id);
        }
    }
}
