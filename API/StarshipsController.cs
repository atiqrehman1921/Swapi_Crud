using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public class StarshipsController : ControllerBase
    {
        private readonly IStarshipService _starshipService;

        public StarshipsController(IStarshipService starshipService)
        {
            _starshipService = starshipService;
        }

        [HttpGet("GetData")]
        public async Task<IActionResult> GetData()
        {
            var starships = await _starshipService.FetchStarshipsAsync();
            return Ok(starships);
        }
    }

}
