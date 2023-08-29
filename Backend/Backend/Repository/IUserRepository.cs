﻿using Backend.Models.Customer;
using Microsoft.AspNetCore.Identity;

namespace Backend.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<IdentityUser>> GetAll();
        IdentityUser? GetByName(string user);
        void Delete(IdentityUser user);
        void Update(IdentityUser user);
    }
}