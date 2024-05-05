if (document.getElementById('registration-form')) {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (event) => {
        try {
            let first = document.getElementById("firstName").value;
            if (first === undefined) {
                throw "first name input is undefined"
            }
            if (typeof first !== 'string') {
                throw "first name must be a string"
            }
            fn = first.trim();
            const checker = /^[a-zA-Z]+$/;
            if (fn.length < 2 || fn.length > 25 || !checker.test(fn)) {
                throw { code: 400, error: "Invalid name" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let last = document.getElementById("lastName").value;
            if (last === undefined) {
                throw "last name input is undefined"
            }
            if (typeof last !== 'string') {
                throw "last name must be a string"
            }
            ln = last.trim();
            const checker = /^[a-zA-Z]+$/;
            if (ln.length < 2 || ln.length > 25 || !checker.test(ln)) {
                throw { code: 400, error: "Invalid name" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let user = document.getElementById("username").value;
            if (user === undefined) {
                throw "username input is undefined"
            }
            else if (typeof username !== 'string') {
                throw "username must be a string"
            }
            u = username.trim().toLowerCase();
            const checker = /^[a-zA-Z]+$/;
            if (u.length < 5 || ln.length > 10 || !checker.test(u)) {
                throw { code: 400, error: "Invalid email" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("pwd").value;
            if (password === undefined) {
                throw "password input is undefined"
            }
            else if (typeof password !== 'string') {
                throw "password must be a string"
            }
            p = password.trim();
            const upper = /[A-Z]/;
            const number = /[0-9]/;
            const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
                throw { code: 400, error: "Invalid password" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("confirmPwd").value;
            if (password === undefined) {
                throw "password input is undefined"
            }
            else if (typeof password !== 'string') {
                throw "password must be a string"
            }
            p = password.trim();
            const upper = /[A-Z]/;
            const number = /[0-9]/;
            const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
                throw { code: 400, error: "Invalid password" };
            }
            if (document.getElementById("pwd").value !== password) {
                errors.push("Passwords do not match")
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let quote = document.getElementById("favQuote").value;
            if (quote === undefined) {
                throw "quote input is undefined"
            }
            if (typeof quote !== 'string') {
                throw "quote must be a string"
            }
            q = quote.trim();
            if (fn.length < 20 || fn.length > 255) {
                throw { code: 400, error: "invalid quote" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let theme = document.getElementById("thene").value;
            if (theme === undefined) {
                throw "theme input is undefined"
            }
            else if (typeof theme !== 'string') {
                throw "theme must be a string"
            }
            t = role.trim().toLowerCase();
            if (t === '') {
                throw "theme is empty"
            }
            if (t !== 'light' && r !== 'dark') {
                throw "invalid theme"
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let role = document.getElementById("role").value;
            if (role === undefined) {
                throw "role input is undefined"
            }
            else if (typeof role !== 'string') {
                throw "role must be a string"
            }
            r = role.trim().toLowerCase();
            if (r === '') {
                throw "role is empty"
            }
            if (r !== 'user' && r !== 'admin') {
                throw "invalid role"
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
    });
}

if (document.getElementById('login-form')) {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        try {
            let user = document.getElementById("username").value;
            if (user === undefined) {
                throw "username input is undefined"
            }
            else if (typeof username !== 'string') {
                throw "username must be a string"
            }
            u = username.trim().toLowerCase();
            const checker = /^[a-zA-Z]+$/;
            if (u.length < 5 || ln.length > 10 || !checker.test(u)) {
                throw { code: 400, error: "Invalid email" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("pwd").value;
            if (password === undefined) {
                throw "password input is undefined"
            }
            else if (typeof password !== 'string') {
                throw "password must be a string"
            }
            p = password.trim();
            const upper = /[A-Z]/;
            const number = /[0-9]/;
            const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
                throw { code: 400, error: "Invalid password" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
    });
}
