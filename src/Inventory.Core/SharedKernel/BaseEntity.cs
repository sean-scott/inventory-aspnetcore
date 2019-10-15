using System;

namespace Inventory.Core.SharedKernel
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
    }
}