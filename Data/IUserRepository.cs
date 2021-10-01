using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
    }
}
