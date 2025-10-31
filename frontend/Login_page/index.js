    
    const username = document.getElementById("loginUsername").value;
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const email = `${username}@example.com`; // or use a real email input

  try {
    const res = await fetch("https://find-your-spaza.onrender.com/api/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      alert("Login successful!");
      window.location.href = "/frontend/Login_page/maps 2.html";
    } else {
      alert(data.message || "Invalid credentials.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error during login.");
  }
});
