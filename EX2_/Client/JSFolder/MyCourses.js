
$(document).ready(function ()
{
    $("#show_list").click(getJsonListFromServer);
    $("#submit_to_server_btn").click(SearchingByDuration);
    $("#submit_to_server_btn2").click(SearchingByRating);
});

function getJsonListFromServer() {// Get Json From Server
    const port = "7230";
    const url = `https://localhost:${port}/api/Courses`;
    ajaxCall("GET", url, "", getCoursesSCB, getCoursesECB);
}
function getCoursesSCB(courses) {
    console.log("List:", courses);
    renderList(courses);
}
function getCoursesECB(err) {
    console.error("Error fetching courses:", err);
}


function SearchingByDuration() {// Search By Duration
    const port = "7230";
    const url = `https://localhost:${port}/api/Courses/searchByDuration`;
    const s = {
        MaxDuration: $("#get_Max_duration").val(),
        MinDuration: $("#get_Min_duration").val(),
    };

    const finalUrl = `${url}?min_duration=${s.MinDuration}&max_duration=${s.MaxDuration}`;
    ajaxCall("GET", finalUrl, "", getByDurationSCB, getByDurationECB);
    console.log(s.MaxDuration);
}
function getByDurationSCB(courses) {
    console.log("hi");
    console.log(courses);
    renderList(courses);
}
function getByDurationECB(err) {
    alert("Error: Could not fetch courses based on duration");
    console.error("Error:", err);
}

function SearchingByRating() {// Search By Rating

    const port = "7230";
    let url = `https://localhost:${port}/api/Courses/`;
    const s = {
        MinRating: $("#get_Min_Rating").val(),
        MaxRating: $("#get_Max_Rating").val(),
    };
    url += `min_rating/${s.MinRating}/max_rating/${s.MaxRating}`;
    console.log(url);
    ajaxCall("GET", url, "", getRatingCoursesSCB, getRatingCoursesECB);
}
function getRatingCoursesSCB(courses) {
    renderList(courses);
}
function getRatingCoursesECB(err) {
    alert("Error: Could not fetch courses based on rating");
    console.error("Error:", err);
}



function deleteCourse(id) {// Delet Course
    const port = "7230";
    const api = `https://localhost:${port}/api/Courses/${id}`;
    ajaxCall("DELETE", api, "", deleteCourseSCB, deleteCourseECB);
}
function deleteCourseSCB(updatedCourses) {
    renderList(updatedCourses);
}
function deleteCourseECB(err) {
    alert("Error: Could not delete the course");
    console.error("Error:", err);
}

function renderList(list) {// Render List in the page
    const courseList = document.getElementById('courses-container');
    courseList.innerHTML = ''; // Clear the container before appending new elements
    for (let course of list) {
        const courseEl = document.createElement('div');
        courseEl.className = 'course';
        courseEl.innerHTML = `
            <div id="img_div">
                <img src="${course.imageReference}" alt="Course Image">
            </div>
            <h2>${course.title}</h2>
            <p>Rating: ${course.rating} (${course.numberOfReviews} reviews)</p>
            <p>Last updated: ${course.lastUpdate}</p>
            <p>Duration: ${course.duration}</p>
            <p>Instructor ID: ${course.instructorsId}</p>
            <p><a href="${course.url}" target="_blank">Course Link</a></p>
        `;
        courseList.appendChild(courseEl);
        const addButton = document.createElement('button');
        addButton.textContent = 'Delete Course';

        // Attach an event listener to the button
        addButton.addEventListener('click', function () {
            deleteCourse(course.id);
        });
        // Append the button to the last appended course item
        courseEl.appendChild(addButton);
    }
}


