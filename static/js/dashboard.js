const resources = JSON.parse(localStorage.getItem("resources")) || [];

const resourceSummary = document.getElementById("resourceSummary");

function calculateSummary() {
  const totalResources = resources.length;
  const totalQuantity = resources.reduce((sum, resource) => sum + Number(resource.quantity), 0);
  
  const inUse = resources.filter(resource => resource.status === "em_uso").length;
  const notInUse = resources.filter(resource => resource.status === "nao_uso").length;
  const damaged = resources.filter(resource => resource.status === "danificado").length;

  const equipments = resources.filter(resource => resource.type === "equipamento").length;
  const vehicles = resources.filter(resource => resource.type === "veiculo").length;
  const securityDevices = resources.filter(resource => resource.type === "dispositivo").length;

  return {
    totalResources,
    totalQuantity,
    inUse,
    notInUse,
    damaged,
    equipments,
    vehicles,
    securityDevices
  };
}

function renderSummary() {
  const summary = calculateSummary();
  resourceSummary.innerHTML = `
    <p><strong>Total de Recursos:</strong> ${summary.totalResources}</p>
    <p><strong>Quantidade Total:</strong> ${summary.totalQuantity}</p>
    <p><strong>Em Uso:</strong> ${summary.inUse}</p>
    <p><strong>Não em Uso:</strong> ${summary.notInUse}</p>
    <p><strong>Danificados:</strong> ${summary.damaged}</p>
  `;

  renderStatusChart(summary);
  renderTypeChart(summary);
}

function renderStatusChart(summary) {
  const ctx = document.getElementById("resourceChart").getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Em Uso", "Não em Uso", "Danificado"],
      datasets: [{
        label: "Status dos Recursos",
        data: [summary.inUse, summary.notInUse, summary.damaged],
        backgroundColor: ["#007bff", "#28a745", "#dc3545"], 
        borderColor: ["#0056b3", "#1e7e34", "#a71d2a"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

function renderTypeChart(summary) {
  const ctx = document.getElementById("typeChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Equipamentos", "Veículos", "Dispositivos de Segurança"],
      datasets: [{
        label: "Tipos de Recursos",
        data: [summary.equipments, summary.vehicles, summary.securityDevices],
        backgroundColor: ["#ffc107", "#17a2b8", "#6f42c1"], 
        borderColor: ["#d39e00", "#117a8b", "#563d7c"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

renderSummary();

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "http://127.0.0.1:5501/templates/index.html";
});

document.getElementById("recursosButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/templates/recursos.html";
});
