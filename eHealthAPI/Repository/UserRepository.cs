using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using eHealthTotalAPI.Models;

namespace eHealthTotalAPI.Repository
{

    
    public class UserRepository : IUserRepository
    {

        EHealthTotalContext dBContext;

        public UserRepository(EHealthTotalContext _context)
        {
            dBContext=_context;
        }
        

        public IEnumerable<User> getAllUsers()
        {
           return dBContext.Users.ToList();
        }

        public int saveUser(User user)
        {
            dBContext.Users.Add(user);
            
            return dBContext.SaveChanges();
        }

        

        

        public bool UserExists(string email)
        {
            return dBContext.Users.Any(u => u.Email == email); // Check if a user with the given email exists
        }
    }
}