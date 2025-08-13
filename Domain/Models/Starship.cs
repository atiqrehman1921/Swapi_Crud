using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Starship
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(150, ErrorMessage = "Model cannot exceed 150 characters.")]
        public string Model { get; set; }

        [Required]
        [StringLength(150, ErrorMessage = "Manufacturer cannot exceed 150 characters.")]
        public string Manufacturer { get; set; }

        public string Cost_in_credits { get; set; }
        public string Length { get; set; }
        public string Max_atmosphering_speed { get; set; }
        public string Crew { get; set; }
        public string Passengers { get; set; }
        public string Cargo_capacity { get; set; }
        public string Consumables { get; set; }
        public string Hyperdrive_rating { get; set; }
        public string MGLT { get; set; }
        public string Starship_class { get; set; }

        public int? StarshipResponseId { get; set; }
    }
}
