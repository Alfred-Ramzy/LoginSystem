let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let incorrect = document.getElementById("incorrect");
let incorrectSignup = document.getElementById("incorrectSignup");
let newName = document.getElementById("newName");
let newEmail = document.getElementById("newEmail");
let newPassword = document.getElementById("newPassword");
let signUpBtn = document.querySelector(".signUpBtn");
let loginBtn = document.querySelector(".login-btn");
let userName = document.getElementById("username");
let logoutBtn = document.querySelector(".logout-btn");
let newusersList = [];

function signUp() {
  newusersList = JSON.parse(localStorage.getItem("user")) || [];
  let isDuplicate = newusersList.some((user) => user.uEmail === newEmail.value);
  if (isDuplicate) {
    incorrectSignup.innerHTML = "This Email already exists";
    return false;
  }
  if (
    validation(newEmail) ||
    validation(newPassword) ||
    validation(newName) ||
    isSignupEmpty()
  ) {
    let userObj = {
      uName: newName.value,
      uEmail: newEmail.value,
      uPassword: newPassword.value,
    };
    newusersList.push(userObj);
    localStorage.setItem("user", JSON.stringify(newusersList));
    return true;
  } else {
    incorrectSignup.innerHTML = "All inputs are required";
    return false;
  }
}
function isSignupEmpty() {
  if (newEmail.value == "" || newPassword.value == "" || newName.value == "") {
    return false;
  } else {
    return true;
  }
}
function goToLoginPage() {
  if (signUp()) {
    window.location.replace("login.html");
  }
}
function isLoginEmpty() {
  if (userEmail.value == "" || userPassword.value == "") {
    return false;
  } else {
    return true;
  }
}
function validation(input) {
  let regex = {
    newName: /^[a-zA-z_]+$/,
    newEmail: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
    newPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };
  if (regex[input.id].test(input.value)) {
    input.nextElementSibling.classList.replace("d-block", "d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.nextElementSibling.classList.replace("d-none", "d-block");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}
function login() {
  newusersList = JSON.parse(localStorage.getItem("user"));
  let userByEmail = newusersList.find(
    (user) => user.uEmail === userEmail.value
  );
  if (!isLoginEmpty()) {
    incorrect.innerHTML = "All inputs are required";
    return;
  }
  if (userByEmail) {
    if (userByEmail.uPassword === userPassword.value) {
      localStorage.setItem("loggedInUser", JSON.stringify(userByEmail));
      window.location.replace("home.html");
    } else {
      incorrect.innerHTML = "Incorrect password. Please try again.";
    }
  } else {
    incorrect.innerHTML = "Email not found. Please sign up first.";
  }
}

function logOut() {
  localStorage.removeItem("loggedInUser");
  window.location.replace("login.html");
}
document.addEventListener("DOMContentLoaded", function () {
  if (signUpBtn) {
    signUpBtn.addEventListener("click", goToLoginPage);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logOut);
  }
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (userName && loggedInUser) {
    userName.innerHTML = `Welcome ${loggedInUser.uName}`;
  }
});
