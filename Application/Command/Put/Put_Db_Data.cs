using Domain.Models;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Application.Command.Put
{
    public class Put_Db_Data : IPut_Db_Data
    {
        private readonly ApplicationDbContext _context;

        public Put_Db_Data(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> UpdateStarshipAsync(int? id, string? name, Starship updatedStarship)
        {
            if (id == null && string.IsNullOrEmpty(name))
                return false;

            Starship? existingStarship = null;

            if (id != null)
            {
                existingStarship = await _context.Starships.FirstOrDefaultAsync(s => s.Id == id);
            }
            else if (!string.IsNullOrEmpty(name))
            {
                existingStarship = await _context.Starships.FirstOrDefaultAsync(s => s.Name == name);
            }

            if (existingStarship == null)
                return false; 
            existingStarship.Name = updatedStarship.Name;
            existingStarship.Model = updatedStarship.Model;
            existingStarship.Manufacturer = updatedStarship.Manufacturer;
            existingStarship.Cost_in_credits = updatedStarship.Cost_in_credits;
            existingStarship.Length = updatedStarship.Length;
            existingStarship.Max_atmosphering_speed = updatedStarship.Max_atmosphering_speed;
            existingStarship.Crew = updatedStarship.Crew;
            existingStarship.Passengers = updatedStarship.Passengers;
            existingStarship.Cargo_capacity = updatedStarship.Cargo_capacity;
            existingStarship.Consumables = updatedStarship.Consumables;
            existingStarship.Hyperdrive_rating = updatedStarship.Hyperdrive_rating;
            existingStarship.MGLT = updatedStarship.MGLT;
            existingStarship.Starship_class = updatedStarship.Starship_class;

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
