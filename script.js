```javascript
// =====================================
// MC PVP TECNICAS
// LOGIN + 5 SECOND PROMPT
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
// CHECK ELEMENTS
// =====================================

if (
    !loginButton ||
    !loginModal ||
    !closeModal ||
    !registerButton ||
    !loginExistingButton ||
    !logoutButton ||
    !usernameInput ||
    !passwordInput ||
    !accountMessage ||
    !profile ||
    !avatar ||
    !usernameDisplay
) {
    console.error("MC PVP TECNICAS: Falta uno o más elementos HTML.");
} else {

// =====================================
// OPEN LOGIN
// =====================================

loginButton.onclick = function () {
    loginModal.classList.remove("hidden");
    usernameInput.focus();
};

// =====================================
// CLOSE LOGIN
// =====================================

closeModal.onclick = function () {
    loginModal.classList.add("hidden");
};

// =====================================
// CLICK OUTSIDE MODAL
// =====================================

loginModal.onclick = function (event) {

    if (event.target === loginModal) {
        loginModal.classList.add("hidden");
    }

};

// =====================================
// CREATE ACCOUNT
// =====================================

registerButton.onclick = function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username.length < 3) {

        accountMessage.textContent =
            "❌ El usuario necesita mínimo 3 caracteres.";

        return;
    }

    if (password.length < 4) {

        accountMessage.textContent =
            "❌ La contraseña necesita mínimo 4 caracteres.";

        return;
    }

    let accounts;

    try {
        accounts =
            JSON.parse(
                localStorage.getItem("mcAccounts") || "{}"
            );
    } catch (error) {
        accounts = {};
        console.error("Error leyendo las cuentas:", error);
    }

    if (accounts[username]) {

        accountMessage.textContent =
            "❌ Ese usuario ya existe.";

        return;
    }

    accounts[username] = {
        username: username,
        password: password
    };

    localStorage.setItem(
        "mcAccounts",
        JSON.stringify(accounts)
    );

    localStorage.setItem(
        "mcCurrentUser",
        username
    );

    accountMessage.textContent =
        "✅ ¡Cuenta creada!";

    setTimeout(function () {

        loginModal.classList.add("hidden");

        usernameInput.value = "";
        passwordInput.value = "";

        updateProfile();

    }, 700);

};

// =====================================
// LOGIN
// =====================================

loginExistingButton.onclick = function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    let accounts;

    try {
        accounts =
            JSON.parse(
                localStorage.getItem("mcAccounts") || "{}"
            );
    } catch (error) {
        accounts = {};
        console.error("Error leyendo las cuentas:", error);
    }

    if (!accounts[username]) {

        accountMessage.textContent =
            "❌ Esa cuenta no existe.";

        return;
    }

    if (accounts[username].password !== password) {

        accountMessage.textContent =
            "❌ Contraseña incorrecta.";

        return;
    }

    localStorage.setItem(
        "mcCurrentUser",
        username
    );

    accountMessage.textContent =
        "✅ ¡Sesión iniciada!";

    setTimeout(function () {

        loginModal.classList.add("hidden");

        usernameInput.value = "";
        passwordInput.value = "";

        updateProfile();

    }, 500);

};

// =====================================
// LOGOUT
// =====================================

logoutButton.onclick = function () {

    localStorage.removeItem(
        "mcCurrentUser"
    );

    updateProfile();

};

// =====================================
// UPDATE PROFILE
// =====================================

function updateProfile() {

    const username =
        localStorage.getItem(
            "mcCurrentUser"
        );

    if (username) {

        loginButton.classList.add("hidden");

        profile.classList.remove("hidden");

        usernameDisplay.textContent =
            username;

        avatar.textContent =
            username.charAt(0).toUpperCase();

    }

    else {

        loginButton.classList.remove("hidden");

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

            usernameInput.focus();

        }

    }

}, 5000);

// =====================================
// START
// =====================================

updateProfile();

}
```
