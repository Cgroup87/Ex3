$(document).ready(function(){
   $("#RegisterButton").click(postRegister);
});


function validateRegistrationForm()
{
    const userId = document.getElementById("userId").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

//password must contain 1 number (0-9)
// password must contain 1 uppercase letters
// password must contain 1 lowercase letters
// password must contain 1 non-alpha numeric number
// password is 8-16 characters with no space
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    // const passwordRegex=/{4,}$/;
    const idRegex = /^[0-9]\d{2}$/;

    // Validate if userId, fullName, email, password, and confirmPassword are not empty
    if (userId === "" || fullName === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return false;
    }

    if (!idRegex.test(userId)) {
        alert("Invalid User ID!!");
        alert("Please enter 9 numbers od your ID");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid Email!!");
        return false;
    }

   

    return false;
}


function postRegister(){
    if (validateRegistrationForm()) {
        let port = "7230";
        let api = `https://localhost:${port}/api/User/register`;
    
        const registration = {
            Id: $('#userId').val(),
            Name: $('#fullName').val(),
            Email: $('#email').val(),
            Password: $('#password').val(),
            IsAdmin: false,
            IsActive: true,
        };
        ajaxCall("POST", api, JSON.stringify(registration), RegistSCB, RegistECB);
    }
}

function RegistSCB(response) {
    if(response===false){
        alert("Acount is alredy existed");
    }
    else{
        alert("Your Register Successed");
    }
    // Redirect to home page after successful registration
    window.location.href = "LoginPage.html";
}

function RegistECB(err) {
    console.log(err);
    alert("Error");
}
