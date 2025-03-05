const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let resources = JSON.parse(localStorage.getItem("resources")) || [];

const resourceForm = document.getElementById("resourceForm");
const resourceList = document.getElementById("resourceList");

if (currentUser && currentUser.role === "admin") {
  resourceForm.classList.remove("hidden");
}

function renderResources() {
  resourceList.innerHTML = resources.map((resource, index) => `
    <li>
      <strong>Tipo:</strong> ${resource.type} <br>
      <strong>Nome:</strong> ${resource.name} <br>
      <strong>Descrição:</strong> ${resource.description} <br>
      <strong>Quantidade:</strong> ${resource.quantity} <br>
      <strong>Status:</strong> ${resource.status} <br>
      ${currentUser.role === "admin" || currentUser.role === "gerente" ? `
        <button onclick="editResource(${index})">Editar</button>
      ` : ""}
      ${currentUser.role === "admin" ? `
        <button onclick="deleteResource(${index})">Excluir</button>
      ` : ""}
    </li>
  `).join("");
}

resourceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const resource = {
    type: document.getElementById("resourceType").value,
    name: document.getElementById("resourceName").value,
    description: document.getElementById("resourceDescription").value,
    quantity: document.getElementById("resourceQuantity").value,
    status: document.getElementById("resourceStatus").value,
  };

  resources.push(resource);
  localStorage.setItem("resources", JSON.stringify(resources));
  renderResources();
  resourceForm.reset();
});

function editResource(index) {
  const resource = resources[index];
  if (confirm(`Editar recurso: ${resource.name}?`)) {
    const newName = prompt("Novo nome:", resource.name);
    const newDescription = prompt("Nova descrição:", resource.description);
    const newQuantity = prompt("Nova quantidade:", resource.quantity);
    const newStatus = prompt("Novo status (em_uso, nao_uso, danificado):", resource.status);

    if (newName && newDescription && newQuantity && newStatus) {
      resources[index] = {
        ...resource,
        name: newName,
        description: newDescription,
        quantity: newQuantity,
        status: newStatus,
      };
      localStorage.setItem("resources", JSON.stringify(resources));
      renderResources();
    }
  }
}

function deleteResource(index) {
  if (confirm("Tem certeza que deseja excluir este recurso?")) {
    resources.splice(index, 1);
    localStorage.setItem("resources", JSON.stringify(resources));
    renderResources();
  }
}


renderResources();

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "http://127.0.0.1:5501/templates/index.html";
});

document.getElementById("dashboardButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/templates/dashboard.html";
});