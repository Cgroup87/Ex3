
namespace hw1.BL
{
    public class Instructor
    {
        private  uint id;
        private string title;
        private string name;
        private string image;
        private string job_title;
        static List<Instructor> instructorsList = new List<Instructor>();

        public Instructor() 
        { 

        }

        public Instructor(uint id, string title, string name, string image, string jobTitle)
        {
            Id = id;
            Title = title;
            Name = name;
            Image = image;
            JobTitle = jobTitle;
            instructorsList.Add(this);
        }

        public uint Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public string JobTitle { get => job_title; set => job_title = value; }

        public bool Insert()
        {
            foreach (Instructor item in instructorsList)
            {
                if (item.id == this.id)
                {
                    return false;
                }
            }
            instructorsList.Add(this);
            return true;
        }

        public static List<Instructor> Read()
        {
            return instructorsList;
        }

        public static Instructor GetInstructorById(uint id)
        {
            foreach (Instructor instructor in instructorsList)
            {
                if (instructor.id.Equals(id))
                {
                    return instructor;
                }
            }
            return null;
        }
    }
}
