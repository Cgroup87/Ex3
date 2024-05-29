$(document).ready(function () {
    let port = "7230";
    let api = `https://localhost:${port}/api/`;
    $("#load_courses_to_the_server").click(function () {
        AdminCoursesPostToServer(api);
    });
});

async function AdminCoursesPostToServer(api) {// Post Json To Server
    let AdminCourses = await $.getJSON("../DataFolder/Course.json");
    console.log(AdminCourses);
    let AdminCoursesEdited = [];

    for (let i = 0; i < AdminCourses.length; i++) {
        AdminCoursesEdited.push({
            id: AdminCourses[i].id, // corrected variable name
            title: AdminCourses[i].title, // corrected variable name
            name: AdminCourses[i].display_name, // corrected variable name
            image: AdminCourses[i].image_100x100, // corrected variable name
            jobTitle: AdminCourses[i].job_title, // corrected variable name
        });
    }

    for (let courses of AdminCoursesEdited) {
        await $.ajax({
            url: api, // corrected URL usage
            method: "POST",
            data: JSON.stringify(courses),
            contentType: "application/json",
            success: postAdminCoursesSCB,
            error: postAdminCoursesECB
        });
    }

    document.getElementById("postBtn").disabled = true;
    alert("The button will be enabled");
}

// Function to handle successful insertion of courses
function postAdminCoursesSCB(response) {
    console.log(response);
}

function postAdminCoursesECB(xhr, status, error) {
    console.log(error);
}



//////////////////////////////////////////////////////////////////////////////////////////////


// function getAdminCoursesFromServer(api)
// {/// Get courses List From Server
//     $.ajax({
//         url: api,
//         method: "GET",
//         success: getAdminCoursesSCB,
//         error: getAdminCoursesECB
//     });
// }

// function getAdminCoursesSCB(AdminCoursesList)
// {
//     console.log(AdminCoursesList);
//     displayAdminCourses(AdminCoursesList);
// }

// function getAdminCoursesECB(xhr, status, error) {
//     console.log(error);
// }

// function displayAdminCourses(AdminCoursesList) {// Render The List In The Page
//     const container = document.getElementById('AdminCourses-container');
//     container.innerHTML = ''; // Clear existing content
//     AdminCoursesList.forEach(courses =>
//     {
//         const coursesEl = document.createElement('div');
//         coursesEl.className = 'courses';
//         coursesEl.innerHTML = `
//          <div id="data_div"> <p class="data">ID: ${courses.id}</p>
//             <p class="data">Title: ${courses.title}</p>
//             <p class="data">Name: ${courses.name}</p>
//             <p class="data">Job Title: ${courses.jobTitle}</p></div>
//             <div id="image_div"><img id="image" src="${courses.image}" alt="courses Image"></div>
//         `;
//         container.appendChild(coursesEl);
//     });
// }