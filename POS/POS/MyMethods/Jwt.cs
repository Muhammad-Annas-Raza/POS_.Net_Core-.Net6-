using Microsoft.IdentityModel.Tokens;
using POS.Models;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace POS.MyMethods
{
    public class Jwt     
    {
        private IConfiguration _config;
        public Jwt(IConfiguration config)
        {
            _config = config;

        }
        public string Generate(tbl_user user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {         
                new Claim(ClaimTypes.Name, user.user_name ?? "RandomName"),
                new Claim(JwtRegisteredClaimNames.Email, user.user_email_phone ?? "abc@gmail.com")                 
            };
           

            var token = new JwtSecurityToken(
              _config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims: claims,
              notBefore: DateTime.Now,
              expires: DateTime.Now.AddMinutes(60),
              signingCredentials: credentials
              );
             return new JwtSecurityTokenHandler().WriteToken(token);
    
        }
    }
}
