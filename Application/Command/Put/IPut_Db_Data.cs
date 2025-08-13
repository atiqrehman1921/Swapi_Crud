using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command.Put
{
    public interface IPut_Db_Data
    {
        Task<bool> UpdateStarshipAsync(int? id, string? name, Starship updatedStarship);
    }
}
