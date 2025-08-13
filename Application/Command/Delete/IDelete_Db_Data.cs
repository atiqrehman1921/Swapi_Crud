using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command.Delete
{
    public interface IDelete_Db_Data
    {
        Task<bool> DeleteStarshipAsync(int? id = null, string? name = null);
    }
}
