using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Query
{
    public interface IGet_Db_Data
    {
        Task<List<Starship>> GetAllStarshipsAsync();
        Task<Starship?> GetStarshipByNameAsync(string name);
        Task<Starship?> GetStarshipByIdAsync(int id);
    }
}
