
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class StarshipResponse
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Count must be zero or a positive integer.")]
        public int Count { get; set; }

        [Url(ErrorMessage = "Next must be a valid URL.")]
        public string? Next { get; set; }

        [Url(ErrorMessage = "Previous must be a valid URL.")]
        public string? Previous { get; set; }

        [JsonPropertyName("results")]
        public List<Starship> Results { get; set; }
    }
}
