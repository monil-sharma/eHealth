using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eHealthTotalAPI.Models;

namespace eHealthTotalAPI.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> getAllUsers();

        int saveUser(User user);

        bool UserExists(string email);
    }
}