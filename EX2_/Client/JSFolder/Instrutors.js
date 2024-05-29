$(document).ready(function () {
    let port = "7230";
    let api = `https://localhost:${port}/api/Instructors`;

    $("#getBTN").click(function ()
    {
        getInstructorsFromServer(api);
    });
    $("#postBtn").click(function () {
        instructorsPostToServer(api);
    });
});

async function instructorsPostToServer(api) {// Post Json To Server
    let instructors = await $.getJSON("../DataFolder/instructor.json");
    console.log(instructors);
    let instructorsEdited = [];

    for (let i = 0; i < instructors.length; i++) {
        instructorsEdited.push({
            id: instructors[i].id, // corrected variable name
            title: instructors[i].title, // corrected variable name
            name: instructors[i].display_name, // corrected variable name
            image: instructors[i].image_100x100, // corrected variable name
            jobTitle: instructors[i].job_title, // corrected variable name
        });
    }

    for (let instructor of instructorsEdited) {
        await $.ajax({
            url: api, // corrected URL usage
            method: "POST",
            data: JSON.stringify(instructor),
            contentType: "application/json",
            success: postInstructorsSCB,
            error: postInstructorsECB
        });
    }

    document.getElementById("postBtn").disabled = true;
    alert("The button will be enabled");
}

// Function to handle successful insertion of instructor
function postInstructorsSCB(response) {
    console.log(response);
}

function postInstructorsECB(xhr, status, error) {
    console.log(error);
}

function getInstructorsFromServer(api)
{/// Get Instructor List From Server
    $.ajax({
        url: api,
        method: "GET",
        success: getInstructorsSCB,
        error: getInstructorsECB
    });
}

function getInstructorsSCB(instructorsList)
{
    console.log(instructorsList);
    displayInstructors(instructorsList);
}

function getInstructorsECB(xhr, status, error) {
    console.log(error);
}

function displayInstructors(instructorsList) {// Render The List In The Page
    const container = document.getElementById('instructors-container');
    container.innerHTML = ''; // Clear existing content
    instructorsList.forEach(instructor =>
    {
        const instructorEl = document.createElement('div');
        instructorEl.className = 'instructor';
        instructorEl.innerHTML = `
         <div id="data_div"> <p class="data">ID: ${instructor.id}</p>
            <p class="data">Title: ${instructor.title}</p>
            <p class="data">Name: ${instructor.name}</p>
            <p class="data">Job Title: ${instructor.jobTitle}</p></div>
            <div id="image_div"><img id="image" src="${instructor.image}" alt="Instructor Image"></div>
        `;
        container.appendChild(instructorEl);
    });
}
