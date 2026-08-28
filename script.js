```javascript
// =====================================
// MC PVP TECNICAS
// LOGIN + 5 SECOND PROMPT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ELEMENTS
    // =====================================

    const loginButton = document.getElementById("loginButton");
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.getElementById("closeModal");

    const registerButton = document.getElementById("registerButton");
    const loginExistingButton = document.getElementById("loginExistingButton");
    const logoutButton = document.getElementById("logoutButton");

    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");

    const accountMessage = document.getElementById("accountMessage");

    const profile = document.getElementById("profile");
    const avatar = document.getElementById("avatar");
    const usernameDisplay = document.getElementById("usernameDisplay");


    // =====================================
    // OPEN LOGIN
    // =====================================

    loginButton.addEventListener("click", function () {

        loginModal.classList.remove("hidden");

        accountMessage.textContent = "";

        usernameInput.focus();

    });


    // =====================================
    // CLOSE LOGIN
    // =====================================

    closeModal.addEventListener("click", function () {

        loginModal.classList.add("hidden");

    });


    // =====================================
    // CLICK OUTSIDE MODAL
    // =====================================

    loginModal.addEventListener("click", function (event) {

        if (event.target === loginModal) {

            loginModal.classList.add("hidden");

        }

    });


    // =====================================
    // CREATE ACCOUNT
    // =====================================

    registerButton.addEventListener("click", function () {

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Username check
        if (username.length < 3) {

            accountMessage.textContent =
                "❌ El usuario necesita mínimo 3 caracteres.";

            return;

        }

        // Password check
        if (password.length < 4) {

            accountMessage.textContent =
                "❌ La contraseña necesita mínimo 4 caracteres.";

            return;

        }


        // Get accounts
        let accounts = {};

        try {

            accounts = JSON.parse(
                localStorage.getItem("mcAccounts") || "{}"
            );

        } catch (error) {

            console.error("Error leyendo las cuentas:", error);

            accounts = {};

        }


        // Check existing account
        if (accounts[username]) {

            accountMessage.textContent =
                "❌ Ese usuario ya existe.";

            return;

        }


        // Create account
        accounts[username] = {

            username: username,
            password: password

        };


        // Save accounts
        localStorage.setItem(
            "mcAccounts",
            JSON.stringify(accounts)
        );


        // Log user in
        localStorage.setItem(
            "mcCurrentUser",
            username
        );


        accountMessage.textContent =
            "✅ ¡Cuenta creada!";


        // Close modal
        setTimeout(function () {

            loginModal.classList.add("hidden");

            usernameInput.value = "";
            passwordInput.value = "";

            updateProfile();

        }, 700);

    });


    // =====================================
    // LOGIN EXISTING ACCOUNT
    // =====================================

    loginExistingButton.addEventListener("click", function () {

        const username = usernameInput.value.trim();
        const password = passwordInput.value;


        // Get accounts
        let accounts = {};

        try {

            accounts = JSON.parse(
                localStorage.getItem("mcAccounts") || "{}"
            );

        } catch (error) {

            console.error("Error leyendo las cuentas:", error);

            accountMessage.textContent =
                "❌ Error al cargar las cuentas.";

            return;

        }


        // Account doesn't exist
        if (!accounts[username]) {

            accountMessage.textContent =
                "❌ Esa cuenta no existe.";

            return;

        }


        // Wrong password
        if (accounts[username].password !== password) {

            accountMessage.textContent =
                "❌ Contraseña incorrecta.";

            return;

        }


        // Login successful
        localStorage.setItem(
            "mcCurrentUser",
            username
        );


        accountMessage.textContent =
            "✅ ¡Sesión iniciada!";


        // Close modal
        setTimeout(function () {

            loginModal.classList.add("hidden");

            usernameInput.value = "";
            passwordInput.value = "";

            updateProfile();

        }, 500);

    });


    // =====================================
    // LOGOUT
    // =====================================

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem(
            "mcCurrentUser"
        );

        updateProfile();

    });


    // =====================================
    // UPDATE PROFILE
    // =====================================

    function updateProfile() {

        const username =
            localStorage.getItem("mcCurrentUser");


        if (username) {

            // Hide login button
            loginButton.classList.add("hidden");


            // Show profile
            profile.classList.remove("hidden");


            // Username
            usernameDisplay.textContent =
                username;


            // Avatar
            avatar.textContent =
                username.charAt(0).toUpperCase();

        }

        else {

            // Show login button
            loginButton.classList.remove("hidden");


            // Hide profile
            profile.classList.add("hidden");

        }

    }


    // =====================================
    // 5 SECOND SIGN-IN PROMPT
    // =====================================

    setTimeout(function () {

        const alreadyLoggedIn =
            localStorage.getItem("mcCurrentUser");


        if (!alreadyLoggedIn) {

            const wantsToSignIn = confirm(
                "⚔️ ¿Quieres aprender más técnicas de Minecraft PvP?\n\n" +
                "Crea una cuenta o inicia sesión para desbloquear más técnicas."
            );


            if (wantsToSignIn) {

                loginModal.classList.remove("hidden");

                accountMessage.textContent = "";

                usernameInput.focus();

            }

        }

    }, 5000);


    // =====================================
    // START
    // =====================================

    updateProfile();

});
```
