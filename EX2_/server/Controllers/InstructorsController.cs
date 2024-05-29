using hw1.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace hw1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorsController : ControllerBase
    {
        // GET: api/<InstructorsController>
        [HttpGet]
        public IEnumerable<Instructor> Get()
        {
            return Instructor.Read();
        }

        // GET api/<InstructorsController>/5
        [HttpGet("{id}")]
        public Instructor Get(uint id)
        {
            return Instructor.GetInstructorById(id);
        }

        // POST api/<InstructorsController>
        [HttpPost]
        public bool Post([FromBody] Instructor instructor)
        {
            return instructor.Insert();
        }

        // PUT api/<InstructorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<InstructorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
