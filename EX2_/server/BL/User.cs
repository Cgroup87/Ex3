using hw1.BL;
using System.Diagnostics.Metrics;

namespace server.BL
{
    public class User
    {
       private uint id;
        private string name;
        private string email;
        private string password;
        private bool isAdmin;
        private bool isActive;
        private   List<Course> myCourses;
        static List<User> usersList = new List<User>(); // Ensure it's public and static

        public uint Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public bool IsAdmin { get => isAdmin; set => isAdmin = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public List<Course> MyCourses { get => myCourses; set => myCourses = value; }

        public User()
        {
            myCourses = new List<Course>();
            if (usersList.Count == 0)
            {
                usersList.Add(new User(1, "admin", "admin@admin.com", "admin", true, true));
            }
        }

        public User(uint id, string name, string email, string password, bool isAdmin, bool isActive)
        {
            this.Id = id;
            this.Name = name;
            this.Email = email;
            this.Password = password;
            this.IsAdmin = isAdmin;
            this.IsActive = isActive;
            this.MyCourses = new List<Course>();
        }

        public List<User> Read()
        {
            return usersList;
        }

        public bool Registration()
        {
            foreach (User user in usersList)
            {
                if ( user.email == this.email || user.Id==this.Id)
                {
                    return false;
                }
            }
            usersList.Add(this);
            IsAdmin = false;
            isActive = false;
            return true;
        }
      public  int Login(User userLoginInput) /// method to check if the admin or the user or no one of them has login to his account
        {
            int ExistAccount = 0;// we declared an int variable to help us chouse one condition of the 3 conditions 
            foreach (User user in usersList)
            {
                if ("admin"== userLoginInput.password && "admin@admin.com" == userLoginInput.email)// if the user is the admin it will still 0
                {
                    id = user.id;
                    name = user.name;
                    isAdmin = user.IsAdmin;
                    isActive = user.isActive;
                    return ExistAccount;
                }

                if (user.password == userLoginInput.password && user.email == userLoginInput.email)// if it is a normal user it will be 1
                {
                    id = user.id;
                    name = user.name;
                    isAdmin = user.IsAdmin;
                    isActive = user.isActive;
                    return ExistAccount + 1;
                }
            }
            return ExistAccount +2;// else it will be 3
        }
  

        public static void UserLogout(string email, uint id)
        {
            var user = usersList.FirstOrDefault(user => user.Email.ToLower() == email.ToLower() || user.Id == id);
            if (user != null)
            {
                user.IsActive = false;
            }
        }
        public static User GetUserById(uint userId)
        {

            foreach (User user in usersList)
            {
                if (user.Id== userId)
                {
                    user.isActive = true;
                    return user;
                }
            }
            return null;
        }

        public bool AddCourse(Course addCourse)
        {
            foreach (Course course in myCourses)
            {
                if (course.Id == addCourse.Id || course.Title.ToLower() == addCourse.Title.ToLower())
                {
                    return false;
                }
            }
            myCourses.Add(addCourse);
            return true;
        }
    }
}



