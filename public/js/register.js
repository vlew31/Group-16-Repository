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
        return /^[a-zA-Z\s]+$/.test(name) && name.length >= 1 && name.length <= 25;
    }
    
    function emailChecker(email) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function passwordChecker(password) {
        let passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
        return passwordTest.test(password);
    }