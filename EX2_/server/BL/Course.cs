using server.BL;
using System.Collections.Generic;
using System.Runtime.ConstrainedExecution;


namespace hw1.BL
{
    public class Course
    {

        private uint id;
        private string title;
        private string url;
        private double rating;
        private uint num_reviews;
        private uint instructors_id;
        private string image;
        private double duration;
        private string last_update_date;
         static List<Course> coursesList = new List<Course>();

        public Course() { }

        public Course(uint id, string title, string url, double rating, uint numberOfReviews, uint instructorsId, string imageReference, double duration, string lastUpdate)
        {
            Id = id;
            Title = title;
            Url = url;
            Rating = rating;
            NumberOfReviews = numberOfReviews;
            InstructorsId = instructorsId;
            ImageReference = imageReference;
            Duration = duration;
            LastUpdate = lastUpdate;
        }

        public uint Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Url { get => url; set => url = value; }
        public double Rating { get => rating; set => rating = value; }
        public uint NumberOfReviews { get => num_reviews; set => num_reviews = value; }
        public uint InstructorsId { get => instructors_id; set => instructors_id = value; }
        public string ImageReference { get => image; set => image = value; }
        public double Duration { get => duration; set => duration = value; }
        public string LastUpdate { get => last_update_date; set => last_update_date = value; }

       
        public bool Insert()
        {
          
            foreach (Course item in coursesList)
            {
                if (item.id == this.id)
                {
                    return false;
                }
            }
            coursesList.Add(this);
            return true;
        }

        public static List<Course> Read()
        {
            return coursesList;
        }

        public static Course GetCourseById(uint id)
        {
            foreach (Course course in coursesList)
            {
                if (course.id == id)
                {
                    return course;
                }
            }
            return null;
        }

        public List<Course> GetByDurationRange(double min_duration, double max_duration)
        {
            List<Course> durationInRange = new List<Course>();
            foreach (Course course in coursesList)
            {
                if (min_duration <= course.duration && max_duration >= course.duration)
                {
                    durationInRange.Add(course);
                }
            }
            return durationInRange;
        }

        public List<Course> GetByRatingRange(double min_rating, double max_rating)
        {
            List<Course> ratingInRange = new List<Course>();
            foreach (Course course in coursesList)
            {
                if (min_rating <= course.Rating && max_rating >= course.Rating)
                {
                    ratingInRange.Add(course);
                }
            }
            return ratingInRange;
        }

        public void DeleteById(int id_delete)
        {
            for (int i = coursesList.Count - 1; i >= 0; i--)
            {
                if (coursesList[i].id == id_delete)
                {
                    coursesList.RemoveAt(i);
                    return;
                }
            }
            throw new ArgumentException("Not Found a course with such id");
        }

        public List<Course> EditCourse(Course course)
        {
            foreach (Course course_ in coursesList)
            {
                if (coursesList.Contains(course_)&&course_.id==course.id)
                {
                    DateTime dateTime = DateTime.Now;
                    course_.title = course.title;
                    course_.rating = course.rating;
                    course_.num_reviews = course.num_reviews;
                    course_.LastUpdate = dateTime.ToString("dd/MM/yyyy");
                    course_.duration = course.duration;
                    course_.image = course.image;

                }
            }
            return coursesList;
        }
    }


}