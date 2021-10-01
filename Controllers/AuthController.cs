using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data;
using Todo.Dtos;
using Todo.Helpers;
using Todo.Models;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository,JwtService jwtService)
        {
            _repository = repository;
            this._jwtService = jwtService;
        }
        [HttpPost(template:"register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email, 
                Password = BCrypt.Net.BCrypt.HashPassword( dto.Password),
                ConfirmPassword = BCrypt.Net.BCrypt.HashPassword(dto.ConfirmPassword)


            };
           
            return Created("Success",_repository.Create(user));
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);
            if (user==null) 
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password,user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            var jwt = _jwtService.Generate(user.id);
            Response.Cookies.Append(jwt, jwt, new CookieOptions { HttpOnly = true }) ;
            return Ok(new { message="Success"});
        }
    }
}
