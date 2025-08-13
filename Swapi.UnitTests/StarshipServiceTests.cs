using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Application.Services;
using Application.StarshipServices;
using Application.Command.Post;
using Application.Command.Put;
using Application.Command.Delete;
using Application.Query;
using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Swapi.UnitTests
{
    [TestClass]
    public class StarshipServiceTests
    {
        private Mock<IStarshipService> _mockStarshipService;
        private Mock<IPost_StarShip_Data> _mockPostStarshipService;
        private Mock<IDelete_Db_Data> _mockDeleteDbData;
        private Mock<IPost_Db_Data> _mockPostDbData;
        private Mock<IPut_Db_Data> _mockPutDbData;
        private Mock<IGet_Db_Data> _mockGetDbData;

        [TestInitialize]
        public void Setup()
        {
            _mockStarshipService = new Mock<IStarshipService>();
            _mockPostStarshipService = new Mock<IPost_StarShip_Data>();
            _mockDeleteDbData = new Mock<IDelete_Db_Data>();
            _mockPostDbData = new Mock<IPost_Db_Data>();
            _mockPutDbData = new Mock<IPut_Db_Data>();
            _mockGetDbData = new Mock<IGet_Db_Data>();
        }

        [TestMethod]
        public async Task FetchStarshipsAsync_ReturnsStarshipList()
        {
            var expected = new List<Starship> { new Starship { Name = "X-Wing" } };
            _mockStarshipService.Setup(s => s.FetchStarshipsAsync()).ReturnsAsync(expected);

            var result = await _mockStarshipService.Object.FetchStarshipsAsync();

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
            Assert.AreEqual("X-Wing", result[0].Name);
        }

        [TestMethod]
        public async Task SeedStarshipDataAsync_ReturnsString()
        {
            var starships = new List<Starship> { new Starship { Name = "Millennium Falcon" } };

            _mockPostStarshipService
                .Setup(s => s.SeedStarshipDataAsync(starships))
                .ReturnsAsync("1 new starship(s) inserted.");

            var result = await _mockPostStarshipService.Object.SeedStarshipDataAsync(starships);
            Assert.AreEqual("1 new starship(s) inserted.", result);
        }


        [TestMethod]
        public async Task PostStarshipToDb_ReturnsTrue()
        {
            var starship = new Starship { Name = "TIE Fighter" };
            _mockPostDbData.Setup(s => s.SeedStarshipDataAsync(starship)).ReturnsAsync(true);

            var result = await _mockPostDbData.Object.SeedStarshipDataAsync(starship);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task UpdateStarshipAsync_ReturnsTrue()
        {
            var updatedStarship = new Starship { Name = "Star Destroyer" };
            _mockPutDbData.Setup(s => s.UpdateStarshipAsync(1, null, updatedStarship)).ReturnsAsync(true);

            var result = await _mockPutDbData.Object.UpdateStarshipAsync(1, null, updatedStarship);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task DeleteStarshipAsync_ReturnsTrue()
        {
            _mockDeleteDbData.Setup(s => s.DeleteStarshipAsync(1, null)).ReturnsAsync(true);

            var result = await _mockDeleteDbData.Object.DeleteStarshipAsync(1, null);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task GetAllStarshipsAsync_ReturnsStarshipList()
        {
            var expected = new List<Starship> { new Starship { Name = "Y-Wing" } };
            _mockGetDbData.Setup(s => s.GetAllStarshipsAsync()).ReturnsAsync(expected);

            var result = await _mockGetDbData.Object.GetAllStarshipsAsync();

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
            Assert.AreEqual("Y-Wing", result[0].Name);
        }

        [TestMethod]
        public async Task GetStarshipByIdAsync_ReturnsStarship()
        {
            var starship = new Starship { Name = "A-Wing" };
            _mockGetDbData.Setup(s => s.GetStarshipByIdAsync(1)).ReturnsAsync(starship);

            var result = await _mockGetDbData.Object.GetStarshipByIdAsync(1);

            Assert.IsNotNull(result);
            Assert.AreEqual("A-Wing", result.Name);
        }

        [TestMethod]
        public async Task GetStarshipByNameAsync_ReturnsStarship()
        {
            var starship = new Starship { Name = "B-Wing" };
            _mockGetDbData.Setup(s => s.GetStarshipByNameAsync("B-Wing")).ReturnsAsync(starship);

            var result = await _mockGetDbData.Object.GetStarshipByNameAsync("B-Wing");

            Assert.IsNotNull(result);
            Assert.AreEqual("B-Wing", result.Name);
        }
    }
}
