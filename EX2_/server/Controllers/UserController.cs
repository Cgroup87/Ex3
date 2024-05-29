using hw1.BL;
using Microsoft.AspNetCore.Mvc;
using server.BL;
using System.Collections.Generic;

namespace hw1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //// GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            User user = new User();
            
            return user.Read();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public int Get(uint id)
        {

            User user = server.BL.User.GetUserById(id);
            return user.Login(user);
        }

        // POST api/<UserController>
        [HttpPost("register")]
        public bool Post([FromBody] User value)
        {
            return value.Registration();
        }

        [HttpPost("login")]
        public int Post_Login([FromBody] User value)
        {
            return value.Login(value);
        }

        [HttpPost("addCourse")]
        public bool AddCourseToUser( [FromBody] Course course)
        {
           User user = new User();
            return user.AddCourse(course);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }

}