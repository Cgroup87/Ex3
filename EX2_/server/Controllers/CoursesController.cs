using hw1.BL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace hw1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        // GET: api/<InstructorsController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return Course.Read();
        }

        // GET api/<InstructorsController>/5
        [HttpGet("{id}")]
        public Course Get(uint id)
        {
            return Course.GetCourseById(id);
        }

        // POST api/<InstructorsController>
        [HttpPost]
        public bool Post([FromBody] Course course)
        {
            return course.Insert();
        }

        // PUT api/<InstructorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<InstructorsController>/5
        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Course>> Delete(int id)
        {
            Course course = new Course();
            try
            {
                course.DeleteById(id);
                return Ok(Course.Read());
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("searchByDuration")] // this uses the QueryString
        public IEnumerable<Course> GetByDurationRange(double min_duration, double max_duration)
        {
            Course course = new Course();
            return course.GetByDurationRange(min_duration, max_duration);
        }

        [HttpGet("min_rating/{min_rating}/max_rating/{max_rating}")] // this uses resource routing
        public IEnumerable<Course> GetByRatingRange(double min_rating, double max_rating)
        {
            Course course = new Course();
            return course.GetByRatingRange(min_rating, max_rating);
        }

        [HttpPut("EditCourse")] // this uses the QueryString
        public IEnumerable<Course> EditCourse(Course course)
        {
            Course course_ = new Course();
            return course_.EditCourse(course);
        }

    }
}