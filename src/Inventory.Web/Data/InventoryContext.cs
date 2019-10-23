using Inventory.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Web.Data
{
    public class InventoryContext : DbContext
    {
        public DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=inventory.db");
    }
}