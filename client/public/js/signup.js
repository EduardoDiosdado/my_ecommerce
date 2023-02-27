document.getElementById("signup").addEventListener("click", async (e) => {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;

  const response = await fetch('http://localhost:8080/api/sessions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      age,
    }),
  });
  const data = await response.json();
  console.log(data);
  alert(data.message)
  location.reload()
});
