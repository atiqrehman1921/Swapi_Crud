using Domain.Models;
using System.Net.Http.Json;

namespace Application.Services
{
    public class StarshipService : IStarshipService
    {
        public async Task<List<Starship>> FetchStarshipsAsync()
        {
            var starships = new List<Starship>();
            string url = "https://swapi.py4e.com/api/starships/";

            using var httpClient = new HttpClient();

            while (!string.IsNullOrEmpty(url))
            {
                var response = await httpClient.GetFromJsonAsync<StarshipResponse>(url);
                if (response != null && response.Results != null)
                {
                    starships.AddRange(response.Results);
                    url = response.Next;
                }
                else
                {
                    break;
                }
            }

            return starships;
        }
    }
}
