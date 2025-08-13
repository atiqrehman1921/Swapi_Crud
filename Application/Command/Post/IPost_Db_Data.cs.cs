using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command.Post
{
    public interface IPost_Db_Data
    {
        Task<bool> SeedStarshipDataAsync(Starship starship);
    }
}
