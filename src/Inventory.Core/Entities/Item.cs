using Inventory.Core.SharedKernel;

namespace Inventory.Core.Entities
{
    public class Item : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public decimal? Value { get; set; }
    }
}