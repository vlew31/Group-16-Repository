// if (document.getElementById('registration-form')) {
//     let registrationForm = document.getElementById('registration-form');
// registrationForm.addEventListener('submit', (event) => {

document.addEventListener('DOMContentLoaded', function () {
    let register = document.getElementById('registration-form');
    if (register) {
        register.addEventListener('submit', (event) => {
            if (!checkRegister()) {
                event.preventDefault();
            }
        });
    }
    });

    function  checkRegister() {
        let first = document.getElementById('firstName').value;
        let last = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let role = document.getElementById('role').value;

        if (!nameChecker(first)) {
            alert('Invalid first name.');
            return false;
        }
    
        if (!nameChecker(last)) {
            alert('Invalid last name.');
            return false;
        }
    
        if (!emailChecker(email)) {
            alert('Invalid email address format.');
            return false;
        }

        if (!nameChecker(username)) {
            alert('Invalid last name.');
            return false;
        }
    
        if (!passwordChecker(password)) {
            alert('Invalid password format.');
            return false;
        }
    
        if (password !== confirmPassword) {
            alert('Password and Confirm Password must match.');
            return false;
        }
    
        if (role.trim()==="") {
            alert('Choose a role.');
            return false
        }
    
        return true;
    }
    
    function nameChecker(name) {
        if(!name || typeof name !== 'string' || name.length < 2 || !letterChecker.test(name)) {
            return "Invalid name input";
          }
    }
    
    function emailChecker(email) {
        let emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
        if(!email || !emailTest.test(email)) {
            return "invalid email input";
        }
    }
    
    function passwordChecker(password) {
        let upper = /[A-Z]/;
        let number = /[0-9]/;
        let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if(!password || typeof password !== 'string' || password.length > 7 || !upper.test(password) || !number.test(password) || !specialChar.test(password)) {
        return "invalid password input";
        }
    }