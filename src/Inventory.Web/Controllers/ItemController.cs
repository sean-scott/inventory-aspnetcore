using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inventory.Core.Entities;
using Inventory.Web.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Inventory.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly InventoryContext _context;

        public ItemController(InventoryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }
    }
}