using Domain.Models;

namespace Application.Services
{
    public class StarshipFacade
    {
        private readonly IStarshipService _starshipApiClient;

        public StarshipFacade(IStarshipService starshipApiClient)
        {
            _starshipApiClient = starshipApiClient;
        }

        public async Task<List<Starship>> GetStarshipsAsync()
        {
            return await _starshipApiClient.FetchStarshipsAsync();
        }
    }
}
