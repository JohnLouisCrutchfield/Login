// document.addEventListener("DOMContentLoaded", function () {
    console.log("auth.js loaded"); // Debugging log

    // Handle Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // aler(4955)

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:8080/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });
                console.log("token" ,response);


                if (!response.ok) throw new Error("Signup failed!");

                alert("Signup successful! Redirecting to login...");
                window.location.href = "login.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:8080/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                alert("Login successful! Redirecting to login...");
                if (!response.ok) throw new Error("Invalid username or password");

              
                alert("Login successful! Redirecting to welcome page...");
                window.location.href = "welcome.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }
// });
