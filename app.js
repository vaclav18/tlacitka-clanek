// Formulář pro přihlášení
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Tlačítka
const button1 = document.getElementById("button-1");
const button2 = document.getElementById("button-2");
const button3 = document.getElementById("button-3");

// Tlačítko pro zobrazení logu
const showLogButton = document.getElementById("show-log-button");

// Log
const logDiv = document.getElementById("log");

// Pole s uživateli
const users = [
    { username: "admin", password: "admin", isAdmin: true },
    { username: "user", password: "user", isAdmin: false }
];

// Uložení aktuálně přihlášeného uživatele do sessionStorage
const saveCurrentUser = function (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
};

// Načtení aktuálně přihlášeného uživatele z sessionStorage
const loadCurrentUser = function () {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return currentUser;
};

// Kontrola přihlášeného uživatele
const checkLoggedIn = function () {
    const currentUser = loadCurrentUser();
    if (!currentUser) {
        alert("Nejste přihlášen/a");
        return false;
    }
    return true;
};

// Kontrola, zda je uživatel administrátor
const checkIsAdmin = function () {
    const currentUser = loadCurrentUser();
    if (!currentUser.isAdmin) {
        alert("Nemáte oprávnění zobrazit log");
        return false;
    }
    return true;
};

// Ukládání logu do localStorage
const saveLog = function (log) {
    localStorage.setItem("log", JSON.stringify(log));
};

// Načtení logu z localStorage
const loadLog = function () {
    const log = JSON.parse(localStorage.getItem("log"));
    return log || [];
};

// Zobrazení logu
const showLog = function () {
    if (!checkLoggedIn() || !checkIsAdmin()) {
        return;
    }
    const log = loadLog();
    logDiv.innerHTML = log
        .map(entry => `${entry.username} kliknul/a na ${entry.button} v ${entry.timestamp}`)
        .join("<br>");
    logDiv.style.display = "block";
};

// Přihlášení uživatele
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const user = users.find(
        user => user.username === username && user.password === password
    );
    if (!user) {
        alert("Špatné uživatelské jméno nebo heslo");
        return;
    }
    saveCurrentUser(user);
    alert(`Vítejte, ${user.username}`);
});

// Obsluha tlačítek
button1.addEventListener("click", function () {
    const log = loadLog();
    const currentUser = loadCurrentUser();
    log.push({
        username: currentUser.username,
        button: "Tlačítko 1",
        timestamp: new Date().toLocaleString()
    });
    saveLog(log);
});

button2.addEventListener("click", function () {
    const log = loadLog();
    const currentUser = loadCurrentUser();
    log.push({
        username: currentUser.username,
        button: "Tlačítko 2",
        timestamp: new Date().toLocaleString()
    });
    saveLog(log);
});

button3.addEventListener("click", function () {
    const log = loadLog();
    const currentUser = loadCurrentUser();
    log.push({
        username: currentUser.username,
        button: "Tlačítko 3",
        timestamp: new Date().toLocaleString()
    });
    saveLog(log);
});

showLogButton.addEventListener("click", showLog);
