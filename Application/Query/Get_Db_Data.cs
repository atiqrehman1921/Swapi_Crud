using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Query
{
    public class Get_Db_Data : IGet_Db_Data
    {
        private readonly ApplicationDbContext _context;

        public Get_Db_Data(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Starship>> GetAllStarshipsAsync()
        {
            return await _context.Starships
                .OrderByDescending(s => s.Id)
                .ToListAsync();
        }

        public async Task<Starship?> GetStarshipByNameAsync(string name)
        {
            return await _context.Starships
                .FirstOrDefaultAsync(s => s.Name == name);
        }

        public async Task<Starship?> GetStarshipByIdAsync(int id)
        {
            return await _context.Starships
                .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}
