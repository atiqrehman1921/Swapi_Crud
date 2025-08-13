using Application.Command.Delete;
using Application.Services;
using Application.StarshipServices;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Application.Command.Post;
using Application.Command.Put;
using Application.Query;
using Microsoft.AspNetCore.Identity;
using Application.Command.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Crud_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StarshipsController : ControllerBase
    {
        private readonly IStarshipService _starshipService;
        private readonly ApplicationDbContext _dbContext;
        private readonly IPost_StarShip_Data _StarshipService;
        private readonly IDelete_Db_Data _Delete_Db_Data;
        private readonly IPost_Db_Data _post_Db_Data;
        private readonly IPut_Db_Data _put_Db_Data;
        private readonly IGet_Db_Data Get_Db_Data;
        private readonly IAuthServices _authServices;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public StarshipsController(IStarshipService starshipService,
            ApplicationDbContext _dbContext, IPost_StarShip_Data postStarShipData,
            IDelete_Db_Data delete_Db_Data,IPost_Db_Data post_Db_Data,
            IPut_Db_Data _put_Db_Data,IGet_Db_Data get_Db_Data,
            UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,
            IAuthServices authServices)
        {
            _starshipService = starshipService;
            this._dbContext = _dbContext;
            _StarshipService = postStarShipData;
            _Delete_Db_Data = delete_Db_Data;
            _post_Db_Data = post_Db_Data;
            this._put_Db_Data = _put_Db_Data;
            this.Get_Db_Data = get_Db_Data;
            _userManager = userManager;
            _signInManager = signInManager;
            _authServices = authServices;
        }

        [HttpGet("GetData")]
        public async Task<IActionResult> GetData()
        {
            var starships = await _starshipService.FetchStarshipsAsync();
            return Ok(starships);
        }
        
        [HttpGet("GetAllStarshipsFromDb")]
        public async Task<ActionResult<List<Starship>>> GetAllStarshipsFromDb()
        {
            var starships = await Get_Db_Data.GetAllStarshipsAsync();
            return Ok(starships);
        }

        [HttpGet]
        public async Task<ActionResult<Starship>> GetStarship([FromQuery] int? id, [FromQuery] string? name)
        {
            if (id == null && string.IsNullOrEmpty(name))
                return BadRequest("Either 'id' or 'name' query parameter must be provided.");

            Starship? starship = null;

            if (id != null)
            {
                starship = await Get_Db_Data.GetStarshipByIdAsync(id.Value);
            }
            else if (!string.IsNullOrEmpty(name))
            {
                starship = await Get_Db_Data.GetStarshipByNameAsync(name);
            }

            if (starship == null)
                return NotFound("Starship not found.");

            return Ok(starship);
        }


        [HttpPost("PostDataSeeding")]
        public async Task<IActionResult> PostDataSeeding()
        {
            var starshipsFromApi = await _starshipService.FetchStarshipsAsync();

            var result = await _StarshipService.SeedStarshipDataAsync(starshipsFromApi);

            return Ok(result);
        }

        [HttpPost("PostDataToSql")]
        public async Task<IActionResult> PostDataToSql([FromBody] Starship starship)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _post_Db_Data.SeedStarshipDataAsync(starship);

            if (result)
                return Ok("Starship saved successfully.");
            else
                return StatusCode(500, "Error saving starship.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStarship([FromQuery] int? id, [FromQuery] string? name, [FromBody] Starship updatedStarship)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id == null && string.IsNullOrEmpty(name))
                return BadRequest("Either 'id' or 'name' query parameter must be provided.");

            var success = await _put_Db_Data.UpdateStarshipAsync(id, name, updatedStarship);

            if (!success)
                return NotFound("Starship not found.");

            return Ok("Starship updated successfully.");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteStarship(int? id, string? name)
        {
            var success = await _Delete_Db_Data.DeleteStarshipAsync(id, name);

            if (!success)
                return NotFound("Starship not found or no identifier provided.");

            return Ok("Starship deleted successfully.");
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Signup([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authServices.SignupAsync(model);

            return result.Success ? Ok(result.Message) : BadRequest(result.Message);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authServices.LoginAsync(model);

            return Ok(new
            {
                token = result.Token,
                message = result.Message
            });
        }



    }

}
