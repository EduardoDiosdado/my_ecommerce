const profileSection = document.getElementById("profileSection");
// This function will render the non-private data sent from the server
async function fetchData() {
  const response = await fetch(
    `http://localhost:8080/api/sessions/profiledata`
  );
  const data = await response.json();
  const profile = document.createElement("div");
  profile.innerHTML = `
    <div id='profiledata'>
        <h1>Welcome ${data.data.name}!</h1>
        <h2>Profile data:</h2>
        <p>Name: ${data.data.name}</p>
        <p>Last name: ${data.data.last_name}</p>
        <p>Email: ${data.data.email}</p>   
    </div>
    <button type="submit" class="btn">Log out</button>`;
  profileSection.append(profile);

  // Only if the user is admin the next part will also be added to the user profile data
  const profiledata = document.getElementById("profiledata");
  const userAdmin = document.createElement("p");

  if (data.data.role) {
    userAdmin.innerHTML = `<p>User: ${data.data.role}</p>`;
    profiledata.append(userAdmin);
  }

  // The render of this button is connected to the backend endpoint to destroy the session.
  const buttons = document.querySelectorAll("button.btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const response = await fetch(`http://localhost:8080/api/sessions/logout`);
      const data = await response.json();
      alert(data.message);
      location.reload();
    });
  });
}

fetchData();
