

$(document).ready(function ()
{ // בדיקה אם המשתמש מחובר כאשר הדף נטען
    checkUserLoginStatus();
    function checkUserLoginStatus()
    {
        const port = "7230";
        const api = `https://localhost:${port}/api/User/5`;
        ajaxCall("Get", api, "", checkUserLoginSuccess, checkUserLoginError);
    }
    function checkUserLoginSuccess(response)
    {
        // אם המשתמש מחובר, הסתר את כפתורי התחברות והרשמה
        if (typeof response === 'number' && (response === 1 || response === 2)) {
            hideLoginAndRegisterButtons();
        }
    }
    function checkUserLoginError( error)
    {
        console.error("Error checking user login status:", error);
    }
    // Fetch JSON data using AJAX
    $.getJSON("../DataFolder/Course.json", function (data) {
        const courseList = $('#courses-container');

        // Iterate over the JSON data and create HTML for each course
        data.forEach(Course => {
            // Modify course duration and URL
            Course.duration = Course.duration.match(/[\d.]+/)[0];
            Course.url = "https://www.udemy.com" + Course.url;

            // Define courseItem HTML
            const courseItem = `
                <div class="course">
                  <div class="image_course">  <img src="${Course.image}" alt="${Course.title}"> </div>
                  <div class="title_course">  <h2 class="course-title"><a href="${Course.url}" target="_blank">${Course.title}</a></h2> </div>
                    <div class="course-details">
                            <p>Rating: ${Course.rating}</p>
                            <p>Reviews: ${Course.num_reviews}</p>
                            <p>Last Updated: ${Course.last_update_date}</p>
                            <p>Duration: ${Course.duration}</p>
                    </div>
                </div>
            `;

            // Append courseItem to courseList
            courseList.append(courseItem);

            // Create the "Add Course" button
            const addButton = document.createElement('button');
            addButton.textContent = 'Add Course';

            // Attach an event listener to the button
            addButton.addEventListener('click', function () {
                addCourse(Course);
            });

            // Append the button to the last appended course item
            const lastCourse = courseList.children().last();
            lastCourse.append(addButton);
        });
    });

    function isUserLoggedIn() {
         const user = JSON.parse(localStorage.getItem("loggedInUser"));
        //let user = localStorage.getItem("loggedInUser");
        return user && user.IsActive;
    }

    // Function to handle adding a course
    function addCourse(course) {
        console.log(isUserLoggedIn());
        if (!isUserLoggedIn()) {
            alert("Please log in or register to add a course.");
        }
        else{
            const user = JSON.parse(localStorage.getItem("loggedInUser"));
            const list = {
                Id: course.id,
                Title: course.title,
                Url: course.url,
                Rating: course.rating,
                NumberOfReviews: course.num_reviews,
                InstructorsId: course.instructors_id,
                ImageReference: course.image,
                Duration: course.duration,
                LastUpdate: course.last_update_date
            };
        console.log(user);
        console.log(user.Email);

        const port = "7230";
        const api = `https://localhost:${port}/api/User/addCourse`;
         ajaxCall("POST", api, JSON.stringify(list), postCoursesSCB, postCoursesECB);
      }
    }

    // Success callback for POST
    function postCoursesSCB(status) {
        console.log("list:", status);

         if (status === true) {
            alert("Added successfully");
        } else {
            alert("Can't add twice");
        }
    }

    function postCoursesECB(err) {
        console.error("Error:", err);
        alert("Failed to add this Course. Please make sure it doesn't already exist.");
    }
});
