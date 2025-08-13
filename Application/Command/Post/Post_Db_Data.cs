using Domain.Models;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command.Post
{
    public class Post_Db_Data : IPost_Db_Data
    {
        private readonly ApplicationDbContext _context;

        public Post_Db_Data(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SeedStarshipDataAsync(Starship starship)
        {
            // You can add validation or checks here as needed
            await _context.Starships.AddAsync(starship);
            var saved = await _context.SaveChangesAsync();
            return saved > 0;
        }
    }
}
