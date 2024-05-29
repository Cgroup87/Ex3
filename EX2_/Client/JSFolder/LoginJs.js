$(document).ready(function () {
    $("#LoginButton").submit(postLogin);
});

function validateRegistrationForm() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){4,}$/;

    // Validate if email and password are not empty
    if (email === "" || password === "") {
        alert("Please fill all fields.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid Email!!");
        return false;
    }

    return true;
}

function postLogin(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    if (validateRegistrationForm()) {
        let port = "7230";
        let api = `https://localhost:${port}/api/User/login`;

        const login = {
            Id: 0,
            Name: "0",
            Email: $('#email').val(),
            Password: $('#password').val(),
            IsAdmin: false,
            IsActive: true,
        };
        ajaxCall("POST", api, JSON.stringify(login), LoginSCB, LoginECB);
    }
}

function hideLoginAndRegisterButtons() {
    $("#goToLogin").hide();
    $("#goToRegister").hide();
}

function LoginSCB(response) {
    if (response.userId !== undefined) {
        alert("Login has been successful");

        // Save user info in localStorage
        const loggedInUser = {
            Id: response.userId,  // Assuming response contains the userId
            Name: response.name,
            IsAdmin: response.isAdmin,
            IsActive: response.isActive
        };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        if (response.isAdmin) {
            window.location.href = "AdminPage.html";
        } else {
            window.location.href = "index.html";
        }
        hideLoginAndRegisterButtons();
    } else if (response === 2) {
        alert("Account does not exist");
    }
}

function LoginECB(err) {
    console.log(err);
    alert("Error during login. Please try again.");
}