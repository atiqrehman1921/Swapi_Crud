using Domain.Models;

namespace Application.Services
{
    public interface IStarshipService
    {
        Task<List<Starship>> FetchStarshipsAsync();
    }
}
