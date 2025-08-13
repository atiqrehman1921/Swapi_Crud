using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command.Authentication
{
    public interface IAuthServices
    {
        Task<(bool Success, string Message, string Token)> LoginAsync(LoginModel model);
        Task<(bool Success, string Message)> SignupAsync(RegisterModel model);
        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}
