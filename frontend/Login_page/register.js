document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;
      const email = `${username}@example.com`; // or use a real email input

  fetch("https://abdul-spice.github.io/api/user_profiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: username,
      email: `${username}@example.com`, // or collect a real email
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Registered successfully!");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Registration failed.");
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Server error during registration.");
  });
});