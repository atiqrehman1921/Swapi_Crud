using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Persistence;

namespace Application.StarshipServices
{
    public class Post_StarShip_Data : IPost_StarShip_Data
    {
        private readonly ApplicationDbContext _dbContext;

        public Post_StarShip_Data(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> SeedStarshipDataAsync(List<Starship> starshipsFromApi)
        {
            var existingStarshipNames = _dbContext.Starships.Select(s => s.Name).ToList();

            var newStarships = starshipsFromApi
                .Where(s => !existingStarshipNames.Contains(s.Name))
                .ToList();

            if (!newStarships.Any())
            {
                return "Data is up to date.";
            }

            await _dbContext.Starships.AddRangeAsync(newStarships);
            var insertedCount = await _dbContext.SaveChangesAsync();

            return $"{insertedCount} new starship(s) inserted.";
        }

    }
}
