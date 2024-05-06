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
