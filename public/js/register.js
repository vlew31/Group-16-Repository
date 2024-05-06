// if (document.getElementById('registration-form')) {
//     const registrationForm = document.getElementById('registration-form');
// registrationForm.addEventListener('submit', (event) => {

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registration-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            if (!checkRegister()) {
                event.preventDefault();
            }
        });
    }
    });

    function checkRegister() {
        function checkRegister() {
            let firstName = document.getElementById("firstName").value;
            if (firstName === undefined) {
                throw "first name input is undefined";
            }
            if (typeof firstName !== 'string') {
                throw "first name must be a string";
            }
            let trimmedFirstName = firstName.trim();
            const nameChecker = /^[a-zA-Z]+$/;
            if (trimmedFirstName.length < 2 || trimmedFirstName.length > 25 || !nameChecker.test(trimmedFirstName)) {
                throw { code: 400, error: "Invalid first name" };
            }
        
            let lastName = document.getElementById("lastName").value;
            if (lastName === undefined) {
                throw "last name input is undefined";
            }
            if (typeof lastName !== 'string') {
                throw "last name must be a string";
            }
            let trimmedLastName = lastName.trim();
            if (trimmedLastName.length < 2 || trimmedLastName.length > 25 || !nameChecker.test(trimmedLastName)) {
                throw { code: 400, error: "Invalid last name" };
            }
        
            let username = document.getElementById("username").value;
            if (username === undefined) {
                throw "username input is undefined";
            }
            if (typeof username !== 'string') {
                throw "username must be a string";
            }
            let trimmedUsername = username.trim().toLowerCase();
            if (trimmedUsername.length < 5 || trimmedUsername.length > 10 || !nameChecker.test(trimmedUsername)) {
                throw { code: 400, error: "Invalid username" };
            }
        
            let password = document.getElementById("pwd").value;
            if (password === undefined) {
                throw "password input is undefined";
            }
            if (typeof password !== 'string') {
                throw "password must be a string";
            }
            let trimmedPassword = password.trim();
            const upperCaseChecker = /[A-Z]/;
            const numberChecker = /[0-9]/;
            const specialCharChecker = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (trimmedPassword.length < 8 || !upperCaseChecker.test(trimmedPassword) || !numberChecker.test(trimmedPassword) || !specialCharChecker.test(trimmedPassword)) {
                throw { code: 400, error: "Invalid password" };
            }
        
            let confirmPassword = document.getElementById("confirmPwd").value;
            if (confirmPassword === undefined) {
                throw "confirm password input is undefined";
            }
            if (typeof confirmPassword !== 'string') {
                throw "confirm password must be a string";
            }
            let trimmedConfirmPassword = confirmPassword.trim();
            if (trimmedConfirmPassword.length < 8 || !upperCaseChecker.test(trimmedConfirmPassword) || !numberChecker.test(trimmedConfirmPassword) || !specialCharChecker.test(trimmedConfirmPassword)) {
                throw { code: 400, error: "Invalid confirm password" };
            }
            if (trimmedPassword !== trimmedConfirmPassword) {
                throw { code: 400, error: "Passwords do not match" };
            }
        
            let role = document.getElementById("role").value;
            if (role === undefined) {
                throw "role input is undefined";
            }
            if (typeof role !== 'string') {
                throw "role must be a string";
            }
            let trimmedRole = role.trim().toLowerCase();
            if (trimmedRole === '') {
                throw "role is empty";
            }
            if (trimmedRole !== 'user' && trimmedRole !== 'admin') {
                throw "invalid role";
            }
        
            return true;
        }
        
        //     let first = document.getElementById("firstName").value;
        //     if (first === undefined) {
        //         throw "first name input is undefined"
        //     }
        //     if (typeof first !== 'string') {
        //         throw "first name must be a string"
        //     }
        //     fn = first.trim();
        //     const checker = /^[a-zA-Z]+$/;
        //     if (fn.length < 2 || fn.length > 25 || !checker.test(fn)) {
        //         throw { code: 400, error: "Invalid name" };
        //     }
        //     let last = document.getElementById("lastName").value;
        //     if (last === undefined) {
        //         throw "last name input is undefined"
        //     }
        //     if (typeof last !== 'string') {
        //         throw "last name must be a string"
        //     }
        //     ln = last.trim();
        //     if (ln.length < 2 || ln.length > 25 || !checker.test(ln)) {
        //         throw { code: 400, error: "Invalid name" };
        //     }
        //     let user = document.getElementById("username").value;
        //     if (user === undefined) {
        //         throw "username input is undefined"
        //     }
        //     else if (typeof username !== 'string') {
        //         throw "username must be a string"
        //     }
        //     u = username.trim().toLowerCase();
          
        //     if (u.length < 5 || ln.length > 10 || !checker.test(u)) {
        //         throw { code: 400, error: "Invalid email" };
        //     }
    
        //     let password = document.getElementById("pwd").value;
        //     if (password === undefined) {
        //         throw "password input is undefined"
        //     }
        //     else if (typeof password !== 'string') {
        //         throw "password must be a string"
        //     }
        //     p = password.trim();
        //     const upper = /[A-Z]/;
        //     const number = /[0-9]/;
        //     const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        //     if (p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
        //         throw { code: 400, error: "Invalid password" };
        //     }
       
        //     let confirmPassword = document.getElementById("confirmPwd").value;
        //     if (confirmPassword === undefined) {
        //         throw "password input is undefined"
        //     }
        //     else if (typeof confirmPassword !== 'string') {
        //         throw "password must be a string"
        //     }
        //     c = confirmPassword.trim();

        //     if (c.length < 8 || !upper.test(c) || !number.test(c) || !specialChar.test(c)) {
        //         throw { code: 400, error: "Invalid password" };
        //     }
        //     if (document.getElementById("pwd").value !== password) {
        //         errors.push("Passwords do not match")
        //     }
      
        //     let role = document.getElementById("role").value;
        //     if (role === undefined) {
        //         throw "role input is undefined"
        //     }
        //     else if (typeof role !== 'string') {
        //         throw "role must be a string"
        //     }
        //     r = role.trim().toLowerCase();
        //     if (r === '') {
        //         throw "role is empty"
        //     }
        //     if (r !== 'user' && r !== 'admin') {
        //         throw "invalid role"
        //     }
        
        //     if() {
        //     document.getElementById('error-message').textContent = 'Error!!';
        //     return false; 
        // }
        // return true; 
    };