using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eHealthTotalAPI.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public string Phone { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
    }

    public class RegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address {get; set;}
        public string Phone {get; set;}
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}