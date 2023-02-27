// This event is in charge of loging in the user. This connects to server endpoints to review if the user already exists in the database.
document.getElementById("login").addEventListener("click",async  (e) => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const data = await response.json()
    if(data.message === "success"){
        alert('Correct Log in!')
        window.location.href = "/profile";
    }
    else {
        alert("user not found");
      }
  });