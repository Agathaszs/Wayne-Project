const users = [
  { email: "robin@wayne.com", password: "FlyingGrayson", role: "funcionario" },
  { email: "alfred@wayne.com", password: "PennyTea", role: "gerente" },
  { email: "batman@wayne.com", password: "I'mVengeance", role: "admin" }
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "http://127.0.0.1:5501/templates/recursos.html";
  } else {
    document.getElementById("errorMessage").textContent = "Email ou senha incorretos, talvez o Coringa tenha invadido.";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    window.location.href = "http://127.0.0.1:5501/templates/dashboard.html";
  }
});