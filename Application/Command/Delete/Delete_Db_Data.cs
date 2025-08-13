using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading.Tasks;

namespace Application.Command.Delete
{
    public class Delete_Db_Data : IDelete_Db_Data
    {
        private readonly ApplicationDbContext _context;

        public Delete_Db_Data(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteStarshipAsync(int? id = null, string? name = null)
        {
            if (id == null && string.IsNullOrEmpty(name))
                return false;

            Starship? starship = null;

            if (id != null)
            {
                starship = await _context.Starships.FirstOrDefaultAsync(s => s.Id == id);
            }
            else if (!string.IsNullOrEmpty(name))
            {
                starship = await _context.Starships.FirstOrDefaultAsync(s => s.Name == name);
            }

            if (starship == null)
                return false;

            _context.Starships.Remove(starship);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
